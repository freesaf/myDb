import React from "react";

export default function ExperienceCard({ exp, openExperience }) {
  const openExp = () => {
    openExperience();
  };
  const renderPartnerName = () => {
    if (exp.PartnerData) {
      return (
        <span>
          {" "}
          and{" "}
          <span className="font-semibold">
            {exp.PartnerData.Bname}
          </span>{" "}
        </span>
      );
    }
  };
  return (
    <div
      onClick={() => {
        openExp();
      }}
      className="cursor-pointer relative ml-4 mt-10 h-auto float-left googleBtn">
      <div className="">
        <img
          className="rounded-lg h-48 w-64"
          alt="experience"
          src={
            exp.Picture
              ? exp.Picture
              : "https://2x5ito1uusjd19czwpsrbt7c-wpengine.netdna-ssl.com/wp-content/themes/total-child-theme/assets/images/common/image-placeholder.png"
          }
        />
      </div>
      <div className="px-2">
        <div className="relative w-64 rounded-lg shadow-lg text-justify px-4 py-3  -mt-12">
          <h3 className="">
            <span className="font-bold bg-white rounded px-4 py-2">
              {exp.ExpName}
            </span>
          </h3>
          <h4 className="mt-4">
            {/* ask each business to write a 2 words description about the offer */}
            <span className="font-semibold">{exp.Desc}</span>
          </h4>
          <h4 className="mt-4">
            Offer from{" "}
            <span className="font-semibold">{exp.OwnerBname}</span>
            {renderPartnerName()}
          </h4>
          <h4 className="mt-4">
            <span className="font-semibold">Price:</span>
            {` ${exp.Price} EUR`}
          </h4>
        </div>
      </div>
    </div>
  );
}
