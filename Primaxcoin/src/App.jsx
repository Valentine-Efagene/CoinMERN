import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Page from './Page.jsx';

import { createStore } from 'redux';
import allReducers from './reducers/index';
import { Provider } from 'react-redux';

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const element = (
  <Router>
    <Provider store={store}>
      <Page />
    </Provider>
  </Router>
);

/*const element = (
    <div title="Outer div">
        <h1>Hello, World!</h1>
    </div>
);*/
ReactDOM.render(element, document.getElementById('contents'));
