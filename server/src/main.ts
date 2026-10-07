import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';

const DEFAULT_ALLOWED_ORIGINS = 'http://localhost:5173,http://localhost:4173';
const DEFAULT_PORT = 4000;

function parseOrigins(raw: string | undefined): string[] {
  return (raw ?? DEFAULT_ALLOWED_ORIGINS)
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Trust the first proxy hop so req.ip / X-Forwarded-For reflect the real client
  // (important for rate limiting and the IP forwarded to n8n).
  app.set('trust proxy', 1);

  // Security headers.
  app.use(helmet());

  // CORS restricted to the configured portfolio origins.
  const allowedOrigins = parseOrigins(process.env.ALLOWED_ORIGINS);
  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  });

  // Global validation: strip unknown props, reject unexpected ones, and transform
  // payloads into typed DTO instances.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = Number(process.env.PORT) || DEFAULT_PORT;
  await app.listen(port);

  logger.log(`Portfolio API listening on http://localhost:${port}`);
  logger.log(`CORS allowed origins: ${allowedOrigins.join(', ')}`);
}

void bootstrap();
