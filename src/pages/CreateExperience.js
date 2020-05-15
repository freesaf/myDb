import React, { useEffect } from "react";
import ExperienceForm from "../components/experiences/ExperienceForm";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "@reach/router";
import { fetchSelectedBusiness, createExperience } from "../actions";

export default function CreateExperience() {
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return state;
  });
  const isSignedIn = state.auth.isSignedIn;
  const user = state.auth.user;
  const currentUser = state.businesses.selectedBusiness;
  const createError = state.errors.createError;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchSelectedBusiness(user.uid));
    }
  }, [user, dispatch]);

  const onSubmit = (val, partnerData, imgLink) => {
    const userBname = currentUser ? currentUser.Bname : null;
    const userId = state.auth.user.uid;

    dispatch(
      createExperience(userId, val, partnerData, imgLink, userBname)
    );
    if (createError) {
      alert(createError);
    } else {
      navigate("/profile");
    }
  };
  const renderCreate = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <div className="ml-4">
          <h2>Create a new Experience</h2>
          <ExperienceForm onSubmit={onSubmit} />
        </div>
      );
    } else {
      return (
        <div className="flex items-center ml-6">
          <h2>
            Please Login or register a new account to access this page
          </h2>
          <Link
            className="bg-green-400 px-4 py-1 text-white ml-4 rounded shadow"
            to="/start">
            Get Started
          </Link>
        </div>
      );
    }
  };
  return <div>{renderCreate()}</div>;
}
