import { CustomerActionNames, APIActionNames } from "../../actions";
import { LoggerActionNames } from "../../actions/action.logger";

export const CustomerMiddleware = store => next => action => {
    next(action);
    if (action.type === CustomerActionNames.GET_CUSTOMER_COUNT) {
      store.dispatch({
        type: LoggerActionNames.LOG,
        payload: `Customer Middleware Active with ${action.type}`
      })

      store.dispatch({
        type: APIActionNames.API_REQUEST,
        payload: {
          method: 'GET',
          url: 'http://localhost:3656/customers/totalcount',
          nextAction: CustomerActionNames.LOAD_IN_CUSTOMER_COUNT,
          caseFail: LoggerActionNames.LOG
        }
      })

    }
  };