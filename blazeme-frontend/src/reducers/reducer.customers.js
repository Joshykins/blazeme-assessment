import { CustomerActionNames } from "../actions";


const initalState = {
  loadingCustomerData: true,
  customerData: [],
  customerResults: 0,
  loadingCustomerCount: true,
  customerCount: 0,
  loadingCustomerDeletion: false,
  loadingCustomerUpdate: false,
  loadingCustomerCreation: false,
  loadGrid: false,
  refreshGrid: false
};

export const customersReducer = (
  state = initalState, 
  action
  ) => {
  switch(action.type) { 
    
    case CustomerActionNames.GRID_LOADED: {
      return {
        ...state, 
        loadGrid: false,
      }
    }
    case CustomerActionNames.GRID_REFRESHED: {
      return {
        ...state, 
        refreshGrid: false,
      }
    }
    case CustomerActionNames.CREATE_CUSTOMER: {
      return {
        ...state,
        loadingCustomerCreation: true
      }
    }

    case CustomerActionNames.LOAD_IN_CREATED_CUSTOMER: {
      return {
        ...state,
        loadingCustomerCreation: false,
        refreshGrid: true
      }
    }

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
    case CustomerActionNames.GET_CUSTOMERS: {

      return {
        ...state,
        loadingCustomerData: true
      }
    }
    case CustomerActionNames.LOAD_IN_CUSTOMERS: {
      if(action.payload.customers) {

        return {
          ...state,
          loadingCustomerData: false,
          loadGrid: true,
          customerData: action.payload.customers,
          customerResults: action.payload.count
        }
      }
      else {
        
      return {
        ...state,
        loadingCustomerData: false,
        loadGrid: true,
        customerData: [],
        customerResults: action.payload.count
      }
      }
    }

    case CustomerActionNames.DELETE_CUSTOMER: {
      return {
        ...state,
        loadingCustomerDeletion: true
      }
    }
    
    case CustomerActionNames.LOAD_CUSTOMER_DELETION: {
      return {
        ...state,
        loadingCustomerDeletion: false,
        refreshGrid: true
      }
    }

    case CustomerActionNames.UPDATE_CUSTOMER: {
      return {
        ...state,
        loadingCustomerUpdate: true,
      }
    }
    
    case CustomerActionNames.LOAD_IN_CUSTOMER_UPDATE: {
      return {
        ...state,
        loadingCustomerUpdate: false,
        refreshGrid: true
      }
    }


    default:
      return state;
  }
}