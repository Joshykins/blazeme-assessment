import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "../reducers";
import { APIMiddleware } from "../middleware/core/middleware.api";
import { LoggerMiddleware } from "../middleware/core/middleware.logger";
import { CustomerMiddleware } from "../middleware/app/middleware.customer";

export const configureStore = (initialState) => {
  const middleware = [
    APIMiddleware,
    LoggerMiddleware,
    CustomerMiddleware
  ];

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  return store
}