import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Firebase from "../lib/firebase";


import * as reducers from "../reducers";

const services = new Firebase();
const store = createStore(
  combineReducers({
    ...reducers,
  }),
  applyMiddleware(thunk.withExtraArgument(services))
);

export default store