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
      className="cursor-pointer relative ml-4 mt-10 h-auto float-left googleBtn">
      <div>
        <img
          className="rounded-lg shadow h-48 w-64"
          alt="business"
          src={
            props.Picture
              ? props.Picture
              : "https://2x5ito1uusjd19czwpsrbt7c-wpengine.netdna-ssl.com/wp-content/themes/total-child-theme/assets/images/common/image-placeholder.png"
          }
        />
      </div>
      <div className="px-2">
        <div className="relative w-64 rounded-lg shadow-lg text-justify px-4 py-3  -mt-12">
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
            <span className="font-semibold">Website:</span>{" "}
            {props.Web}
          </h4>
          <h4>
            <span className="font-semibold">City:</span> {props.City}
          </h4>
        </div>
      </div>
    </div>
  );
}
