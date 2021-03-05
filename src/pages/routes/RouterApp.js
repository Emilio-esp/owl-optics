import React from "react";
import { useSelector } from 'react-redux';
import { Switch } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Guest from "./Guest";
import Costumer from "./Costumer";

const RouterApp = ({ assignRef}) => {

  const isUserAuthenticated = useSelector((state) =>state.user.data ? true : false);
  
  return (
    <Switch>
      <PrivateRoutes
        path="/costumer"
        isUserAuthenticated={isUserAuthenticated}
        component={Costumer}
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