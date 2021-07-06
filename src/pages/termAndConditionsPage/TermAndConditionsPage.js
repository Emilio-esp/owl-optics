import React from "react";

import PageContainer from "../../components/PageContainer";
import PageTitle from "../../components/PageTitle";

import terms from "./terms.json"

const TermAndConditions = () =>{
    return (
      <PageContainer>
        <PageTitle>GENERAL TERMS AND CONDITIONS</PageTitle>
        <div className="my-16">
          {terms.map(({ term, description }, index) => (
            <div
              key={`term-policy-${index}`}
              className="w-full px-2 md:px-0 md:w-4/5 lg:w-6/12 mx-auto"
            >
              <div className="text-left py-6">
                <span className="p-tag">
                  {index + 1}.- {term}
                </span>
              </div>
              <div className="py-2">
                <div className="p-tag leading-6">{description}</div>
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    );
};

export default TermAndConditions;