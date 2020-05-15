import React from "react";

export default function Paypal({ exp }) {
  const paypalScript = document.createElement("script");
  const parent = document.getElementsByTagName("body")[0];
  paypalScript.src =
    "https://www.paypal.com/sdk/js?currency=EUR&client-id=Aa44bUo_NgIQ3IQv7yTILSS8u-nOEc3o8fbFXv5xxxkh7roRosY_aWNiqVZOJVgpRBumjXrmItw7Jpnd";
  parent.appendChild(paypalScript);
  paypalScript.addEventListener("load", () => {
    console.log("script loaded");
    window.paypal
      .Buttons({
        createOrder: function (data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
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
          });
        },
      })
      .render("#paypal-button-container");
    //This function displays Smart Payment Buttons on your web page.
  });
  return <div className="mt-10" id="paypal-button-container"></div>;
}
