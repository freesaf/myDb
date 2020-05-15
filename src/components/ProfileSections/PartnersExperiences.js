import React from "react";
import { Link } from "@reach/router";
import { PartnerExpCard } from "./ProfileExpCard";
import { updateExperience } from "../../actions";
import { useDispatch } from "react-redux";

export default function PartnersExperiences({
  experiences,
  currentUser,
}) {
  const dispatch = useDispatch();
  const experiencesToReview = experiences.filter(
    (exp) => exp.Published === false
  );
  const publishedExperiences = experiences.filter(
    (exp) => exp.Published === true
  );

  // TODO Redirect page after form submit
  const onSubmit = (data, ExpId, OwnerId) => {
    const updatedData = { ...data, PartnerData: currentUser };
    console.log(updatedData);
    dispatch(updateExperience(updatedData, ExpId, OwnerId));
  };

  const renderPartnersName = () => {
    //ADD else at the ende to include if exp.length == 0
    return experiences.map((experience, indx, arr) => {
      if (arr.length > 1 && indx !== arr.length - 1) {
        return (
          <span key={experience.id}>
            <Link
              to={`/businessOwner/${experience.OwnerId}`}
              className="font-semibold cursor-pointer">
              {experience.OwnerBname}
            </Link>
            ,{" "}
          </span>
        );
      } else if (indx === arr.length - 1) {
        return (
          <span key={experience.id}>
            and{" "}
            <Link
              to={`/businessOwner/${experience.OwnerId}`}
              className="font-semibold cursor-pointer">
              {experience.OwnerBname}
            </Link>
            .
          </span>
        );
      } else {
        return (
          <span key={experience.id}>
            <Link
              to={`/businessOwner/${experience.OwnerId}`}
              className="font-semibold cursor-pointer">
              {experience.OwnerBname}
            </Link>
            .
          </span>
        );
      }
    });
  };
  const renderExperiences = (experiences) => {
    return (
      <div className="flex flex-wrap align-top">
        {experiences.map((experience) => {
          return (
            <PartnerExpCard
              key={experience.id}
              submit={onSubmit}
              exp={experience}
            />
          );
        })}
      </div>
    );
  };
  const renderAll = () => {
    if (experiences) {
      // for single experience
      if (experiences.length === 1) {
        return (
          <>
            <p>
              You have {experiences.length} experience in partnership
              with{" "}
              <Link
                to={`/businessOwner/${experiences[0].OwnerId}`}
                className="font-semibold cursor-pointer">
                {experiences[0].OwnerBname}
              </Link>
            </p>
            {experiencesToReview.length > 0 ? (
              <div>
                <p className="border-b-2 border-gray-600 pb-2 font-semibold">
                  {experiencesToReview.length} experience(s) awaiting
                  your review{" "}
                </p>

                <div className="mt-10">
                  {renderExperiences(experiencesToReview)}{" "}
                </div>
              </div>
            ) : null}
            {publishedExperiences.length > 0 ? (
              <div>
                <p className="border-b-2 border-gray-600 pb-2 font-semibold">
                  {publishedExperiences.length} published
                </p>
                <div className="mt-10">
                  {renderExperiences(publishedExperiences)}{" "}
                </div>
              </div>
            ) : null}
          </>
        );
      } else if (experiences.length === 0) {
        return (
          <>
            <p>
              You don't have any experience in partnership with other
              businesses
            </p>
            <Link
              className="bg-green-400 rounded inline-block mt-10 px-4 py-2"
              to="/profile/new">
              Create your Own Experience NOW!
            </Link>
          </>
        );
        // add (s) to experience
      } else {
        return (
          <>
            <p>
              You have {experiences.length} experiences in partnership
              with {renderPartnersName()}
            </p>
            {experiencesToReview.length > 0 ? (
              <div>
                <p className="border-b-2 border-gray-600 pb-2 font-semibold">
                  {experiencesToReview.length} experience(s) awaiting
                  your review{" "}
                </p>

                <div className="mt-10">
                  {renderExperiences(experiencesToReview)}{" "}
                </div>
              </div>
            ) : null}
            {publishedExperiences.length > 0 ? (
              <div>
                <p className="border-b-2 border-gray-600 pb-2 font-semibold">
                  {publishedExperiences.length} published
                </p>
                <div className="mt-10">
                  {renderExperiences(publishedExperiences)}{" "}
                </div>
              </div>
            ) : null}
          </>
        );
      }
    }
  };
  return <section>{renderAll()}</section>;
}
