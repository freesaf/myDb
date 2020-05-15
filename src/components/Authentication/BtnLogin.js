import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "@reach/router";
import SignOutBtn from "./SignOutBtn";
import { getAuthState } from "../../actions";

export default function BtnLogin(props) {
  const authState = useSelector((state) => {
    return state.auth;
  });
  const isSignedIn = authState.isSignedIn;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuthState());
  }, [dispatch]);

  const renderBtn = () => {
    if (isSignedIn) {
      return <SignOutBtn className={props.className} />;
    } else if (isSignedIn === false) {
      return (
        <Link className={props.className} to="start">
          <i className="mr-1 ion-ios-exit" />
          Login for Businesses
        </Link>
      );
    }
  };

  return <div>{renderBtn()}</div>;
}
