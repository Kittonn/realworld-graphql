import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto';

import { Auth } from '@/graphql';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('login')
  async login(@Args('loginInput') loginInput: LoginInput): Promise<Auth> {
    return this.authService.login(loginInput);
  }

  @Mutation('register')
  async register(@Args('registerInput') registerInput: RegisterInput): Promise<Auth> {
    return this.authService.register(registerInput);
  }
}
