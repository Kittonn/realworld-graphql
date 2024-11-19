import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies';

@Module({
  imports: [PassportModule, JwtModule, UsersModule],
  providers: [AuthResolver, AuthService, AccessTokenStrategy],
})
export class AuthModule {}
