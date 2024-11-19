import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class RegisterInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 8,
  })
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}
