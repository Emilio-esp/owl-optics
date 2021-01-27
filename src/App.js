import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Header from "./components/Header";
import Panel from "./components/Panel";
import HomePage from "./pages/homePage";
import { linksLeftPanel, linksRightPanel } from "./utils/linksForPanels";

const App = () => {
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "smooth";
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.9,
  });

  return (
    <>
      <Header inView={inView} />
      <Panel inView={inView} side="right" links={linksRightPanel} />
      <Panel inView={inView} side="left" links={linksLeftPanel} />
      <HomePage style={{ backgroundColor: "#F3F3F3" }} assignRef={ref} />
    </>
  );
};

export default App;
