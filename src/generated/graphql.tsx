import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<User>;
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser?: Maybe<MutationResponse>;
  login?: Maybe<MutationResponse>;
};


export type MutationRegisterUserArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  cpassword?: Maybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}



