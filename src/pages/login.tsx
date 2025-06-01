import React from "react";
import nuberLogo from "../images/logo.svg";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { LoginMutation, LoginMutationVariables } from "../gql/graphql";
import { Button } from "../components/button";
import { Link } from "react-router-dom";

interface ILoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

export const Login = () => {
  const { register, formState, handleSubmit, watch } = useForm<ILoginForm>({
    mode: "onChange",
  });
  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, error, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };
  const onError = (error: ApolloError) => {};
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    variables: {
      loginInput: {
        email: watch("email"),
        password: watch("password"),
      },
    },
    onCompleted,
    onError,
  });
  const onSubmit = () => {
    if (!loading) {
      loginMutation();
    }
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img src={nuberLogo} alt="Uber Eats logo" className="w-52 mb-10" />
        <h4 className="text-left w-full text-3xl mb-10 font-medium">
          Welcome back
        </h4>
        <form
          className="grid gap-3 mt-5 w-full mb-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="p-3 border text-lg font-light border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
            required
          />
          {formState.errors?.email?.message && (
            <FormError errorMessage={formState.errors.email.message} />
          )}
          <input
            {...register("password", {
              required: "Password is required",
              minLength: 10,
            })}
            minLength={10}
            type="password"
            placeholder="Password"
            className="p-3 border text-lg font-light border-gray-300 focus:outline-none focus:border-gray-500 transition-colors mb-3"
            required
          />
          {formState.errors?.password?.message && (
            <FormError errorMessage={formState.errors.password.message} />
          )}
          {formState.errors?.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}
          <Button
            isValid={formState.isValid}
            actionText="Log in"
            loading={loading}
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          New to Nuber?{" "}
          <Link to="create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
