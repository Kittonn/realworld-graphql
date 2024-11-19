import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { User } from '@prisma/client';

import { UsersService } from './users.service';

import { CurrentUser } from '@/common/decorators';
import { GqlAccessTokenGuard } from '@/common/guards';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('me')
  @UseGuards(GqlAccessTokenGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Query('profile')
  async getUserProfile(@Args('username') username: string): Promise<User> {
    return this.usersService.getUserProfile(username);
  }
}
