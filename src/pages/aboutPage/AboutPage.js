import React from "react";


import PageContainer from "../../components/PageContainer";
import Row from "../../components/Row";

const AboutPage = () => {
  return (
    <PageContainer>
      <div className="my-4">
        <p className="text-center text-xl sm:text-3xl text-gray-800 font-times">
          Our story begins with the question:
          <br />
          Why do we have a hallway full of shoes,
          <br />
          but only one pair of glasses?
          <br />
          <br />
          That’s because good-looking glasses are expensive.
          <br />
          The right lenses even more so.
          <br />
          And cheap glasses look, well cheap. <br />
          <br />
          That’s why we asked ourselves the next question:
          <br />
          Why does it have to be like that?
          <br />
          <br />
          Our answer: It doesn’t.
          <br />
          Welcome OWL.
        </p>
      </div>
      <Row margin="6">
        <div className="flex-1">
          <h2 className="text-center font-times leading-6 tracking-widest text-2xl py-8">
            WHO IS OWL?
          </h2>
          <p className="text-center font-times font-light leading-6 tracking-widest">
            We are three friends from Berlin and Hamburg,
            <br />
            that have put their heart and soul into <br />
            the intricate details of a new era of glasses.
            <br />
            <br />
            We are the place on the web that supplies
            <br />
            good-looking glasses and great lenses <br />
            for an honest price.
            <br />
            &nbsp;
            <br />
            We are David, Lars und Phil
            <br />
            (one of us had to take the picture).
            <br />
          </p>
        </div>
        <div className="my-6 flex-1 self-center">
          <img src="https://www.owloptics.com/assets/owl_team.jpg" alt="founders"/>
        </div>
      </Row>
      <div className="py-6">
        <h3 className="text-center text-4xl font-times">SAY WOOT-WOOT</h3>
        <img className="m-auto py-12" src="https://www.owloptics.com/assets/owl_goodbye.gif" alt="owl"/>
      </div>
    </PageContainer>
  );
};

export default AboutPage;
