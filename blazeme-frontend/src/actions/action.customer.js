
export const CustomerActionNames = { 
  GET_CUSTOMERS: "GET_CUSTOMERS",
  GET_CUSTOMER_COUNT: "GET_CUSTOMER_COUNT",
  LOAD_IN_CUSTOMER_COUNT: "LOAD_IN_CUSTOMER_COUNT"
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

