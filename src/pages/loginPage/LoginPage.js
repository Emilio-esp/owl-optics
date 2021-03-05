import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { userLogin } from "../../reducers/userReducer";
import PageContainer from "../../components/PageContainer";
import PageTitle from "../../components/PageTitle";
import PageContent from "../../components/PageContent";
import Loader from "../../components/Loader";

import googleIcon from "../../images/google_icon.svg";

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isUserAvalable = useSelector((state) => state.user);

  const handleGoogleSignIn = async () => {
    await dispatch(userLogin());
    history.push("/costumer");
  };

  return (
    <PageContainer>
      {isUserAvalable?.loading ? (
        <Loader />
      ) : (
        <div className="h-80">
          <PageTitle>LOGIN</PageTitle>
          <PageContent>
            <h2 className="sub-title-text">
              You can create and access a new account with Google.
            </h2>

            <div
              onClick={handleGoogleSignIn}
              className="bg-google-blue hover:bg-google-blue_hover flex justify-center items-center border rounded overflow-hidden cursor-pointer"
            >
              <div className="bg-white flex flex-wrap border-2 border-google-blue">
                <img className="w-8 h-8" src={googleIcon} alt="google_icon" />
              </div>
              <p className="text-white font-medium px-4">Sign in with Google</p>
            </div>
          </PageContent>
        </div>
      )}
    </PageContainer>
  );
};

export default LoginPage;
