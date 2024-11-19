/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginInput {
  email: string;
  password: string;
}

export class RegisterInput {
  email: string;
  password: string;
  username: string;
}

export class CreateUserInput {
  exampleField?: Nullable<number>;
}

export class UpdateUserInput {
  id: number;
}

export class Credentials {
  accessToken: string;
}

export class Auth {
  credentials: Credentials;
}

export abstract class IMutation {
  abstract login(loginInput: LoginInput): Auth | Promise<Auth>;

  abstract register(registerInput: RegisterInput): Auth | Promise<Auth>;

  abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

  abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

  abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
  exampleField?: Nullable<number>;
}

export abstract class IQuery {
  abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

  abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
