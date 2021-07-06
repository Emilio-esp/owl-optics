import React from "react";
import { Route } from "react-router-dom";
import AboutPage from "../aboutPage/AboutPage";
import FQAPage from "../FQAPage/FQAPage";

import HomePage from "../homePage/homePage"
import LoginPage from "../loginPage/LoginPage";
import PrivacyPage from "../privacyPage/PrivacyPage";
import ShopPage from "../shopPage/ShopPage";
import ShopProductDetail from "../shopPage/ShopProductDetail";
import SiteNoticePage from "../siteNoticePage/SiteNoticePage";
import TermAndConditions from "../termAndConditionsPage/TermAndConditionsPage";

const Guest = ({assignRef}) => {
  return (
    <>
      <Route exact path="/">
        <HomePage assignRef={assignRef} />
      </Route>

      <Route exact path="/shop">
        <ShopPage />
      </Route>

      <Route path="/shop/:glassId">
        <ShopProductDetail />
      </Route>

      <Route exact path="/login">
        <LoginPage />
      </Route>

      <Route exact path="/fqa">
        <FQAPage />
      </Route>

      <Route exact path="/terms_and_conditions">
        <TermAndConditions />
      </Route>

      <Route exact path="/privacy">
        <PrivacyPage />
      </Route>

      <Route exact path="/about">
        <AboutPage />
      </Route>

      <Route exact path="/site_notice">
        <SiteNoticePage />
      </Route>
    </>
  );
};

export default Guest;
