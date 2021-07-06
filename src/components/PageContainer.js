import React from 'react';

const PageContainer = ({ children, id, assingRef = null }) => {

  return (
    <div
      ref={assingRef}
      id={id}
      className="h-full w-9/12 sm:w-10/12 md:w-10/12 lg:w-11/12 m-auto"
    >
      <div className="h-24"></div>
      {children}
    </div>
  );
};

export default PageContainer;
