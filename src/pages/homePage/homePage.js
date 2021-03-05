import React from 'react';
import { Link } from 'react-router-dom';


import PageContainer from "../../components/PageContainer";


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
        className="h-screen container m-auto flex justify-center items-start"
      >
        <PageContainer id="home-menu">
          <div className="h-3/4">
            <Link to="/shop">
              <video
                className="h-full w-full object-cover"
                src="https://www.owloptics.com/assets/owl_intro.mp4"
                autoPlay
                muted
                loop
              ></video>
            </Link>
          </div>
        </PageContainer>
      </div>
    </div>
  );
};


export default HomePage;
