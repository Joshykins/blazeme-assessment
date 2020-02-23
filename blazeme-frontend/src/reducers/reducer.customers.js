import { CustomerActionNames } from "../actions";


const initalState = {
  loadingCustomerData: true,
  customerData: [],
  loadingCustomerCount: true,
  customerCount: 0
};

export const customersReducer = (
  state = initalState, 
  action
  ) => {
  switch(action.type) {
    case CustomerActionNames.GET_CUSTOMER_COUNT: {
      return {
        ...state,
        loadingCustomerCount: true,
      }

    }
    case CustomerActionNames.LOAD_IN_CUSTOMER_COUNT: {
      return {
        ...state,
        loadingCustomerCount: false,
        customerCount: action.payload
      }
    }
    default:
      return state;
  }
}