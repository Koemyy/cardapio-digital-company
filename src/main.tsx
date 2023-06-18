import '../global.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { QRCodeProvider } from './service/ContextService.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QRCodeProvider>
      <App />
    </QRCodeProvider>
  </React.StrictMode>
)
