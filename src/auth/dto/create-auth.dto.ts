import { IsAlphanumeric, IsEmail, IsNumber, IsString } from 'class-validator';
export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
