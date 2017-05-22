import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import { APP_CONTAINER_SELECTOR } from '../shared/config'

ReactDOM.render(
  <Main />,
  document.querySelector(APP_CONTAINER_SELECTOR)
)
