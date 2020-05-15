import React, { useEffect } from "react";
import ExperienceCard from "../components/experiences/ExperienceCard";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSelectedBusiness,
  fetchSelectedBusinessExperiences,
} from "../actions/";
import { EXPERIENCE_SELECTED } from "../actions/types";
import { useNavigate } from "@reach/router";

export default function BusinessOwner(props) {
  const navigate = useNavigate();
  const openExp = (id, exp) => {
    dispatch({ type: EXPERIENCE_SELECTED, payload: exp });
    navigate(`/businesses/show/${id}`);
  };
  const state = useSelector((state) => {
    return state;
  });
  const business = state.businesses.selectedBusiness;
  const exp = state.experiences.selectedBizExpriences;
  const partnersExperiences =
    state.experiences.businessPartExperiences;
  const dispatch = useDispatch();

  useEffect(() => {
    //get the selected business and its partners experiences
    dispatch(fetchSelectedBusiness(props.id, true));
    //get the selected business experiences
    dispatch(fetchSelectedBusinessExperiences(props.id));
  }, [props.id, dispatch]);

  const renderPartnersExperiences = (exp) => {
    exp = exp.filter((e) => e.Published === true);
    console.log(exp);
    return exp.map((e) => {
      return (
        <ExperienceCard
          openExperience={() => {
            openExp(e.id, e);
          }}
          key={e.id}
          exp={e}
        />
      );
    });
  };

  const renderBizExperiences = (exp) => {
    return exp.map((e) => {
      return (
        <ExperienceCard
          openExperience={() => {
            openExp(e.id, e);
          }}
          key={e.id}
          exp={e}
        />
      );
    });
  };

  const renderBizOwner = () => {
    if (business === null) {
      return null;
    } else if (business && exp && partnersExperiences) {
      return (
        <div>
          <h2 className="bg-green-400 rounded-lg text-white text-center font-bold px-10 py-6">
            {business.Bname}
          </h2>
          <div className=" mt-20">
            <div className="text-center mt-4 mb-4">
              <h3 className="font-bold inline-block mt-4 mb-4">
                Location &amp; Hours
              </h3>
              <div className="flex">
                <div className="p4 ml-20 mr-24">
                  <img
                    src="https://maps.googleapis.com/maps/api/staticmap?scale=1&center=48.770162%2C11.436247&language=en&zoom=15&markers=scale%3A1%7Cicon%3Ahttps%3A%2F%2Fyelp-images.s3.amazonaws.com%2Fassets%2Fmap-markers%2Fannotation_32x43.png%7C48.770162%2C11.436247&client=gme-yelp&sensor=false&size=315x150&signature=z2dN5oDwlCEqXBgfX182OdSbKzQ="
                    alt="Map"
                  />
                  <p className="font-semibold mt-6 cursor-pointer">
                    Get Location
                  </p>
                </div>
                <div className="flex-1">
                  <table className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                    <tbody>
                      <tr className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                        <th className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                          Address
                        </th>
                        <td className="border-solid border-2 border-collapse border-gray-900 font-semibold py-4 px-2">
                          {business.Address}
                        </td>
                      </tr>
                      <tr className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                        <th className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                          Opening Hours
                        </th>
                        <td className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                          {business.Ohours}
                        </td>
                      </tr>
                      <tr className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                        <th className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                          Website
                        </th>
                        <td className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                          {business.Web}
                        </td>
                      </tr>
                      <tr className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                        <th className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                          Ts and CS
                        </th>
                        <td className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                          {business.Terms}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="overflow-hidden pb-10">
                <div className="max-w-6xl text-center ">
                  <h3 className="inline-block font-bold mt-4 mb-4 ">
                    Experiences
                  </h3>
                  <div className="h-auto w-full overflow-x-auto">
                    {renderBizExperiences(exp)}
                    {renderPartnersExperiences(partnersExperiences)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          ;
        </div>
      );
    }
  };
  return <div>{renderBizOwner()}</div>;
}
