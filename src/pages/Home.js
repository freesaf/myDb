import React from "react";
import { Link } from "@reach/router";

export default function Home() {
  return (
    <div className="flex-col justify-around">
      <div className="bg-green-400 rounded-lg text-center font-bold px-10 py-6">
        Welcome to Zamma Zamba
      </div>
      <div className="flex justify-around ">
        <Link
          to="/experiences"
          className="block w-56 mr-10 bg-blue-400 p-20 mt-20 rounded-lg"
        >
          Search experiences
        </Link>
        <Link
          to="businesses"
          className="block w-56  bg-blue-400 p-20 mt-20 rounded-lg"
        >
          Search businesses
        </Link>
      </div>
    </div>
  );
}
