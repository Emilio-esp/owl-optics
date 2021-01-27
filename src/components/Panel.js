import React from "react";

const Panel = ({ links, side, inView }) => {
  const sideClass = side === "right" ? "-right-28" : "-left-48";
  return (
    <div
      className={`transition duration-1000 ease-in-out transform rotate-90 fixed top-1/2 z-10 ${sideClass} opacity-0  ${
        inView ? " opacity-100" : "pointer-events-none"
      }`}
    >
      <nav>
        <ul className="flex">
          {links.map((link, index) => (
            <li key={`${index}-${link}`} className="transform rotate-180 p-4">
              <a href="{link.path}" className="main-font menu-hover">
                {link.route}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Panel;
