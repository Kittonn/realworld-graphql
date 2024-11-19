import { AuthenticationError, UserInputError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as argon2 from 'argon2';

import { EnvService } from '../env/env.service';
import { UsersService } from '../users/users.service';

import { LoginInput, RegisterInput } from './dto';

import { Auth } from '@/graphql';

@Injectable()
export class AuthService {
  constructor(
    private readonly envService: EnvService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(registerInput: RegisterInput): Promise<Auth> {
    const { email, username, password } = registerInput;
    const userExists = await this.usersService.findUserByUsernameOrEmail(username, email);

    if (userExists) {
      throw new UserInputError('User already exists');
    }

    const hashedPassword = await argon2.hash(password);
    const createdUser = await this.usersService.createUser({
      ...registerInput,
      password: hashedPassword,
    });

    const accessToken = await this.generateAccessToken(createdUser.id);

    return {
      credentials: {
        accessToken,
      },
    };
  }

  async login(loginInput: LoginInput): Promise<Auth> {
    const { email, password } = loginInput;
    const user = await this.usersService.findUnique({ email });

    if (!user) {
      throw new UserInputError('User not found');
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid password');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return {
      credentials: {
        accessToken,
      },
    };
  }

  private async generateAccessToken(sub: string): Promise<string> {
    const jwtPayload = { sub };

    return this.jwtService.signAsync(jwtPayload, {
      secret: this.envService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.envService.get('JWT_ACCESS_EXPIRES_IN'),
    });
  }
}
