import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

/**
 * Shape of an incoming contact-form submission.
 *
 * Validation mirrors the public API contract the portfolio frontend relies on.
 * The `honeypot` field is an anti-spam trap: it is never rendered for real
 * users, so any non-empty value signals an automated bot.
 */
export class CreateContactDto {
  @IsString()
  @Length(2, 100, { message: 'name must be between 2 and 100 characters' })
  name!: string;

  @IsEmail({}, { message: 'email must be a valid email address' })
  email!: string;

  @IsString()
  @Length(10, 5000, {
    message: 'message must be between 10 and 5000 characters',
  })
  message!: string;

  @IsOptional()
  @IsString()
  @MaxLength(150, { message: 'company must be at most 150 characters' })
  company?: string;

  /**
   * Anti-spam honeypot. Must be empty for genuine submissions.
   * Optional and unconstrained in length because bots may fill it with anything.
   */
  @IsOptional()
  @IsString()
  honeypot?: string;
}
