import { APIActionNames } from "../../actions";
import axios from 'axios';

export const APIMiddleware = store => next => async (
  action
) => {
  next(action);

  if(action.type === APIActionNames.API_REQUEST) {
      if(action.payload.method === 'POST' && action.payload.data) {
        try {
          const builtRequest = await axios({
            method: action.payload.method,
            url: action.payload.url,
            data: action.payload.data,
          });

          store.dispatch({
            type: action.payload.nextAction,
            payload: builtRequest.data,
          });

        } catch (e) {
          if (e && e.response && e.response.data) {
            store.dispatch({
              type: action.payload.caseFail,
              payload: e.response.data,
            });
          } else {
            store.dispatch({
              type: action.payload.caseFail,
              payload: 'Something bad happened fetching data.',
            });
          }
        }
      }
    if (action.payload.method === 'GET') {
      try {
        const builtRequest = await axios({
          method: action.payload.method,
          url: action.payload.url,
          headers: {
            'Authorization': `Bearer ${action.payload.token}`
          }
        });
        store.dispatch({
          type: action.payload.nextAction,
          payload: builtRequest.data,
        });
      } catch (e) {
        if (e && e.response && e.response.data) {
          store.dispatch({
            type: action.payload.caseFail,
            payload: e.response.data,
          });
        } else {
          store.dispatch({
            type: action.payload.caseFail,
            payload: 'Something bad happened fetching data. \n ' + e,
          });
        }
      }
    }
  }
};