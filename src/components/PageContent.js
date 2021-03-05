import  React from "react";

const PageContent = ({ children }) => {
  return (
    <div className="bg-white min-h-full flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default PageContent
