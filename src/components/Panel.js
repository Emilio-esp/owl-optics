import React from "react";
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from "react-router-dom";

const Panel = ({ links, side, inView  }) => {
  const userLogged = useSelector(state => state.user.data);

  const sideClass =
    side === "left"
      ? "-left-48"
      : userLogged && side === "right"
      ? "-right-36"
      : "-right-28";
  
  if ((side === "right") && userLogged) {
    links = links.map((link) => {
      return link.route === "Login" ? 
      ({
        route: "Account",
        path: "/costumer",
      }) 
      : link;
    });
  }
  

  const location = useLocation();
  inView = ( location.pathname !== "/" ) ? true : inView;
  // console.log(location.pathname, inView);
  return (
    <div
      className={`transition duration-1000 ease-in-out transform rotate-90 fixed z-10 top-1/2 ${sideClass} opacity-0  ${
        inView ? " opacity-100" : "pointer-events-none"
      }`}
    >
      <nav>
        <ul className="flex justify-center items-center">
          {links.map((link, index) => (
            <li key={`${index}-${link}`} className="transform rotate-180 p-4">
              <NavLink
                to={link.path}
                className="main-font menu-hover"
                activeClassName="active"
              >
                {link.route}
              </NavLink>
            </li>
          ))}

          {userLogged && side === "right" && (
            <li className="h-10 w-10 transform -rotate-90 rounded-full overflow-hidden">
              <Link to="/costumer">
                <img src={userLogged.picture} alt="user_image" />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Panel;
