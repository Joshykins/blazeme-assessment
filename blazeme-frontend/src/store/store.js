import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "../reducers";


export const configureStore = (initialState) => {
  const middleware = [

  ];

  const store = createStore(
    rootReducer,
    initialState,
    //applyMiddleware(...middleware)
  );

  return store
}