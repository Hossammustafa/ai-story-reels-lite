import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // (سنقوم بإنشاء هذا الملف لاحقاً)
import { LanguageProvider } from './language/LanguageContext';
import { ProProvider } from './context/ProContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <ProProvider>
        <App />
      </ProProvider>
    </LanguageProvider>
  </React.StrictMode>,
);
