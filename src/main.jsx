import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { QuotingProvider } from './context/QuotingContext.jsx';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuotingProvider>
      <App />
    </QuotingProvider>
  </React.StrictMode>
);