import React, { useState } from "react";
import { useForm } from "react-hook-form";

import ApprovalCard from "./ApprovalCard";
import ProgressBar from "../ProgressBar";
import { uploadFile, setImgLinktoNull } from "../../actions";
import { useSelector, useDispatch } from "react-redux";

export function UserExpCard({ exp }) {
  // const [isIneditMode, setEditMode] = useState(false);
  let profitDist = exp.Profit.split("/");
  profitDist = profitDist.map((n) => n.substring(n.length - 2));
  // const editMode = () => {
  //   console.log("Go to edit mode");
  //   setEditMode(!isIneditMode);
  //   console.log(isIneditMode);
  // };
  return (
    <div className="border-double border-4 border-gray-600 p-4 sm:w-2/4 lg:w-1/3 m-2">
      <div>
        <img
          className="rounded-lg w-64"
          alt="expereience"
          src={
            exp.Picture
              ? exp.Picture
              : "https://2x5ito1uusjd19czwpsrbt7c-wpengine.netdna-ssl.com/wp-content/themes/total-child-theme/assets/images/common/image-placeholder.png"
          }
        />
      </div>
      <h3 className="inline-block mt-10">
        <span className="font-semibold">Experience: </span>{" "}
        {exp.ExpName}{" "}
      </h3>
      <h4 className="mt-4">
        <span className="font-semibold">My Offer: </span> {exp.Desc}{" "}
      </h4>

      <h4 className="mt-4">
        <span className="font-semibold">Partner: </span> {exp.Partner}
      </h4>
      <h4 className="mt-4">
        <span className="font-semibold">Valid till: </span>{" "}
        {exp.Deadline}{" "}
      </h4>
      <h4 className="mt-4">
        <span className="font-semibold">Profit distribution:</span>{" "}
        {`Me: ${profitDist[0]}% and my Partner: ${profitDist[1]}%`}
      </h4>
      <h4 className="mt-4">
        <span className="font-semibold">Price: </span>
        {`${exp.Price} EUR`}
      </h4>
      <h4 className="mt-4">
        <span className="font-semibold ">Status: </span>{" "}
        {exp.Published ? (
          <span className="inline-block font-semibold text-white mt-10 bg-green-600 px-4 py-2">
            Published
          </span>
        ) : (
          <span className="text-xs mt-10 bg-yellow-500 px-1 py-2">
            Awaiting Partner acceptance
          </span>
        )}
      </h4>
    </div>
  );
}

export function PartnerExpCard({ exp, submit }) {
  const [isHidden, setisHidden] = useState(true);
  const [showX, setshowX] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  let profitDist = exp.Profit.split("/");
  profitDist = profitDist.map((n) => n.substring(n.length - 2));
  const onSubmit = (val) => {
    const data = {
      ...val,
      PartnerPicture,
      Published: true,
    };
    const upData = Object.assign(exp, data);
    submit(upData, exp.id, exp.OwnerId);
  };
  console.log(errors);

  const state = useSelector((state) => {
    return state;
  });
  const PartnerPicture = state.uploads.downloadURL;
  const progressValue = state.uploads.uploadProgress;
  // FIX PartnerPicture showing when there is multiple experiences
  const handleChange = (files) => {
    setisHidden(false);
    console.log("upload started");
    dispatch(uploadFile(files, "images"));
  };

  const onReject = () => {
    console.log("Reject");
    alert(
      "Ali: should I delete the exp for the 2 businesses or publish it  only for the one who created it ??"
    );
  };

  return (
    <div className="border-double border-4 border-gray-600 p-4 sm:w-2/4 lg:w-1/3 m-2">
      <div>
        <img
          className="rounded-lg w-64"
          alt="expereience"
          src={
            exp.Picture
              ? exp.Picture
              : "https://2x5ito1uusjd19czwpsrbt7c-wpengine.netdna-ssl.com/wp-content/themes/total-child-theme/assets/images/common/image-placeholder.png"
          }
        />
      </div>
      <h3 className="inline-block mt-10">
        <span className="font-semibold">Experience: </span>{" "}
        {exp.ExpName}{" "}
      </h3>
      <h4 className="mt-4">
        <span className="font-semibold">Description: </span>{" "}
        {exp.Desc}{" "}
      </h4>
      {exp.PartnerOffer ? (
        <h4 className="mt-4">
          <span className="font-semibold">My Offer:</span>{" "}
          {exp.PartnerOffer}
        </h4>
      ) : null}
      {exp.PartnerPicture ? (
        <img
          className="rounded-lg w-64"
          alt="experience"
          src={exp.PartnerPicture}
        />
      ) : null}
      <h4 className="mt-4">
        <span className="font-semibold">Valid till: </span>{" "}
        {exp.Deadline}{" "}
      </h4>
      <h4 className="mt-4">
        <span className="font-semibold">Price:</span>{" "}
        {`${exp.Price} EUR`}
      </h4>
      <h4 className="mt-4">
        <span className="font-semibold">Profit distribution:</span>{" "}
        {`Me: ${profitDist[1]}% and my Partner: ${profitDist[0]}%`}
      </h4>

      {exp.Published ? (
        <h4 className="mt-4">
          <span className="font-semibold ">Status: </span>
          <span className="inline-block font-semibold text-white mt-10 bg-green-600 px-4 py-2">
            Published
          </span>
        </h4>
      ) : (
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="myoffer">
            Your Offer
          </label>
          <textarea
            id="myoffer"
            placeholder="write your offer here"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-400"
            name="PartnerOffer"
            ref={register({ required: true })}
          />
          <br />
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="image">
            Image of your experience
          </label>
          <input
            onChange={(e) => {
              handleChange(e.target.files);
            }}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-400"
            id="image"
            type="file"
            placeholder="Image of the experience"
            name="PartnerPicture"
            ref={register}
          />
          <ProgressBar
            percentage={progressValue}
            show={isHidden ? "hidden" : "block"}
          />
          <div
            className={`${
              PartnerPicture ? "block" : "hidden"
            } cursor-pointer w-10`}
            onClick={() => {
              //TO DO delete img from firebase storage
              console.log("remove image");
              dispatch(setImgLinktoNull());
            }}
            onMouseEnter={() => {
              setshowX(true);
            }}
            onMouseLeave={() => {
              setshowX(false);
            }}>
            <img src={PartnerPicture} alt="experience" />
            <span
              className={`${
                showX ? "inline" : "hidden"
              } text-red-600 font-bold deleteImg mb-0 pb-0`}>
              X
            </span>
          </div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="redeem">
            Can your offer be redeemed separetely ?
          </label>
          <input
            id="redeem"
            className="w-10"
            type="checkbox"
            name="RedeemPartnerOffer"
            ref={register}
          />
          <p className="text-gray-500 text-xs italic">
            Check the box if your offer can be be redeemed separetely.
          </p>
          <ApprovalCard
            onReject={() => {
              onReject();
            }}>
            Would you like to Publish this Experience ?
          </ApprovalCard>
        </form>
      )}
    </div>
  );
}
