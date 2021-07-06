import React from "react";
import { Route, Redirect } from "react-router-dom";
import { encodeValue } from "../../utils/localstorage";

const PrivateRoutes = ({ isUserAuthenticated, component: Component, ...rest }) => {
  const LAST_PATH = "last_path_owloptics";
  let routeRequested = rest.location;
  const lastRoute = localStorage.getItem(LAST_PATH);

  // "http://localhost:3000/costumer/check-order-details?itemId=58H29344T38165807";

  if (!(routeRequested.pathname === "/costumer/edit")) {
      if (lastRoute === "/costumer/checkout") {
        localStorage.setItem(LAST_PATH, encodeValue(routeRequested.pathname));
      }else{
        localStorage.setItem(LAST_PATH, encodeValue(routeRequested.pathname + routeRequested.search));
      }
  }
  
  return (
    <Route
      {...rest}
      render={(props) =>isUserAuthenticated ? <Component {...props} /> :<Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoutes;
