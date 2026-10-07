import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import {
  ContactRequestContext,
  ContactResult,
  ContactService,
} from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() dto: CreateContactDto,
    @Req() req: Request,
  ): Promise<ContactResult> {
    const context: ContactRequestContext = {
      ip: this.resolveIp(req),
      userAgent: req.headers['user-agent'] ?? 'unknown',
    };

    return this.contactService.handleSubmission(dto, context);
  }

  /**
   * Resolve the originating client IP, honouring a trusted proxy's
   * X-Forwarded-For header when present (Express `trust proxy` enabled in main.ts).
   */
  private resolveIp(req: Request): string {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded.length > 0) {
      return forwarded.split(',')[0].trim();
    }
    return req.ip ?? 'unknown';
  }
}
