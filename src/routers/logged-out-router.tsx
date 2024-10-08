import React from "react";
import { isLoggedInVar } from "../apollo";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  const { register, watch, handleSubmit, formState } = useForm<IForm>();
  const onSubmit = () => {
    console.log(watch());
  };
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="email"
            {...register("email", {
              required: "This is required",
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
            })}
          />
          {formState.errors.email?.message && (
            <span className="font-bold text-red-600">
              {formState.errors.email?.message}
            </span>
          )}
          {formState.errors.email?.type === "pattern" && (
            <span className="font-bold text-red-600">Only gmail allowed</span>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            {...register("password")}
          />
        </div>
        <button className="bg-yellow-300 text-white">Submit</button>
      </form>
    </div>
  );
};
