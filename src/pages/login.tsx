import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, getValues, formState, handleSubmit } =
    useForm<ILoginForm>();
  const onSubmit = () => {
    console.log(getValues());
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
            <span className="font-medium text-red-500">
              {formState.errors?.email?.message}
            </span>
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
            <span className="font-medium text-red-500">
              {formState.errors?.password?.message}
            </span>
          )}
          {formState.errors?.password?.type === "minLength" && (
            <span className="font-medium text-red-500">
              Password must be more than 10 chars.
            </span>
          )}
          <button className="mt-3 btn">Log in</button>
        </form>
      </div>
    </div>
  );
};
