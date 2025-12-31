import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import './index.css'

const node = document.getElementById('root')

if (node !== null) {
  const root = createRoot(node)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
