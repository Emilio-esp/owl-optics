import React from "react";
import { Link } from "react-router-dom";

import Column from "./Column";

function Column25({ children, glass = {}, alignSelf, paddingTop}) {

  const { type, image, name, color, alt } = glass;
   
  return (
    <Column flexBasis="25" alignSelf={alignSelf} paddingTop={paddingTop}>
      {children ? (
        <div className="hidden sm:block">{children}</div>
      ) : (
        <>
          <Link
            to={`/shop/${name.toLowerCase()}?color=${color.toLowerCase()}&type=${type}`}
            className="block w-full"
          >
            <img className="min-w-full min-h-full" src={image} alt={alt} />
          </Link>
          <span className="block text-center pb-0 sm:inline-block sm:text-left text-3xl font-times p-4">
            {name}
          </span>
          <span className="block text-center sm:inline-block sm:text-left text-lg font-times">
            {color ? `(${color})` : ""}
          </span>
        </>
      )}
    </Column>
  );
}

export default Column25;
