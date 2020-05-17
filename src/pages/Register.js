import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "@reach/router";
import GoogleAuth from "../components/Authentication/GoogleAuth";
import RegisterForm from "../components/Authentication/RegisterForm";
import LoginForm from "../components/Authentication/LoginForm";
import { userSignIn, userSingUp } from "../actions";

export default function Register() {
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return state;
  });
  const isSignedIn = state.auth.isSignedIn;
  const err = state.errors;
  const loader = state.loader;
  const dispatch = useDispatch();

  const onRegisterSubmit = (credentials) => {
    dispatch(userSingUp(credentials));
  };
  const onLoginSubmit = (credentials) => {
    dispatch(userSignIn(credentials));
  };
  const renderRegister = (isSignedIn) => {
    switch (isSignedIn) {
      case true:
        navigate("/profile");
        break;
      case false:
        if (loader) {
          return (
            <div className="bg-gray-500 inilne-block h-screen -mt-10 flex justify-center items-center text-white cursor-wait">
              <h1 className="font-bold">Loading... Please wait...</h1>
            </div>
          );
        } else {
          return (
            <div>
              <div className="flex sm:justify-around items-center flex-col sm:items-start sm:flex-row">
                <div className="sm:w-1/4">
                  <h2>Register a new account</h2>
                  <RegisterForm
                    signUpErr={err.signUpError}
                    onRegisterSubmit={onRegisterSubmit}
                  />
                </div>
                <div className="sm:w-1/4 sm:mt-0 mt-10">
                  <h2>Login to your account</h2>
                  <LoginForm
                    signInErr={err.signInError}
                    onLoginSubmit={onLoginSubmit}
                  />
                </div>
              </div>

              <hr className="mt-10 mb-10"></hr>
              <div className="flex flex-col items-center mb-10">
                <GoogleAuth />
                <div className=" text-xs text-red-500 italic">
                  {err.googleSignInErr
                    ? `${err.googleSignInErr.message}`
                    : null}{" "}
                </div>
              </div>
            </div>
          );
        }

      default:
        return (
          <div className="bg-gray-500 inilne-block h-screen -mt-10 flex justify-center items-center text-white cursor-wait">
            <h1 className="font-bold">Loading... Please wait...</h1>
          </div>
        );
    }
  };

  return <div>{renderRegister(isSignedIn)}</div>;
}
