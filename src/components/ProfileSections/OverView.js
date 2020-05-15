import React from "react";
import { Link } from "@reach/router";

export default function OverView({ currentUser, partnerExp, exp }) {
  const renderOverview = () => {
    if (partnerExp && exp) {
      return (
        <>
          <div className="flex justify-between">
            <h2>
              Welcome{" "}
              <span className="font-semibold">
                {currentUser.Bname}
              </span>
            </h2>
            <div>
              <h4>Account balance: {currentUser.Balance} EUR </h4>
            </div>
          </div>

          <div className="mt-10">
            {partnerExp.length > 0 ? (
              <p>
                You have {partnerExp.length} experience in partnership
                with other businesses
              </p>
            ) : (
              <p>
                You don't have any experience in partnership with
                other businesses
              </p>
            )}
          </div>
          <div className={"mt-10"}>
            {exp.length > 0 ? (
              <p>You created {exp.length} experience(s) </p>
            ) : (
              <p>You didn't create any experience</p>
            )}
          </div>
          {exp.length > 0 ? (
            <Link
              className="bg-green-400 rounded inline-block mt-10 px-4 py-2"
              to="/profile/new">
              Create a new Experience!
            </Link>
          ) : (
            <Link
              className="bg-green-400 rounded inline-block mt-10 px-4 py-2"
              to="/profile/new">
              Start Creating Your First Experience!
            </Link>
          )}
        </>
      );
    }
  };

  return <section>{renderOverview()} </section>;
}
