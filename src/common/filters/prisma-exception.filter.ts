import { BadRequestException, Catch, ConflictException, NotFoundException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
      case 'P2000': {
        throw new BadRequestException('Input data is too long');
      }

      case 'P2001': {
        throw new NotFoundException('Record does not exist');
      }

      case 'P2002': {
        throw new ConflictException('Reference already exists');
      }

      case 'P2003': {
        throw new ConflictException('Foreign key constraint failed');
      }

      case 'P2025': {
        throw new NotFoundException('Record does not exist');
      }

      default:
        break;
    }

    return exception;
  }
}
