import React from 'react';
import { Route } from "react-router-dom";
import CheckOutPage from '../checkOut/CheckOutPage';
import ProfilePage from '../profilePage/ProfilePage';

const Costumer = () => {
    return (
      <>
        <Route exact path="/costumer/edit">
          <ProfilePage />
        </Route>
        <Route exact path="/costumer/checkout">
          <CheckOutPage />
        </Route>
      </>
    );
}

export default Costumer
