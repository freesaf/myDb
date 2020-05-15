import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import ProgressBar from "../ProgressBar";
import { uploadFile } from "../../actions";
export default function AccountForm(props) {
  const state = useSelector((state) => {
    return state;
  });
  const [isHidden, setisHidden] = useState(true);
  const [showX, setshowX] = useState(false);
  const progressValue = state.uploads.uploadProgress;
  const imgLink = state.uploads.downloadURL;
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (val) => {
    props.onSubmit(val, imgLink);
  };
  console.log(errors);

  const handleChange = (files) => {
    setisHidden(false);
    dispatch(uploadFile(files, "images"));
  };

  return (
    <div className="w-2/4">
      <form
        className="w-full max-w-lg"
        onSubmit={handleSubmit(onSubmit)}>
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="bname">
          Name of your Business
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="bname"
          type="text"
          placeholder="Name of the business"
          name="Bname"
          ref={register({ required: true })}
        />
        <br />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="image">
          Image of your Business
          <span className="text-gray-500 lowercase text-xs italic">
            {"  "} (ie: your storeFront image)
          </span>
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
              showX ? "inline" : "hidden"
            } text-red-600 font-bold deleteImg mb-0 pb-0`}>
            X
          </span>
        </div>
        <br />

        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="about">
          About your Business
        </label>

        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="about"
          type="text"
          placeholder="Small description about your business"
          name="About"
          ref={register({
            required: true,
            validate: {
              aboutLengthCheck: (value) => {
                return value.length < 175 || "maximum 175 characters";
              },
            },
          })}
        />
        <p className="text-red-500 text-xs italic">
          {errors.About ? errors.About.message : null}
        </p>

        <br />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="category">
          Your Business Category
        </label>

        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          id="category"
          name="Category"
          ref={register({
            required: true,
            validate: {
              selectCategory: (value) => {
                return Boolean(value) || "Please select one Category";
              },
            },
          })}>
          <option value="">
            Please choose your Business Category &#x25BC;
          </option>
          <option>Solo Artist</option>
          <option>Saloon</option>
          <option>Photographer</option>
          <option>Restaurant</option>
          <option>Liquor store</option>
        </select>
        <p className="text-red-500 text-xs italic">
          {errors.Category ? errors.Category.message : null}
        </p>
        <br />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="adress">
          Your Business address
        </label>

        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="adress"
          type="text"
          placeholder="Address"
          name="Address"
          ref={register({ required: true, min: 10 })}
        />
        {/* <p className="text-gray-500 text-xs italic">Please fill out this field.</p> */}
        <br />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="num">
          Phone Number
        </label>

        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="num"
          type="number"
          name="Bnumber"
          ref={register({ required: true, min: 5 })}
        />
        {/* <p className="text-gray-500 text-xs italic">Please fill out this field.</p> */}
        <br />

        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="city">
          City
        </label>

        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="city"
          type="text"
          placeholder="City"
          name="City"
          ref={register({ required: true })}
        />
        {/* <p className="text-gray-500 text-xs italic">Please fill out this field.</p> */}
        <br />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="hours">
          Opening Hours
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="hours"
          type="text"
          placeholder="Di. - Sa, 08:00-17:00 Uhr"
          name="Ohours"
          ref={register}
        />
        <br />

        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="website">
          Website of your Business:
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="website"
          type="text"
          placeholder="Website"
          name="Web"
          ref={register({ required: true })}
        />
        {/* <p className="text-gray-500 text-xs italic">Please fill out this field.</p> */}
        <br />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="terms">
          Your Terms and Condition
        </label>

        <textarea
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="terms"
          placeholder="terms and conditions"
          name="Terms"
          ref={register({ required: true, min: 10 })}
        />
        {/* <p className="text-gray-500 text-xs italic">Please fill out this field.</p> */}
        <br />

        <input
          className="bg-green-300 border border-solid border-green-500 p-2 rounded-lg hover:bg-green-400"
          type="submit"
        />
      </form>
    </div>
  );
}
