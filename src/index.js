import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index';
import App from './App';
import { Provider } from 'react-redux';
import {store} from '../src/redux/store.js';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);

