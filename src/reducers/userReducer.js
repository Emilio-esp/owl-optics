import { encodeValue } from "../utils/localstorage";

const SIGN_IN_USER_START = "SIGN_IN_USER_START";
const SIGN_IN_USER_SUCCESS = "SIGN_IN_USER_SUCCESS";
const SIGN_IN_USER_ERROR = "SIGN_IN_USER_ERROR";

const SIGN_OUT_USER = "SIGN_OUT_USER";

const UPDATE_USER_INFORMATION_START = "UPDATE_USER_INFORMATION_START";
const UPDATE_USER_INFORMATION_SUCCESS = "UPDATE_USER_INFORMATION_SUCCESS";
const UPDATE_USER_INFORMATION_ERROR = "UPDATE_USER_INFORMATION_ERROR";

const initialState = {
  initialRenderApp:null,
  loading: false,
  data: null,
  error: null,
};

export const signInStart = (payload) => ({
  type: SIGN_IN_USER_START,
  payload,
});

export const signInSuccess = (payload) => ({
  type: SIGN_IN_USER_SUCCESS,
  payload,
});

export const signInError = (payload) => ({
  type: SIGN_IN_USER_ERROR,
  payload,
});

export const signOut = () => ({
  type: SIGN_OUT_USER,
  payload: {},
});


export const updateUserInformationStart = (payload) => ({
  type: UPDATE_USER_INFORMATION_START,
  payload,
});

export const updateUserInformationSuccess = (payload) => ({
  type: UPDATE_USER_INFORMATION_SUCCESS,
  payload,
});

export const updateUserInformationError = (payload) => ({
  type: UPDATE_USER_INFORMATION_ERROR,
  payload,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_USER_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case SIGN_IN_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        initialRenderApp:true,
      };
    }
    case SIGN_IN_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        initialRenderApp:true,
      };
    }
    case SIGN_OUT_USER: {
      return {
        ...state,
        data: null,
        loading:false
      };
    }
    case UPDATE_USER_INFORMATION_START: {
      return {
        ...state,
        loading:true,
      };
    }
    case UPDATE_USER_INFORMATION_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    }
    case UPDATE_USER_INFORMATION_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}


export const userLogin  = () =>
  async(dispatch, getState, firebase ) => {
    const doAuthGoogleWithPopUp = firebase.doAuthGoogleWithPopUp;
    const saveData = firebase.saveData;
    
    dispatch(signInStart());
    
    try {
      const userInfo = await doAuthGoogleWithPopUp();
      console.log(userInfo);

      const dataForFirebase = {
        name: userInfo.given_name,
        surname: userInfo.family_name,
        picture: userInfo.picture,
        email: userInfo.email,
      };

      const user = await saveData({
        collection: "users",
        data: dataForFirebase,
        id: userInfo.id,
      });

      // console.log(user);

      dispatch(signInSuccess(user));

      console.log(getState());

      let userLocalStotage = encodeValue({ id_token: userInfo.idToken });
      window.localStorage.setItem("user_owloptics", userLocalStotage); 
    } catch (error) {

      dispatch(signInError(error))
    }
  };

export const reSignInWithCredentials = () => 
  async (dispatch, getState, firebase) => {
    const doAuthGoogleWithCredentials = firebase.doAuthGoogleWithCredentials;
    const getDocumentById = firebase.getDocumentById;

    dispatch(signInStart());

     try {
       const user = await doAuthGoogleWithCredentials();
       const userInfo = await getDocumentById({
         collection: "users",
         doc: user.sub,
       });

       if (userInfo.exists) {
         dispatch(signInSuccess({ ...userInfo.data(), userId: userInfo.id }));

         let userLocalStotage = encodeValue({ id_token: user.idToken });
         window.localStorage.setItem("user_owloptics", userLocalStotage);
       }
     } catch (error) {
       dispatch(signInError(error));
       window.localStorage.clear();
       throw new Error("something goes wrong")
     }
  };

export const signOutUser = () =>
  async (dispatch, getState, firebase) =>{
    const singOutCurrentUser = firebase.singOutUser;
    try {
      await singOutCurrentUser();
      dispatch(signOut());
      window.localStorage.clear();
      
    } catch (error) {
      console.log("reducer: ",error);
    }
  };

export const updateUserInformationAccount = ({ collection, doc, data }) => 

  async (dispatch, getState, firebase)=>{
    const updateDocById = firebase.updateDocById;
    const getDocumentById = firebase.getDocumentById;

    dispatch(updateUserInformationStart());

    try {
      await updateDocById({ collection, doc, data });

      const userInfo = await getDocumentById({ collection, doc });
      if (userInfo.exists) {
        dispatch(
          updateUserInformationSuccess({
            ...userInfo.data(),
            userId: doc,
          })
        );
      }
    } catch (error) {
      dispatch(updateUserInformationError(error))
    }
  };