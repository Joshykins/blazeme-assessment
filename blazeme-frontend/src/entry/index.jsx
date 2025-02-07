import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { configureStore } from '../store/store';

import '../globals/globalStyling.scss';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);