import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateContactDto } from './dto/create-contact.dto';

/** Metadata captured from the HTTP request, enriching the forwarded payload. */
export interface ContactRequestContext {
  ip: string;
  userAgent: string;
}

/** Stable response contract returned to the frontend. */
export interface ContactResult {
  success: true;
  message: string;
}

/** JSON body forwarded to the n8n automation webhook. */
interface N8nContactPayload {
  name: string;
  email: string;
  message: string;
  company?: string;
  source: 'portfolio';
  submittedAt: string;
  ip: string;
  userAgent: string;
}

const FORWARD_TIMEOUT_MS = 10_000;

const SUCCESS_MESSAGE =
  "Thanks — your message is on its way. I'll get back to you soon.";
const SPAM_MESSAGE = 'Message received.';
const FORWARD_FAILURE_MESSAGE = 'Message received.';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private readonly config: ConfigService) {}

  /**
   * Handle a validated contact submission.
   *
   * Flow:
   *  1. If the honeypot is tripped, silently pretend success (fool the bot).
   *  2. Otherwise forward to n8n (unless forwarding is disabled for local dev).
   *  3. Never surface forwarding failures to the visitor — we don't lose the lead.
   */
  async handleSubmission(
    dto: CreateContactDto,
    context: ContactRequestContext,
  ): Promise<ContactResult> {
    // Anti-spam: a filled honeypot means a bot. Pretend acceptance, forward nothing.
    if (dto.honeypot && dto.honeypot.trim().length > 0) {
      this.logger.warn(
        `Honeypot tripped — dropping suspected spam from ${context.ip}`,
      );
      return { success: true, message: SPAM_MESSAGE };
    }

    this.logger.log(
      `Contact submission received from "${dto.name}" <${dto.email}>`,
    );

    if (!this.isForwardEnabled()) {
      this.logger.log(
        'CONTACT_FORWARD_ENABLED=false — skipping n8n forward (local dev mode)',
      );
      return { success: true, message: SUCCESS_MESSAGE };
    }

    try {
      await this.forwardToN8n(dto, context);
      this.logger.log(`Forwarded submission from <${dto.email}> to n8n`);
      return { success: true, message: SUCCESS_MESSAGE };
    } catch (error) {
      // Log server-side, but never leak internal errors to the visitor.
      this.logger.error(
        `Failed to forward submission from <${dto.email}> to n8n: ${this.describeError(error)}`,
      );
      return { success: true, message: FORWARD_FAILURE_MESSAGE };
    }
  }

  private isForwardEnabled(): boolean {
    // Default to enabled; only the explicit string "false" disables forwarding.
    return this.config.get<string>('CONTACT_FORWARD_ENABLED') !== 'false';
  }

  private async forwardToN8n(
    dto: CreateContactDto,
    context: ContactRequestContext,
  ): Promise<void> {
    const webhookUrl = this.config.get<string>('N8N_WEBHOOK_URL');
    if (!webhookUrl) {
      throw new Error('N8N_WEBHOOK_URL is not configured');
    }

    const payload: N8nContactPayload = {
      name: dto.name,
      email: dto.email,
      message: dto.message,
      company: dto.company,
      source: 'portfolio',
      submittedAt: new Date().toISOString(),
      ip: context.ip,
      userAgent: context.userAgent,
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FORWARD_TIMEOUT_MS);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(
          `n8n webhook responded with HTTP ${response.status} ${response.statusText}`,
        );
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  private describeError(error: unknown): string {
    if (error instanceof Error) {
      return error.name === 'AbortError'
        ? `request timed out after ${FORWARD_TIMEOUT_MS}ms`
        : error.message;
    }
    return String(error);
  }
}
