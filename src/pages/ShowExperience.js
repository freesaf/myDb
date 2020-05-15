import React, { useEffect } from "react";
import { Link } from "@reach/router";

import { useSelector, useDispatch } from "react-redux";
import { fetchSelectedExperience } from "../actions";

export default function ShowExperience(props) {
  const state = useSelector((state) => {
    return state;
  });
  const selectedExp = state.experiences.selectedExperience;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSelectedExperience(props.id));
  });

  const renderExpDetails = () => {
    if (selectedExp === null) {
      return null;
    } else {
      return (
        <div>
          <div className="bg-green-400 rounded-lg text-center text-white font-bold px-10 py-6 mb-20">
            {selectedExp.ExpName} Details and Conditions
          </div>
          <table className="border-solid border-2 border-collapse border-gray-900 font-semibold ml-24 py-2 px-2">
            <tbody>
              <tr className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                <th className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                  Participating Partners
                </th>
                <th className="border-solid border-2 border-collapse border-gray-900 font-semibold py-4 px-2">
                  {selectedExp.OwnerBname}
                </th>
                <th className="border-solid border-2 border-collapse border-gray-900 font-semibold py-4 px-2">
                  {selectedExp.PartnerData.Bname}
                </th>
              </tr>
              <tr className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                <th className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                  Offer
                </th>
                <td className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                  {selectedExp.OwnerOffer}
                </td>
                <td className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                  {selectedExp.PartnerOffer}
                </td>
              </tr>
              <tr className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                <th className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                  Validity Period
                </th>
                <td
                  colSpan="2"
                  className="border-solid border-2 border-collapse border-gray-900 text-center font-semibold py-2 px-2">
                  {selectedExp.Deadline}
                </td>
              </tr>
              <tr className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                <th className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                  Can appointement be redemed separately ?
                </th>
                <td
                  colSpan="2"
                  className="border-solid border-2 border-collapse text-center border-gray-900 font-semibold py-2 px-2">
                  Yes
                </td>
              </tr>
              <tr className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                <th className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                  Advance notice for change
                </th>
                <td
                  colSpan="2"
                  className="border-solid border-2 border-collapse text-center border-gray-900 font-semibold py-2 px-2">
                  24 hours
                </td>
              </tr>
              <tr className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                <th className="border-solid border-2 border-collapse border-gray-900 font-semibold py-2 px-2">
                  Price
                </th>
                <td
                  colSpan="2"
                  className="border-solid border-2 border-collapse text-center border-gray-900 font-semibold py-2 px-2">
                  {selectedExp.Price} EUR
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-around mt-10">
            <img
              className="w-64"
              src={selectedExp.Picture}
              alt="offer1"
            />
            <Link
              className="bg-green-400 h-10 p-2 rounded shadow"
              to={`/cart`}>
              Add to cart
            </Link>
            <img
              className="w-64"
              src={selectedExp.PartnerPicture}
              alt="offer2"
            />
          </div>
        </div>
      );
    }
  };
  return <div>{renderExpDetails()}</div>;
}
