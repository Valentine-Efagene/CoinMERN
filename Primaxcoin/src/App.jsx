import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Page from './Page.jsx';

const element = (
  <Router>
    <Page />
  </Router>
);

/*const element = (
    <div title="Outer div">
        <h1>Hello, World!</h1>
    </div>
);*/
ReactDOM.render(element, document.getElementById('contents'));