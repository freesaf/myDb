import React from "react";
import { useForm } from "react-hook-form";

export default function LoginForm(props) {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });
  const onLoginSubmit = (data) => {
    props.onLoginSubmit(data);
  };
  return (
    <form
      className="mt-4 flex-col"
      onSubmit={handleSubmit(onLoginSubmit)}>
      <input
        className="block mt-4 border-2 border-solid border-gray-200 p-2"
        type="text"
        placeholder="Email"
        name="email"
        ref={register({
          required: true,
          pattern: /^\S+@\S+$/i,
        })}
      />
      <div className=" text-xs text-red-500 italic">
        {props.signInErr ? `${props.signInErr.message}` : null}
      </div>
      <p className="text-red-600 text-xs italic">
        {errors.email ? "Email is required" : null}{" "}
      </p>
      <input
        className="block mt-4 border-2 border-solid border-gray-200  p-2"
        type="password"
        placeholder="Password"
        name="password"
        ref={register({
          required: true,
        })}
      />
      <p className="text-red-600 text-xs italic">
        {errors.password ? "Password is required" : null}{" "}
      </p>
      <input
        className="cursor-pointer bg-green-300 border border-solid border-green-500 mt-4 px-4 py-1 rounded-lg hover:bg-green-400"
        type="submit"
        value="Sign in"
      />
    </form>
  );
}
