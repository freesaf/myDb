import React, { useState, useEffect } from "react";
import AccountForm from "../components/Businesses/AccountForm";
import Overview from "../components/ProfileSections/OverView";
import UserExperiencesSection from "../components/ProfileSections/UserExperiencesSection";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "@reach/router";
import {
  fetchPartnersExp,
  fetchExperiencesById,
  fetchSelectedBusiness,
  completeUserData,
} from "../actions";
import PartnersExperiences from "../components/ProfileSections/PartnersExperiences";
import AccountDetails from "../components/ProfileSections/AccountDetails";

export default function Profile() {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const loader = state.loader;
  const currentUser = state.businesses.currentUser;
  const [activeTab, setActiveTab] = useState(1);
  const userExperiences = state.experiences.userExperiences;
  const partnersExperiences = state.experiences.partnersExperiences;
  const isSignedIn = state.auth.isSignedIn;
  const user = state.auth.user;
  useEffect(() => {
    if (user) {
      dispatch(fetchSelectedBusiness(user.uid, false, true));
      dispatch(fetchExperiencesById(user.uid));
      dispatch(fetchPartnersExp(user.email));
    }
  }, [user, dispatch]);
  const onSubmit = (val, imgLink) => {
    dispatch(completeUserData(user, val, imgLink));
  };

  const renderTab = (activeTab) => {
    if (partnersExperiences) {
      switch (activeTab) {
        case 1:
          return (
            <Overview
              currentUser={currentUser}
              partnerExp={partnersExperiences}
              exp={userExperiences}
            />
          );
        case 2:
          return (
            <UserExperiencesSection experiences={userExperiences} />
          );
        case 3:
          return (
            <PartnersExperiences
              experiences={partnersExperiences}
              currentUser={currentUser}
            />
          );
        case 4:
          return <AccountDetails currentUser={currentUser} />;

        default:
          return (
            <Overview
              account={currentUser}
              partnerExp={partnersExperiences}
            />
          );
      }
    } else {
      return (
        <div className="bg-gray-500 inilne-block h-screen -mt-10 flex justify-center items-center text-white cursor-wait">
          <h1 className="font-bold">Loading... Please wait...</h1>
        </div>
      );
    }
  };

  const renderProfile = () => {
    const getUserProfile = (currentUser) => {
      switch (Boolean(currentUser)) {
        case true:
          return (
            <div className="flex -mt-10 h-auto">
              <div className=" inline-block h-auto min-h-screen w-1/4 bg-gray-600">
                <div
                  onClick={() => {
                    setActiveTab(1);
                  }}
                  className={`${
                    activeTab === 1 ? "bg-gray-200" : ""
                  } hover:bg-gray-400 p-4 m4 cursor-pointer`}>
                  Overview
                </div>
                <div
                  onClick={() => {
                    setActiveTab(2);
                  }}
                  className={`${
                    activeTab === 2 ? "bg-gray-200" : ""
                  } hover:bg-gray-400 p-4 m4 cursor-pointer`}>
                  My experiences
                </div>
                <div
                  onClick={() => {
                    setActiveTab(3);
                  }}
                  className={`${
                    activeTab === 3 ? "bg-gray-200" : ""
                  } hover:bg-gray-400 p-4 m4 cursor-pointer`}>
                  My partners experiences
                </div>
                <div
                  onClick={() => {
                    setActiveTab(4);
                  }}
                  className={`${
                    activeTab === 4 ? "bg-gray-200" : ""
                  } hover:bg-gray-400 p-4 m4 cursor-pointer`}>
                  My Account
                </div>
              </div>
              <div className="flex-1 h-auto min-h-screen w-3/4 p-4 bg-gray-200">
                {renderTab(activeTab)}
              </div>
            </div>
          );
        case false:
          if (currentUser === null) {
            return (
              <div className="bg-gray-500 inilne-block h-screen -mt-10 flex justify-center items-center text-white cursor-wait">
                <h1 className="font-bold">
                  Loading... Please wait...
                </h1>
              </div>
            );
          } else
            return (
              <div>
                <div className="flex justify-around ml-6">
                  <div>
                    <h3>Please Complete your Profile infos</h3>
                  </div>
                  <AccountForm onSubmit={onSubmit} />
                </div>
              </div>
            );
        default:
          return (
            <div className="bg-gray-500 inilne-block h-screen -mt-10 flex justify-center items-center text-white cursor-wait">
              <h1 className="font-bold">Loading... Please wait...</h1>
            </div>
          );
      }
    };

    switch (isSignedIn) {
      case true:
        return <>{getUserProfile(currentUser)} </>;
      case false:
        return (
          <div className="flex items-center p-16">
            <h2>
              Please Login or register a new account to access this
              page
            </h2>
            <Link
              className="bg-green-400 px-4 py-1 text-white ml-4 rounded shadow"
              to="/start">
              Get Started
            </Link>
          </div>
        );

      default:
        if (loader) {
          return (
            <div className="bg-gray-500 inilne-block h-screen -mt-10 flex justify-center items-center text-white cursor-wait">
              <h1 className="font-bold">Loading... Please wait...</h1>
            </div>
          );
        }
    }
  };
  return <div>{renderProfile()}</div>;
}
