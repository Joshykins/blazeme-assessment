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

    if(action.type === CustomerActionNames.GET_CUSTOMERS) {
      store.dispatch({
        type: LoggerActionNames.LOG,
        payload: `Customer Middleware Active with ${action.type}`
      })

      store.dispatch({
        type: APIActionNames.API_REQUEST,
        payload: {
          method: 'GET',
          url: 'http://localhost:3656/customers/',
          params: action.payload,
          nextAction: CustomerActionNames.LOAD_IN_CUSTOMERS,
          caseFail: LoggerActionNames.LOG
        }
      })
    }

    if(action.type === CustomerActionNames.DELETE_CUSTOMER) {
      store.dispatch({
        type: LoggerActionNames.LOG,
        payload: `Customer Middleware Active with ${action.type}`
      })

      store.dispatch({
        type: APIActionNames.API_REQUEST,
        payload: {
          method: 'DELETE',
          url: 'http://localhost:3656/customers/',
          data: action.payload,
          nextAction: CustomerActionNames.LOAD_CUSTOMER_DELETION,
          caseFail: LoggerActionNames.LOG
        }
      })
    }

    if(action.type === CustomerActionNames.UPDATE_CUSTOMER) {
      store.dispatch({
        type: LoggerActionNames.LOG,
        payload: `Customer Middleware Active with ${action.type}`
      })
      store.dispatch({
        type: APIActionNames.API_REQUEST,
        payload: {
          method:'PUT',
          url: 'http://localhost:3656/customers/update',
          data: action.payload,
          nextAction: CustomerActionNames.LOAD_IN_CUSTOMER_UPDATE,
          caseFail: LoggerActionNames.LOG
        }
      })
    }


    if(action.type == CustomerActionNames.CREATE_CUSTOMER) {
      store.dispatch({
        type: LoggerActionNames.LOG,
        payload: `Customer Middleware Active with ${action.type}`
      })
      store.dispatch({
        type: APIActionNames.API_REQUEST,
        payload: {
          method:'POST',
          url: 'http://localhost:3656/customers/create',
          data: action.payload,
          nextAction: CustomerActionNames.LOAD_IN_CREATED_CUSTOMER,
          caseFail: LoggerActionNames.LOG
        }
      })
    }
  };