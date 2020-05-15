import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Paypal from "../components/Paypal";
import { useNavigate } from "@reach/router";
import { splitProfit } from "../actions";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const exp = state.experiences.selectedExperience;
  const openExp = (id) => {
    navigate(`/businesses/show/${id}`);
  };

  const completePurchase = () => {
    dispatch(splitProfit(exp));

    navigate("/thankyou");
    console.log("clicked");
  };
  // useEffect(() => {
  //   const createPayments = () => {
  //     const paypalScript = document.createElement("script");
  //     const parent = document.getElementsByTagName("body")[0];
  //     paypalScript.src =
  //       "https://www.paypal.com/sdk/js?currency=EUR&client-id=Aa44bUo_NgIQ3IQv7yTILSS8u-nOEc3o8fbFXv5xxxkh7roRosY_aWNiqVZOJVgpRBumjXrmItw7Jpnd";
  //     parent.appendChild(paypalScript);
  //     paypalScript.addEventListener("load", () => {
  //       console.log("script loaded");
  //       window.paypal
  //         .Buttons({
  //           createOrder: function (data, actions) {
  //             // This function sets up the details of the transaction, including the amount and line item details.
  //             return actions.order.create({
  //               purchase_units: [
  //                 {
  //                   description: exp.ExpName,
  //                   amount: {
  //                     currency_code: "EUR",
  //                     value: exp.Price,
  //                   },
  //                 },
  //               ],
  //             });
  //           },
  //           onApprove: function (data, actions) {
  //             // This function captures the funds from the transaction.
  //             return actions.order.capture().then(function (details) {
  //               // This function shows a transaction success message to your buyer.
  //               const paymentData = {
  //                 payerID: data.payerID,
  //                 orderID: data.orderID,
  //               };
  //               console.log("Payment Approved: ", paymentData);
  //               console.log("Details: ", details);
  //               // create collection called user Transaction in firebase to store each
  //               // user transaction using "details" Object from paypal
  //             });
  //           },
  //         })
  //         .render("#paypal-button-container");
  //       //This function displays Smart Payment Buttons on your web page.
  //     });
  //   };
  //   if (exp) {
  //     createPayments();
  //   }
  // }, [exp]);

  const renderExp = () => {
    if (exp === null) {
      return null;
    } else {
      return (
        <div
          className="border-double border-4 border-gray-600 p-4 sm:w-2/4 lg:w-1/3 m-2"
          onClick={() => {
            openExp(exp.id, exp);
          }}>
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
            <span className="font-semibold"> {exp.ExpName}</span>
          </h3>
          <h4 className="mt-4">
            <span className="font-semibold">Description: </span>{" "}
            {exp.Desc}{" "}
          </h4>
          <h4 className="mt-4">
            <span className="font-semibold">Price:</span>{" "}
            {`${exp.Price} EUR`}
          </h4>
        </div>
      );
    }
  };

  const renderCart = () => {
    if (exp) {
      return (
        <div className=" sm:flex justify-around">
          <div>
            <div className="googleBtn px-2 py-2 bg-gray-400 rounded ">
              Selected experience
            </div>
            {renderExp()}
          </div>
          <div>
            <div className="googleBtn px-2 py-2 bg-gray-400 rounded ">
              Appointment
            </div>
            <div className=" mt-10 googleBtn px-2 py-2 bg-gray-200 rounded ">
              Request Appointment Now
            </div>
            <div className="mt-10 googleBtn px-2 py-2 bg-gray-200 rounded ">
              Request Appointment Later
            </div>
          </div>
          <div>
            <div
              onClick={() => {
                completePurchase();
              }}
              className="googleBtn px-2 py-2 bg-gray-400 rounded ">
              Payment
            </div>
            <Paypal exp={exp} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="h-full w-full  text-center ">
          <h2 className="font-bold">
            YOUR CART IS EMPTY, ADD SOMETHING TO IT THEN COME BACK
            LATER
          </h2>
        </div>
      );
    }
  };
  return (
    <div className="h-full">
      <div className="bg-green-400 rounded-lg text-white text-center font-bold px-10 py-6 mb-20">
        Cart
      </div>
      <div>{renderCart()} </div>
    </div>
  );
}
