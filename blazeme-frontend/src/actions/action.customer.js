
export const CustomerActionNames = { 
  GET_CUSTOMERS: "GET_CUSTOMERS"
}

export function getCustomers(payload) {
  return {
    type: CustomerActionNames.GET_CUSTOMERS,
    payload
  }
}