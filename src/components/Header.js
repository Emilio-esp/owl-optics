import React from "react";

import ShoppingCart from "../components/ShoppingCart";
import homeLogo from "../images/owl_home.png";

const Header = ({inView}) => {
  return (
    <header className="h-20 w-full fixed z-10">
      <nav
        className={`transition duration-1000 ease-in-out h-20 flex items-center opacity-0  ${
          inView ? " opacity-100" : "pointer-events-none"
        }`}
      >
        <ul className="flex-1 flex flex-wrap justify-center relative">
          <ul className=" flex">
            <li className="p-3 sm:p-8">
              <a
                className="main-font text-gray-900 menu-hover"
                href="/shop"
              >
                Shop
              </a>
            </li>
            <li className="p-3 sm:p-8">
              <a className="" href="/">
                <img alt="logo" src={homeLogo} />
              </a>
            </li>
            <li className="p-3 sm:p-8">Dark theme</li>
          </ul>
          <ShoppingCart />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
