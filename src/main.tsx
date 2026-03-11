import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './connector' // trigger connector setup early
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
