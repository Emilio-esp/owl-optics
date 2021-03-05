import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import ShoppingCart from "../components/ShoppingCart";
import UserLoggedMenu from "../components/UserLoggedMenu";
import homeLogo from "../images/owl_home.png";

const Header = ({ inView }) => {
  const location = useLocation();
  const userLogged = useSelector(state => state.user.data);
  
  const isCostumerRoute = location.pathname.includes('costumer');

  inView = location.pathname !== "/" ? true : inView;

  return (
    <header className="h-20 w-full fixed z-10 bg-gray-100">
      <nav
        className={`transition duration-1000 ease-in-out h-20 flex items-center opacity-0  ${
          inView ? " opacity-100" : "pointer-events-none"
        }`}
      >
        <ul className="flex-1 flex flex-wrap justify-center relative">
          <ul className=" flex">
            <li className="p-3 sm:p-8">
              <NavLink
                className="main-font text-gray-900 menu-hover"
                to="/shop"
                activeClassName="active"
              >
                Shop
              </NavLink>
            </li>
            <li className="p-3 sm:p-8">
              <Link to="/">
                <img alt="logo" src={homeLogo} />
              </Link>
            </li>
            <li className="p-3 sm:p-8">Dark</li>
          </ul>
          <ShoppingCart />

          {userLogged && isCostumerRoute && <UserLoggedMenu />}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
