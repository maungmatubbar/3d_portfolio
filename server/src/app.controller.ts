import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SkipThrottle } from '@nestjs/throttler';

interface RootInfo {
  name: string;
  status: 'running';
  docs: string;
}

@SkipThrottle()
@Controller()
export class AppController {
  constructor(private readonly config: ConfigService) {}

  @Get()
  root(): RootInfo {
    // ConfigService is injected to demonstrate configuration access and to allow
    // the API name to be overridden via environment in the future.
    const name = this.config.get<string>(
      'API_NAME',
      'Mong Mong — Portfolio API',
    );

    return {
      name,
      status: 'running',
      docs: '/api/health',
    };
  }
}
