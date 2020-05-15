import React from "react";
import { navigate } from "@reach/router";
import { useSelector } from "react-redux";

export default function ThankYou() {
  const state = useSelector((state) => {
    return state;
  });
  const exp = state.experiences.selectedExperience;
  const renderThanks = () => {
    if (exp) {
      return (
        <div className="h-full w-full  text-center border-double border-4 border-gray-600 p-4 ">
          <div className="flex flex-col items-center">
            <img
              className="rounded-lg w-48"
              alt="expereience"
              src={
                exp.Picture
                  ? exp.Picture
                  : "https://2x5ito1uusjd19czwpsrbt7c-wpengine.netdna-ssl.com/wp-content/themes/total-child-theme/assets/images/common/image-placeholder.png"
              }
            />
            <h3 className="inline-block mt-4 mb-4">
              <span className="font-semibold"> {exp.ExpName}</span>
            </h3>
          </div>
          <div className="h-full w-full text-center">
            <h2>
              <span className="font-semibold">Congrats!</span> you
              have successfully completed your purchase. An email with
              your voucher is on it's way to your inbox.
            </h2>
          </div>
        </div>
      );
    } else {
      navigate("/experiences");
    }
  };

  return (
    <div className="h-full">
      <div className="bg-green-400 rounded-lg text-white text-center font-bold px-10 py-6 mb-20">
        Thank you
      </div>
      <div>{renderThanks()} </div>
    </div>
  );
}
