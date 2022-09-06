import React, { useEffect } from "react";
import { useNavigate } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";

import { fetchPublishedExp, fetchAllBusinesses } from "../actions";
import BusinessCard from "../components/Businesses/BusinessCard";
import ExperienceCard from "../components/experiences/ExperienceCard";

export default function Home() {
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  const experiences = state.experiences.publishedExperiences;
  const businesses = state.businesses.businessesList;
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchPublishedExp());
    dispatch(fetchAllBusinesses());
    console.log("executed");
  }, [dispatch]);

  const openTarget = (id, e, target) => {
    navigate(`/${target}${id}`);
  };

  const renderBusinesses = () => {
    if (businesses === null) {
      return null;
    } else {
      return businesses.map((b) => {
        return (
          <BusinessCard
            openBusiness={() => {
              openTarget(b.Uid, b, "businessOwner/");
            }}
            key={b.Uid}
            Picture={b.Picture}
            Bname={b.Bname}
            About={b.About}
            Web={b.Web}
            City={b.City}
          />
        );
      });
    }
  };

  const renderExperiences = () => {
    if (experiences === null) {
      return null;
    } else {
      return experiences.map((e) => {
        return (
          <ExperienceCard
            key={e.id}
            openExperience={() => {
              openTarget(e.id, e, "businesses/show/");
            }}
            exp={e}
          />
        );
      });
    }
  };
  return (
    <div>
      <div
        className=" bg-fixed max-w-full"
        style={{
          backgroundImage:
            "url(http://www.shoppingaffordable.net/wp-content/uploads/2018/05/shopping-hero-first_card.jpg)",
        }}>
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          className=" flex flex-col justify-around text-center h-screen">
          <div className="text-white text-4xl  font-bold">
            Welcome to Zamma Zamba
          </div>
          <div className="px-10 sm:px-48">
            <h1 className="text-left block uppercase tracking-wide text-white text-2xl sm:text-4xl font-bold mb-2">
              Find the
              <span className="block text-4xl sm:text-6xl">
                best Local experiences
              </span>
            </h1>
            <div
              style={{ backgroundColor: "rgba(255,255,255,0.45)" }}
              className="flex justify-center items-end text-center ">
              <input
                className=" block w-3/4 bg-gray-200 text-gray-700 border border-gray-700 rounded h-12 py-3 px-4 m-4 leading-tight focus:outline-none focus:bg-gray-400"
                type="search"
                name="search business"
                id="searchHome"
              />
              <button className="ion-ios-search bg-blue-500 text-white text-2xl block rounded leading-tight w-12 h-12  m-4"></button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-20">
        <h2 className="uppercase tracking-wide text-2xl font-bold mb-8">
          what is Zamma Zamba ?
        </h2>
        <iframe
          className="max-w-2/3s"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/DNTaJhB6XtQ"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="px-4 sm:px-16">
        <div className="overflow-hidden mt-10 pb-10">
          <div className="flex flex-col justify-center items-center">
            <h3 className="uppercase tracking-wide text-xl font-bold">
              Browse Businesses
            </h3>
          </div>
          <div className="max-w-6xl text-center ">
            <div className="h-auto w-full overflow-x-auto">
              {renderBusinesses(businesses)}
            </div>
          </div>
        </div>
        <div className="overflow-hidden pb-10">
          <div className="flex flex-col justify-center items-center mt-4">
            <h3 className="uppercase tracking-wide text-xl font-bold mb-4">
              Browse Experiences
            </h3>
          </div>
          <div className="max-w-6xl text-center ">
            <div className="h-auto w-full overflow-x-auto">
              {renderExperiences(experiences)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
