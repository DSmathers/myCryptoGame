import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserAuthContextProvider } from './Contexts/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <UserAuthContextProvider><App /></UserAuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);



