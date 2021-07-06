import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoutes = ({ isUserAuthenticated, component: Component,  ...rest }) => {
  const ROUTES_ALLOWED = ["/terms_and_conditions", "/de", "/privacy" , "/site_notice","/press", "/fqa", "/about"];
  const currentPathName = rest.location.pathname;

  isUserAuthenticated =
    currentPathName === "/" ? false
      : currentPathName.includes("/shop") ? false
      : ROUTES_ALLOWED.includes(currentPathName) ? false
      :isUserAuthenticated;

    return (
      <Route
        {...rest}
        render={ (props) => {
          props = {...props, assignRef: rest.assignRef}
          return !isUserAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          );
        }} 
      />
    );
};


export default PublicRoutes;

