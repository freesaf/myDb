import React from "react";
import { Router } from "@reach/router";
import Home from "../src/pages/Home";
import Experiences from "../src/pages/Experiences";
import Register from "../src/pages/Register";
import Businesses from "../src/pages/Businesses";
import BusinessOwner from "../src/pages/BusinessOwner";
import Profile from "../src/pages/Profile";
import ThankYou from "../src/pages/ThankYou";
import Header from "./components/Header";
import CreateExperience from "./pages/CreateExperience";
import DeleteExperience from "./components/experiences/DeleteExperience";
import EditExperience from "./components/experiences/EditExperience";
import ShowExperience from "./pages/ShowExperience";
import logo from "./images/logo.svg";
import Cart from "./pages/Cart";

function App() {
  let background = "green";
  let hoverBackground = "indigo-700";
  let navlinks = [
    {
      text: "Home",
      path: "/",
      icon: "ion-ios-home",
    },
    {
      text: "Profile",
      path: "/profile",
      icon: "ion-ios-person",
    },
  ];
  return (
    <div>
      <Header
        navlinks={navlinks}
        logo={logo}
        background={background}
        hoverBackground={hoverBackground}
      />
      <Router>
        <Home path="/" />
        <Experiences path="/experiences" />
        <Register path="/start" />
        <Businesses path="/businesses" />
        <BusinessOwner path="/businessOwner/:id" />
        <Profile path="/profile" />
        <CreateExperience path="/profile/new" />
        <DeleteExperience path="/profile/delete" />
        <EditExperience path="profile/edit" />
        <ShowExperience path="businesses/show/:id" />
        <Cart path="/cart" />
        <ThankYou path="/thankyou" />
      </Router>
    </div>
  );
}

export default App;
