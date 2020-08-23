import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
  continueWithFacebook?: Maybe<MutationResponse>;
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


export type MutationContinueWithFacebookArgs = {
  facebookId?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  cpassword: Scalars['String'];
}>;


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { registerUser?: Maybe<(
    { __typename?: 'MutationResponse' }
    & Pick<MutationResponse, 'success' | 'message'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'MutationResponse' }
    & Pick<MutationResponse, 'success' | 'id'>
  )> }
);

export type ContinueWithFacebookMutationVariables = Exact<{
  facebookId: Scalars['String'];
}>;


export type ContinueWithFacebookMutation = (
  { __typename?: 'Mutation' }
  & { continueWithFacebook?: Maybe<(
    { __typename?: 'MutationResponse' }
    & Pick<MutationResponse, 'success' | 'id'>
  )> }
);


export const SignupDocument = gql`
    mutation signup($email: String!, $password: String!, $cpassword: String!) {
  registerUser(email: $email, password: $password, cpassword: $cpassword) {
    success
    message
  }
}
    `;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<SignupMutation, SignupMutationVariables>;
export type SignupComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SignupMutation, SignupMutationVariables>, 'mutation'>;

    export const SignupComponent = (props: SignupComponentProps) => (
      <ApolloReactComponents.Mutation<SignupMutation, SignupMutationVariables> mutation={SignupDocument} {...props} />
    );
    
export type SignupProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<SignupMutation, SignupMutationVariables>
    } & TChildProps;
export function withSignup<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SignupMutation,
  SignupMutationVariables,
  SignupProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, SignupMutation, SignupMutationVariables, SignupProps<TChildProps, TDataName>>(SignupDocument, {
      alias: 'signup',
      ...operationOptions
    });
};
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    success
    id
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>
    } & TChildProps;
export function withLogin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps, TDataName>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ContinueWithFacebookDocument = gql`
    mutation continueWithFacebook($facebookId: String!) {
  continueWithFacebook(facebookId: $facebookId) {
    success
    id
  }
}
    `;
export type ContinueWithFacebookMutationFn = ApolloReactCommon.MutationFunction<ContinueWithFacebookMutation, ContinueWithFacebookMutationVariables>;
export type ContinueWithFacebookComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ContinueWithFacebookMutation, ContinueWithFacebookMutationVariables>, 'mutation'>;

    export const ContinueWithFacebookComponent = (props: ContinueWithFacebookComponentProps) => (
      <ApolloReactComponents.Mutation<ContinueWithFacebookMutation, ContinueWithFacebookMutationVariables> mutation={ContinueWithFacebookDocument} {...props} />
    );
    
export type ContinueWithFacebookProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<ContinueWithFacebookMutation, ContinueWithFacebookMutationVariables>
    } & TChildProps;
export function withContinueWithFacebook<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ContinueWithFacebookMutation,
  ContinueWithFacebookMutationVariables,
  ContinueWithFacebookProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, ContinueWithFacebookMutation, ContinueWithFacebookMutationVariables, ContinueWithFacebookProps<TChildProps, TDataName>>(ContinueWithFacebookDocument, {
      alias: 'continueWithFacebook',
      ...operationOptions
    });
};
export type ContinueWithFacebookMutationResult = ApolloReactCommon.MutationResult<ContinueWithFacebookMutation>;
export type ContinueWithFacebookMutationOptions = ApolloReactCommon.BaseMutationOptions<ContinueWithFacebookMutation, ContinueWithFacebookMutationVariables>;