
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

export class Credentials {
    accessToken: string;
}

export class Auth {
    credentials: Credentials;
}

export abstract class IMutation {
    abstract login(loginInput: LoginInput): Auth | Promise<Auth>;

    abstract register(registerInput: RegisterInput): Auth | Promise<Auth>;
}

export class User {
    id: string;
    email: string;
    username: string;
    bio?: Nullable<string>;
    image: string;
}

export abstract class IQuery {
    abstract me(): User | Promise<User>;
}

type Nullable<T> = T | null;
