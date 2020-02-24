
export const CustomerActionNames = { 
  CREATE_CUSTOMER: "CREATE_CUSTOMER",
  LOAD_IN_CREATED_CUSTOMER:"LOAD_IN_CREATED_CUSTOMER",
  GET_CUSTOMERS: "GET_CUSTOMERS",
  GET_CUSTOMER_COUNT: "GET_CUSTOMER_COUNT",
  DELETE_CUSTOMER: "DELETE_CUSTOMER",
  LOAD_IN_CUSTOMER_COUNT: "LOAD_IN_CUSTOMER_COUNT",
  LOAD_IN_CUSTOMERS: "LOAD_IN_CUSTOMERS",
  LOAD_CUSTOMER_DELETION: "LOAD_CUSTOMER_DELETION",
  UPDATE_CUSTOMER:"UPDATE_CUSTOMER",
  LOAD_IN_CUSTOMER_UPDATE:"LOADING_CUSTOMER_UPDATE",
  GRID_LOADED:"LOADED_GRID",
  GRID_REFRESHED:"REFRESHED_GRID"
}

export function GridLoaded(payload) {
  return {
    type: CustomerActionNames.GRID_LOADED,
    payload
  }
}
export function GridRefreshesd(payload) {
  return {
    type: CustomerActionNames.GRID_REFRESHED,
    payload
  }
}
export function CreateCustomer(payload) {
  return {
    type: CustomerActionNames.CREATE_CUSTOMER,
    payload
  }
}
export function LoadInCreatedCustomer(payload) {
  return {
    type: CustomerActionNames.LOAD_IN_CREATED_CUSTOMER,
    payload
  }
}

export function GetCustomerCountAction(payload) {
  return {
    type: CustomerActionNames.GET_CUSTOMER_COUNT,
    payload
  }
}

export function LoadInCustomerCountAction(payload) {
  return {
    type: CustomerActionNames.LOAD_IN_CUSTOMER_COUNT,
    payload
  }
}

export function GetCustomersAction(payload) {
  return {
    type: CustomerActionNames.GET_CUSTOMERS,
    payload
  }
}


export function LoadInCustomers(payload) {
  return {
    type: CustomerActionNames.LOAD_IN_CUSTOMERS,
    payload
  }
}


export function DeleteCustomer(payload) {
  return {
    type: CustomerActionNames.DELETE_CUSTOMER,
    payload
  }
}


export function LoadCustomerDeletion(payload) {
  return {
    type: CustomerActionNames.LOAD_CUSTOMER_DELETION,
    payload
  }
}


export function UpdateCustomer(payload) {
  return {
    type: CustomerActionNames.UPDATE_CUSTOMER,
    payload
  }
}


export function LoadCustomerUpdate(payload) {
  return {
    type: CustomerActionNames.LOAD_IN_CUSTOMER_UPDATE,
    payload
  }
}