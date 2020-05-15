import React from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm(props) {
  const { register, handleSubmit, errors, getValues } = useForm({
    mode: "onBlur",
  });
  const onRegisterSubmit = (data) => {
    props.onRegisterSubmit(data);
  };
  console.log(errors);

  return (
    <form
      className="mt-4 flex-col"
      onSubmit={handleSubmit(onRegisterSubmit)}>
      <input
        className="block mt-4 border-2 border-solid border-gray-200 p-2"
        type="text"
        placeholder="Email"
        name="email"
        ref={register({
          required: "Email is required",
          pattern: /^\S+@\S+$/i,
        })}
      />

      <p className="text-red-500 text-xs italic">
        {errors.email ? errors.email.message : null}
      </p>
      <input
        className="block mt-4 border-2 border-solid border-gray-200  p-2"
        type="password"
        placeholder="Password"
        name="password"
        ref={register({
          required: "Password is required",

          validate: {
            passwordLengthCheck: (value) => {
              return (
                value.length >= 6 ||
                "Password should be at least 6 character"
              );
            },
          },
        })}
      />
      <p className="text-red-500 text-xs italic">
        {errors.password ? errors.password.message : null}
      </p>
      <input
        className="block mt-4 border-2 border-solid border-gray-200  p-2"
        type="password"
        placeholder="Confirm Password"
        name="cpassword"
        ref={register({
          required: "Please confirm password!",
          validate: {
            matchesPreviousPassword: (value) => {
              const { password } = getValues();
              return password === value || "Passwords should match!";
            },
          },
        })}
      />
      <p className="text-red-500 text-xs italic">
        {errors.cpassword ? errors.cpassword.message : null}
      </p>
      <p className="text-red-500 text-xs italic">
        {props.signUpErr ? `${props.signUpErr.message}` : null}
      </p>
      <input
        className="cursor-pointer bg-green-300 border border-solid border-green-500 mt-4 px-4 py-1 rounded-lg hover:bg-green-400"
        type="submit"
        value="Sign up"
      />
    </form>
  );
}
