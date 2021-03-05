import React from 'react';

const PageTitle = ({children}) => {
    return (
      <div className="text-center font-normal font-times text-3xl p-6 tracking-widest">
        <h1>{children}</h1>
      </div>
    );
}

export default PageTitle
