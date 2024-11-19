import { AuthenticationError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { EnvService } from '@/modules/env/env.service';
import { UsersService } from '@/modules/users/users.service';
import { JwtPayload } from '@/shared/types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access-token') {
  constructor(
    private readonly usersService: UsersService,
    private readonly envService: EnvService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findUnique({
      id: payload.sub,
    });

    if (!user) {
      throw new AuthenticationError('Unauthorized');
    }

    return user;
  }
}
