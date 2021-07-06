import React from "react";

import PageContainer from "../../components/PageContainer";
import PageTitle from "../../components/PageTitle";
import notices from "./siteNotice.json";

const SiteNoticePage = () => {
  return (
    <PageContainer>
      <PageTitle>SITE NOTICE</PageTitle>
      <div className="font-times">
        <center>
          OWL OPTICS
          <br />
          <br />
          David Kamp
          <br />
          (Owner)
          <br />
          <br />
          Sonnenburger Strasse 63
          <br />
          10437 Berlin
          <br />
          Germany
          <br />
          <br />
          Email hejhej@owloptics.com
          <br />
          <br />
          USt-IdNr. DE 273844669
          <br />
          <br />
          <br />
          PLEASE SEND RETURNS TO
          <br />
          <br />
          &nbsp; Nonius E.K.
          <br />
          &nbsp; (FAO OWL)
          <br />
          &nbsp; Brambusch 28
          <br />
          &nbsp; 24576 Bad Bramstedt
        </center>
      </div>
      <div className="my-16">
        {notices.map(({ notice, description }, index) => (
          <div
            key={`notice-policy-${index}`}
            className="w-full px-2 md:px-0 md:w-4/5 lg:w-6/12 mx-auto"
          >
            <div className="text-left py-6">
              <span className="p-tag">
                {index + 1}.- {notice}
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

export default SiteNoticePage;
