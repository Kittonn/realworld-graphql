import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 8,
  })
  @IsNotEmpty()
  password: string;
}
