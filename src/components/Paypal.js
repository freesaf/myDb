import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoaderState } from "../actions";

export default function Paypal({
  exp,
  onPayHandleStart,
  onPayHandleFinish,
}) {
  const onPaymentStart = () => {
    onPayHandleStart();
  };
  const onPaymentFinish = (details) => {
    onPayHandleFinish(details);
  };

  const paypalScript = document.createElement("script");
  useEffect(() => {
    const parent = document.getElementsByTagName("head")[0];
    paypalScript.src =
      "https://www.paypal.com/sdk/js?currency=EUR&client-id=Aa44bUo_NgIQ3IQv7yTILSS8u-nOEc3o8fbFXv5xxxkh7roRosY_aWNiqVZOJVgpRBumjXrmItw7Jpnd";
    parent.appendChild(paypalScript);
    paypalScript.addEventListener("load", () => {
      console.log("script loaded");
      window.paypal
        .Buttons({
          createOrder: function (data, actions) {
            // This function sets up the details of the transaction, including the amount and line item details.
            console.log("data from createOrder:  " + data);
            onPaymentStart();
            return actions.order.create({
              purchase_units: [
                {
                  description: exp.ExpName,
                  amount: {
                    currency_code: "EUR",
                    value: exp.Price,
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            // This function captures the funds from the transaction.
            return actions.order.capture().then(function (details) {
              // This function shows a transaction success message to your buyer.
              const paymentData = {
                payerID: data.payerID,
                orderID: data.orderID,
              };
              console.log("Payment Approved: ", paymentData);
              console.log("Details: ", details);
              // create collection called user Transaction in firebase to store each
              // user transaction using "details" Object from paypal
              onPaymentFinish(details);
            });
          },
          onCancel: function (data) {
            // Show a cancel page, or return to cart
            console.log("payment canceld by the user");
          },
          onError: function (err) {
            // Show an error page here, when an error occurs
            console.log("error from paypal  " + err);
          },
        })
        .render("#paypal-button-container");
      //This function displays Smart Payment Buttons on your web page.
    });
  });
  return <div className="mt-10" id="paypal-button-container"></div>;
}

// {
//     order:
// authorize: ƒ r()
// capture: ƒ r()
// get: ƒ r()
// patch: ƒ r()
// __proto__: Object
// payment: null
// redirect: ƒ r()
// restart: ƒ r()
// subscription:
// activate: ƒ r()
// get: ƒ r()
// __proto__: Object
// __proto__: Object
// }
