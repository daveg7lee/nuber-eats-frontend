import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { gql, useMutation } from "@apollo/client";
import { LoginMutation, LoginMutationVariables } from "../gql/graphql";

interface ILoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      token
      error
    }
  }
`;

export const Login = () => {
  const { register, getValues, formState, handleSubmit } =
    useForm<ILoginForm>();
  const [loginMutation, { loading, error, data }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION);
  const onSubmit = () => {
    const { email, password } = getValues();
    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form
          className="grid gap-3 mt-5 px-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="mb-3 input"
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
            className="input"
            required
          />
          {formState.errors?.password?.message && (
            <FormError errorMessage={formState.errors.password.message} />
          )}
          {formState.errors?.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}
          <button className="mt-3 btn">Log in</button>
        </form>
      </div>
    </div>
  );
};
