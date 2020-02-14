import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.css';
import './styles/global.css';
import './styles/App.css';

import App from './App';
import { Provider } from './Context';

ReactDOM.render(
  <Provider>
  <App />
  </Provider>,
  document.getElementById('root')
);


