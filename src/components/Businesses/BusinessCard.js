import React from "react";

export default function BusinessCard(props) {
  const openBusiness = () => {
    props.openBusiness();
  };
  return (
    <div
      key={props.id}
      onClick={() => {
        openBusiness();
      }}
      className="cursor-pointer ml-6 mt-10 card googleBtn">
      <div>
        <img
          className="rounded-lg shadow h-64"
          alt="business"
          src={
            props.Picture
              ? props.Picture
              : "https://2x5ito1uusjd19czwpsrbt7c-wpengine.netdna-ssl.com/wp-content/themes/total-child-theme/assets/images/common/image-placeholder.png"
          }
        />
      </div>
      <div className="border-gray p-4 bg-white -mt-16 p-4">
        <h3 className="mt-4">
          <span className="font-bold rounded bg-white px-4 py-2">
            {props.Bname}
          </span>
        </h3>
        <h4 className="mt-4">
          <span className="font-semibold">About: </span>
          {props.About}
        </h4>
        <h4>
          <span className="font-semibold">Website:</span> {props.Web}
        </h4>
        <h4>
          <span className="font-semibold">City:</span> {props.City}
        </h4>
      </div>
    </div>
  );
}
