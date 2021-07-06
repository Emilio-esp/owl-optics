import React, { useState, useRef } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import menu from "../images/menu.svg";
import closeMenu from "../images/close_menu.svg";

const SubMenu = ({ subMenuRoutes }) => {
  const [menuState, setMenustate] = useState(false);
  const menuRef = useRef(null);
  const menuIconRef = useRef(null);

  const handleOpenMenu = () => {
    const liElements = Array.from(menuRef.current.children);

    for (let i = 0; i < liElements.length; i++) {
      liElements[i].style.display = "block";
    }

    if (!menuState) {
      menuIconRef.current.src = closeMenu;
      menuRef.current.classList.add("menu-open");
      menuRef.current.classList.remove("menu-closed");
    } else {
      menuIconRef.current.src = menu;
      menuRef.current.classList.add("menu-closed");
      menuRef.current.classList.remove("menu-open");
    }

    setMenustate(!menuState);
  };

  const closeMenuOptions = () => {
    if (menuState) {
      menuIconRef.current.src = menu;
      menuRef.current.classList.add("menu-closed");
      menuRef.current.classList.remove("menu-open");
    }

    setMenustate(!menuState);
  };

  const handleOnClickLink = (e, subMenu) => {
    closeMenuOptions();

    if (subMenu.extra) subMenu.extra(e);
  };

  return (
    <Wrapper className="z-30 absolute top-3 left-0 sm:top-8 sm:left-12">
      <img
        ref={menuIconRef}
        onClick={handleOpenMenu}
        id="menu"
        className="w-8 h-8 cursor-pointer ml-4"
        src={menu}
        alt="menu"
      />

      <ul ref={menuRef} className="flex">
        {subMenuRoutes.map((subMenu) => (
          <li key={subMenu.path} className="pl-4 pr-4 bg-gray-100">
            <NavLink
              onClick={(e) => handleOnClickLink(e, subMenu)}
              exact
              to={subMenu.path}
              className="main-font menu-hover"
              activeClassName="active"
            >
              {subMenu.route}
            </NavLink>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  & .menu-open {
    display: initial;
  }

  & .menu-closed {
    display: none;
  }

  @media (max-width: 980px) {
     & li {
      display: none;
    }
    & ul {
      display: initial;
      background-color: red;
    }
    & #menu {
      display: inline-block;
    }
    & li {
      padding-bottom: 0.3rem;
      padding-top: 0.3rem;
      padding-left: 1.5rem;
    }
  }

  @media (min-width: 981px) {
    & #menu {
      display: none;
    }
    & ul {
      display: flex !important;
    }
  }

  /* for menu in mobile Devices */
  @media (max-width: 640px) {
    background-color: rgba(243, 244, 246);

    & li {
      transition: all 0.5s ease;
      background-color: white;
      display: none;
      width: 100vw;
      text-align: center;
      padding: 0.5rem 0;

      & a {
        display: block;
        height: 100%;
        border-bottom: none;
      }
    }

    & li:hover {
      background-color: black;

      & a {
        color: white;
        border-bottom: none;
      }
    }
  }
`;

export default SubMenu;
