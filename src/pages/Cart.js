import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Paypal from "../components/Paypal";
import { useNavigate } from "@reach/router";
import { completePurchase, setLoaderState } from "../actions";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return state;
  });
  const exp = state.experiences.selectedExperience;
  const loader = state.loader;
  const paid = state.cart.paid;
  const openExp = (id) => {
    navigate(`/businesses/show/${id}`);
  };

  const handlePurchase = (details) => {
    dispatch(completePurchase(exp, details));
  };

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
    if (loader) {
      return (
        <div className="bg-gray-500 opacity-50 inilne-block h-screen -mt-10 flex justify-center items-center text-white cursor-wait">
          <h1 className="font-bold">
            Processing Payment... Please wait...
          </h1>
        </div>
      );
    } else if (exp) {
      if (paid) {
        navigate("/thankyou");
      } else {
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
              <div className="googleBtn px-2 py-2 bg-gray-400 rounded ">
                Payment
              </div>
              <Paypal
                onPayHandleStart={() => {
                  // dispatch(setLoaderState(true))
                  console.log("PAYYMENT STARTED");
                }}
                onPayHandleFinish={(details) => {
                  handlePurchase(details);
                }}
                exp={exp}
              />
            </div>
          </div>
        );
      }
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

// switch (exp) {
//   case true:
//     return (
//       <div className=" sm:flex justify-around">
//         <div>
//           <div className="googleBtn px-2 py-2 bg-gray-400 rounded ">
//             Selected experience
//           </div>
//           {renderExp()}
//         </div>
//         <div>
//           <div className="googleBtn px-2 py-2 bg-gray-400 rounded ">
//             Appointment
//           </div>
//           <div className=" mt-10 googleBtn px-2 py-2 bg-gray-200 rounded ">
//             Request Appointment Now
//           </div>
//           <div className="mt-10 googleBtn px-2 py-2 bg-gray-200 rounded ">
//             Request Appointment Later
//           </div>
//         </div>
//         <div>
//           <div className="googleBtn px-2 py-2 bg-gray-400 rounded ">
//             Payment
//           </div>
//           <Paypal
//             onPayHandleStart={() => {
//               dispatch(setLoaderState(true))
//             }}
//             onPayHandleFinish={(details) => {
//               handlePurchase(details);
//             }}
//             exp={exp}
//           />
//         </div>
//       </div>
//     );

//   default:
//     return (
//       <div className="h-full w-full  text-center ">
//         <h2 className="font-bold">
//           YOUR CART IS EMPTY, ADD SOMETHING TO IT THEN COME BACK
//           LATER
//         </h2>
//       </div>
//     );;
// }
