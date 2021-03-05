import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoutes = ({ isUserAuthenticated, component: Component, ...rest }) => {
  const currentPathName = rest.location.pathname;

  isUserAuthenticated =
    currentPathName === "/" ? false
      : currentPathName === "/shop" ? false
      : isUserAuthenticated;

      
    return (
      <Route
        {...rest}
        render={ (props) => {
          props = {...props, assignRef: rest.assignRef}
          return !isUserAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }} 
      />
    );
};


export default PublicRoutes;

