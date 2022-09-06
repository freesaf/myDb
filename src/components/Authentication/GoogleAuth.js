import React from "react";
import { useDispatch, useSelector } from "react-redux";

import SignOutBtn from "./SignOutBtn";
import { googleSignIn } from "../../actions";

export default function GoogleAuth() {
  const isSignedIn = useSelector((state) => {
    return state.auth.isSignedIn;
  });
  const dispatch = useDispatch();

  const renderAuthBtn = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return <SignOutBtn />;
    } else {
      return (
        <div className="inline-block text-center">
          <button
            onClick={() => {
              dispatch(googleSignIn());
            }}
            className="googleBtn block px-6 py-3 bg-white">
            <span>
              <img
                className="w-4 h-4 inline-block"
                alt="Google"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              />
            </span>
            <span className="pl-2 font-semibold text-gray-600">
              Sing in with Google
            </span>
          </button>
        </div>
      );
    }
  };

  return <>{renderAuthBtn()}</>;
}
