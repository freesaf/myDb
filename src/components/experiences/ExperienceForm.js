import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import ProgressBar from "../ProgressBar";
import {
  searchBusinessByNameorEmail,
  uploadFile,
  setImgLinktoNull,
} from "../../actions";

export default function ExperienceForm(props) {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });
  const [isHidden, setisHidden] = useState(true);
  const [showX, setshowX] = useState(false);
  // const [partnerRegistered, setpartnerRegistered] = useState(false);
  // const [showMesssage, setshowMesssage] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });

  const partnerData = state.businesses.searchedBusiness;
  const progressValue = state.uploads.uploadProgress;
  let imgLink = state.uploads.downloadURL;
  const checkPartner = async (e) => {
    dispatch(searchBusinessByNameorEmail(e));
  };

  const handleChange = (files) => {
    setisHidden(false);
    dispatch(uploadFile(files, "images"));
  };
  console.log(partnerData);

  const onSubmit = (val) => {
    // if files[0] exist and imgLink undefined alert Please reupload the image
    props.onSubmit(val, partnerData, imgLink);
  };
  console.log(errors);

  return (
    <div className="w-2/4">
      <form
        className="w-full max-w-lg"
        onSubmit={handleSubmit(onSubmit)}>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="expName">
          Name of your experience
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-400"
          id="expName"
          type="text"
          placeholder="Name of the experience"
          name="ExpName"
          ref={register({ required: true, min: 4 })}
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
          name="Picture"
          ref={register}
        />
        <ProgressBar
          percentage={progressValue}
          show={isHidden ? "hidden" : "block"}
        />
        <div
          className={`${
            imgLink ? "block" : "hidden"
          } cursor-pointer w-10`}
          onClick={() => {
            //TO DO delete img from firebase storage
            console.log("image deleted");
            dispatch(setImgLinktoNull());
          }}
          onMouseEnter={() => {
            setshowX(true);
          }}
          onMouseLeave={() => {
            setshowX(false);
          }}>
          <img src={imgLink} alt="experience" />
          <span
            className={`${
              showX ? "inline-block" : "hidden"
            } text-red-600 text-xs font-bold mb-0 pb-0`}>
            Delete
          </span>
        </div>
        <br />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="partner">
          email of your Cooperation partner:
        </label>
        <input
          onBlur={(e) => {
            checkPartner(e.target.value);
          }}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-gray-400"
          id="partner"
          type="text"
          placeholder="Cooperation Partner(s)"
          name="Partner"
          ref={register({ required: true })}
        />
        {/* 
        {showMesssage &&
          (partnerRegistered ? (
            <p
              className={
                "inline-block text-green-500 text-xs italic mb-3"
              }>
              User found: your partner will recieve a notification
              about your offer your experience will be published once
              he accpet
            </p>
          ) : (
            <p className="inline-block text-red-500 text-xs italic mb-3">
              The email address you enterd is not yet registred on the
              platform
              <br />
              <span className="underline cursor-pointer bg-gray-300 rounded px-2 ">
                Send invitation to your Partner to join the Platform
              </span>
            </p>
          ))} */}
        <br />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="desc">
          Overall experience Description
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-400"
          id="desc"
          type="text"
          placeholder="One sentence to describe the overall experience"
          name="Desc"
          ref={register({
            required: true,
            validate: {
              descLengthValidate: (value) => {
                return (
                  value.length < 120 || "maximum length 120 character"
                );
              },
            },
          })}
        />
        {errors.Desc ? (
          <p className="text-red-600 text-xs italic">
            {" "}
            {errors.Desc.message}{" "}
          </p>
        ) : (
          <p className="text-gray-600 text-xs italic">
            maximum length 120 character
          </p>
        )}

        <br />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="desc">
          Your offer Description
        </label>

        <textarea
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-400 focus:border-gray-500"
          id="desc"
          placeholder="offer description"
          name="OwnerOffer"
          ref={register({ required: true, min: 10 })}
        />
        {/* <p className="text-gray-500 text-xs italic">Please fill out this field.</p> */}
        <br />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="redeem">
          Can your offer be redeemed separetely ?
        </label>
        <input
          id="redeem"
          className="w-10"
          type="checkbox"
          name="RedeemOffer"
          ref={register}
        />
        <p className="text-gray-500 text-xs italic">
          Check the box if your offer can be be redeemed separetely.
        </p>
        <br />

        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="category">
          Category of your experience
        </label>

        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          id="category"
          name="Category"
          ref={register({ required: true })}>
          <option value="">
            Please choose your Experience Category &#x25BC;
          </option>
          <option>Birthday</option>
          <option>Wedding</option>
          <option>Wellness</option>
          <option>Get-away</option>
        </select>
        <br />

        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="conditions">
          Your experience conditions
        </label>

        <textarea
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-400 focus:border-gray-500"
          id="conditions"
          placeholder="Conditions"
          name="Conditions"
          ref={register({ required: true, min: 10 })}
        />
        {/* <p className="text-gray-500 text-xs italic">Please fill out this field.</p> */}
        <br />

        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="deadline">
          Your offer will be valid untill
        </label>

        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-400 focus:border-gray-500"
          id="deadline"
          type="date"
          placeholder="Offer for sale till"
          name="Deadline"
          ref={register({ required: true })}
        />
        {/* <p className="text-gray-500 text-xs italic">Please fill out this field.</p> */}
        <br />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="price">
          The price of your experience
        </label>

        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-400 focus:border-gray-500"
          id="price"
          type="number"
          placeholder="Price"
          name="Price"
          ref={register({ required: true, min: 5 })}
        />
        {/* <p className="text-gray-500 text-xs italic">Please fill out this field.</p> */}
        <br />

        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="profit">
          How you will distribute the profit between partners
        </label>

        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          id="profit"
          name="Profit"
          ref={register({ required: true })}>
          <option value="me:50/ partner:50">me:50/ partner:50</option>
          <option value="me:60/ partner:40">me:60/ partner:40</option>
          <option value="me:70/ partner:30">me:70/ partner:30</option>
          <option value="me:80/ partner:20">me:80/ partner:20</option>
          <option value="me:90/ partner:10">me:90/ partner:10</option>
        </select>
        <br />

        <input
          className="bg-green-300 border border-solid border-green-500 p-2 rounded-lg hover:bg-green-400"
          type="submit"
        />
      </form>
    </div>
  );
}
