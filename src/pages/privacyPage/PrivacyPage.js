import React from "react";

import PageContainer from "../../components/PageContainer";
import PageTitle from "../../components/PageTitle";

import privacy from "./privacy.json";

const PrivacyPage = () => {
  return (
    <PageContainer>
      <PageTitle>Privacy</PageTitle>
      {privacy.map(({ privacy, description }, index) => (
        <div
          key={`privacy-politic-${index}`}
          className="w-full px-2 md:px-0 md:w-4/5 lg:w-6/12 mx-auto"
        >
          <div className="text-left py-6">
            <span className="p-tag">
              {privacy}
            </span>
          </div>
          <div className="py-2">
            <div className="p-tag leading-6">{description}</div>
          </div>
        </div>
      ))}
      <div className="my-16 italic">
        <p className="p-tag leading-6 text-center font-thin">
          It’s also a super good idea to close your door
          <br /> when you leave the house. Word!
        </p>
      </div>
    </PageContainer>
  );
};

export default PrivacyPage;
