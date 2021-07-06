import React from "react";

import PageContainer from "../../components/PageContainer";
import PageTitle from "../../components/PageTitle";
import QueryFromProduct from "../../components/QueryFromProduct";

import querys from "./querys.json";

const FQAPage = () => {
  return (
    <PageContainer>
      <PageTitle>FREQUENTLY ASKED QUESTIONS</PageTitle>
      {querys.map(({ question, answer }) => (
        <QueryFromProduct key={question} question={question} answer={answer} />
      ))}
    </PageContainer>
  );
};

export default FQAPage;
