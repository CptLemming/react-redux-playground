import React                from 'react';
import ReactDOM             from 'react-dom';
import App                  from './containers/App';
import configureStore       from './stores';

const target = document.getElementById('root');
const store  = configureStore(window.__INITIAL_STATE__, __DEBUG__);

const node = (
  <App store={store} debug={__DEBUG__} debugExternal={__DEBUG_NW__} />
);

ReactDOM.render(node, target);
