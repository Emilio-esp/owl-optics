import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/Header";
import Panel from "./components/Panel";
import { linksLeftPanel, linksRightPanel } from "./utils/linksForPanels";
import { reSignInWithCredentials } from "./reducers/userReducer";

import RouterApp from "./pages/routes/RouterApp";
import Loader from "./components/Loader";

const App = () => {
  const { ref, inView } = useInView({ threshold: 0.9 });
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    async function isUserSignInBefore() {
      try {
        await dispatch(reSignInWithCredentials());
      } catch (error) {
        return;
      }
    }
     isUserSignInBefore();
  }, [dispatch]);

  if (user.initialRenderApp === null) {
    return(
      <div className="w-screen h-screen flex content-center items-center">
        <Loader/>
      </div>
    );
  } 
  
  return (
    <Router>
      <Header inView={inView} />
      <Panel inView={inView} side="right" links={linksRightPanel} />
      <Panel inView={inView} side="left" links={linksLeftPanel} />
      <RouterApp assignRef={ref} />
    </Router>
  );
};

export default App;
