import React from 'react';
import { Route } from "react-router-dom";
import ProfilePage from '../profilePage/ProfilePage';

const Costumer = () => {
    return (
      <>
        <Route exact path="/costumer/edit">
          <ProfilePage />
        </Route>
      </>
    );
}

export default Costumer
