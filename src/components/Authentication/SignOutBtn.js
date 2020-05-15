import React from "react";
import { useDispatch } from "react-redux";
import { userSignOut } from "../../actions";

export default function SignOutBtn(props) {
  const dispatch = useDispatch();
  return (
    <button
      className={props.className}
      onClick={async () => {
        dispatch(userSignOut());
      }}>
      Sign out <i className="ion-ios-log-out ml-2" />
    </button>
  );
}

// "bg-red-700 px-4 py-2 rounded hover:bg-red-600 font-semibold text-white"
