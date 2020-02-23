import { CustomerActionNames } from "../actions"


const initalState = {
  loading: false,
  customerData = [
    {
      "_id": "5e4f506e08c8540f3dfc7eb5",
      "firstName": "Gisela",
      "lastName": "'t Hart",
      "email": "gisela.'thart@example.com",
      "phoneNumber": "(902)-239-7011",
      "__v": 0
    },
    {
      "_id": "5e4f6dfdf0b7ab20130d5fa9",
      "firstName": "Dianne",
      "lastName": "'t Hart",
      "email": "dianne.'thart@example.com",
      "phoneNumber": "(591)-173-0762",
      "__v": 0
    }
  ]
}

export const customersReducer = (state = initalState, action) => {
  switch(action.type) {
    case CustomerActionNames.GET_CUSTOMERS: {
      return {
        ...state,
        loading: true 
      }
    }
  }
}