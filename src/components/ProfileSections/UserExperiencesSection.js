import React from "react";
import { Link } from "@reach/router";
import { UserExpCard } from "./ProfileExpCard";

export default function UserExperiencesSection({ experiences }) {
  const experiencesToReview = experiences.filter(
    (exp) => exp.Published === false
  );
  const publishedExperiences = experiences.filter(
    (exp) => exp.Published === true
  );
  const renderExperiences = (experiences) => {
    return (
      <div className="flex flex-wrap align-top">
        {experiences.map((experience) => {
          return <UserExpCard key={experience.id} exp={experience} />;
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
            <div className="flex flex-no-wrap items-center">
              <p>{`You have ${experiences.length} experience`}</p>
              <Link
                className="bg-green-400 rounded inline-block ml-6 px-4 py-2"
                to="/profile/new">
                Create another Experience!
              </Link>
            </div>
            {experiencesToReview.length > 0 ? (
              <div>
                <p className="border-b-2 border-gray-600 pb-2 font-semibold">
                  {experiencesToReview.length} experience(s) awaiting
                  your partner acceptance
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
                  experience(s)
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
            <p>You didn't create any experience yet!</p>
            <Link
              className="bg-green-400 rounded inline-block mt-10 px-4 py-2"
              to="/profile/new">
              Start Creating your First Experience NOW!
            </Link>
          </>
        );
        // add (s) to experience
      } else {
        return (
          <>
            <p>You created {experiences.length} experiences</p>
            {experiencesToReview.length > 0 ? (
              <div>
                <p className="border-b-2 border-gray-600 pb-2 font-semibold">
                  {experiencesToReview.length} experience(s) awaiting
                  your partner acceptance
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
                  experience(s)
                </p>
                <div className="mt-10">
                  {renderExperiences(publishedExperiences)}{" "}
                </div>
              </div>
            ) : null}
          </>
          // <>
          //   <div className="flex flex-wrap items-center">
          //     <p>You have {experiences.length} experiences</p>
          //     <Link
          //       className="bg-green-400 rounded inline-block ml-4 px-4 py-2"
          //       to="/profile/new">
          //       Create another Experience!
          //     </Link>
          //   </div>
          //   {experiencesToReview.length > 0 ? (
          //     <div>
          //       <p className="border-b-2 border-gray-600 pb-2 font-semibold">
          //         You have {experiencesToReview.length} experience(s)
          //         awaiting your partner acceptance{" "}
          //       </p>

          //       <div className="mt-10">
          //         {renderExperiences(experiencesToReview)}{" "}
          //       </div>
          //     </div>
          //   ) : null}
          //   <div className="mt-10">{renderExperiences()} </div>
          // </>
        );
      }
    }
  };
  return <section>{renderAll()}</section>;
}
