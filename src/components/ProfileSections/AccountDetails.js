import React from "react";

export default function AccountDetails({ currentUser }) {
  const renderAccountDetails = () => {
    return (
      <div>
        <h2 className="border-b-2 border-gray-600 pb-2 font-bold">
          My Account Details
        </h2>
        <div className="flex flex-row flex-no-wrap">
          <table
            style={{ borderSpacing: "0px 14px" }}
            className=" border-separate">
            <tbody>
              <tr className=" uppercase tracking-wide text-gray-700 text-xs font-bold">
                <th className="uppercase w-48 text-left">
                  Business Name:
                </th>
                <td className="text-gray-600">{currentUser.Bname}</td>
              </tr>
              <tr className=" tracking-wide text-gray-700 text-xs font-bold">
                <th className="uppercase w-48 text-left">About:</th>
                <td className="text-gray-600">{currentUser.About}</td>
              </tr>
              <tr className=" uppercase tracking-wide text-gray-700 text-xs font-bold">
                <th className="uppercase w-48 text-left">
                  Category:
                </th>
                <td className="text-gray-600">
                  {currentUser.Category}
                </td>
              </tr>
              <tr className=" tracking-wide text-gray-700 text-xs font-bold">
                <th className="uppercase w-48 text-left">Address:</th>
                <td className="text-gray-600">
                  {currentUser.Address}
                </td>
              </tr>
              <tr className=" tracking-wide text-gray-700 text-xs font-bold">
                <th className="uppercase w-48 text-left">
                  Phone Number:
                </th>
                <td className="text-gray-600">
                  {currentUser.Bnumber}
                </td>
              </tr>
              <tr className=" tracking-wide text-gray-700 text-xs font-bold">
                <th className="uppercase w-48 text-left">City:</th>
                <td className="text-gray-600">{currentUser.City}</td>
              </tr>
              <tr className=" tracking-wide text-gray-700 text-xs font-bold">
                <th className="uppercase w-48 text-left">
                  Opening Hours:
                </th>
                <td className="text-gray-600">
                  {currentUser.Ohours}
                </td>
              </tr>
              <tr className=" tracking-wide text-gray-700 text-xs font-bold">
                <th className="uppercase w-48 text-left">Website:</th>
                <td className="text-gray-600">{currentUser.Web}</td>
              </tr>
              <tr className=" tracking-wide text-gray-700 text-xs font-bold">
                <th className="uppercase w-48 text-left">
                  Terms and conditions:
                </th>
                <td className="text-gray-600">{currentUser.Terms}</td>
              </tr>
            </tbody>
          </table>
          <div className=" inline h-10 p-2 rounded-xl text-white bg-gray-500 cursor-pointer w-20">
            Edit
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {renderAccountDetails()}
      <div>
        <h2 className="border-b-2 border-gray-600 pb-2 font-bold">
          My Earnings
        </h2>
      </div>
    </div>
  );
}
