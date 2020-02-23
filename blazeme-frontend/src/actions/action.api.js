
export const APIActionNames = { 
  API_REQUEST: "API_REQUEST"
}

export function APIRequestAction(payload) {
  return {
    type: APIActionNames.API_REQUEST,
    payload
  }
}
