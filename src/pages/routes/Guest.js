import React from "react";
import { Route } from "react-router-dom";

import HomePage from "../homePage/homePage"
import LoginPage from "../loginPage/LoginPage";
import ShopPage from "../shopPage/ShopPage";

const Guest = ({assignRef}) => {
  return (
    <>
      <Route exact path="/">
        <HomePage assignRef={assignRef} />
      </Route>

      <Route exact path="/shop">
        <ShopPage />
      </Route>

      <Route exact path="/login">
        <LoginPage />
      </Route>
    </>
  );
};

export default Guest;
