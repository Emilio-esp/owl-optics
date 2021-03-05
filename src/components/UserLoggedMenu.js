import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signOutUser } from "../reducers/userReducer";
import SubMenu from "./SubMenu";

const UserLoggedMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const googleSignOut = async(e) => {
    e.preventDefault();

    try {
      await dispatch(signOutUser());
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  const subMenuRoutes = [
    {
      route: "Dashboard",
      path: "/costumer",
    },
    {
      route: "Profile",
      path: "/costumer/edit",
    },
    {
      route: "Logout",
      path: "/sign_out",
      extra: googleSignOut
    },
  ];

  return (
    <>
      <SubMenu subMenuRoutes={subMenuRoutes} />
    </>
  );
};

export default UserLoggedMenu;
