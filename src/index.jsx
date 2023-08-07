import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// COMPONENTS
import App from './app/App';
import store from './store/index';

// GLOBAL STYLESHEETS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

if (window.location.pathname.includes('auth')) {
  sessionStorage.setItem('lastUrl', '/');
} else {
  sessionStorage.setItem('lastUrl', window.location.pathname);
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
