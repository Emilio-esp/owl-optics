import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoutes = ({ isUserAuthenticated, component: Component, ...rest }) => {
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isUserAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoutes;
