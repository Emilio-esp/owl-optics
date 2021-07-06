import React from "react";
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

import Guest from "./Guest";

import ProfilePage from "../profilePage/ProfilePage";
import CheckOutPage from "../checkOut/CheckOutPage";
import DashboardPage from "../dasboardPage/DasboardPage";
import DeliveryInformationPage from "../deliveryInformationPage/DeliveryInformationPage";

const RouterApp = ({ assignRef }) => {
  const isUserAuthenticated = useSelector((state) => state.user.data ? true : false);

  return (
    <Switch>
      <PrivateRoutes
        exact
        path="/costumer/edit"
        isUserAuthenticated={isUserAuthenticated}
        component={ProfilePage}
      />
      <PrivateRoutes
        exact
        path="/costumer/checkout"
        isUserAuthenticated={isUserAuthenticated}
        component={CheckOutPage}
      />

      <PrivateRoutes
        exact
        path="/costumer"
        isUserAuthenticated={isUserAuthenticated}
        component={DashboardPage}
      />
      <PrivateRoutes
        path="/costumer/check-order-details"
        isUserAuthenticated={isUserAuthenticated}
        component={DeliveryInformationPage}
      />
      <PublicRoutes
        path="/"
        isUserAuthenticated={isUserAuthenticated}
        assignRef={assignRef}
        component={Guest}
      />
    </Switch>
  );
};

export default RouterApp;
