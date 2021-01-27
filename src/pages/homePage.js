import React from 'react';

const HomePage = ({ assignRef }) => {
  
  return (
    <div className="relative">
      <div className="h-screen flex flex-wrap flex-col justify-center items-center">
        <a href="#home-menu" className="w-4/5 h-3/6 sm:w-3/5 sm:h-3/6">
          <img
            className="w-full h-full"
            alt="logo-owloptics"
            src="https://www.owloptics.com/assets/owl-78036e5469a8a980f9cabccb898971c6.svg"
          />
        </a>
        <h1 className="mb-10 text-center font-times">NICELY CRAFTED GLASSES</h1>
      </div>
      <div
        ref={assignRef}
        className="h-screen container m-auto flex justify-center items-center"
      >
        <div
          id="home-menu"
          className="w-9/12 sm:w-10/12 md:w-10/12 lg:w-11/12 h-3/4 mt-12"
        >
          <a href="/shop">
            <video
              className="h-full w-full object-cover"
              src="https://www.owloptics.com/assets/owl_intro.mp4"
              autoPlay
              muted
              loop
            ></video>
          </a>
        </div>
      </div>
    </div>
  );
};


export default HomePage;
