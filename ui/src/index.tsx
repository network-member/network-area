import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import App from './App'

const node = document.getElementById('root')

if (node !== null) {
  const root = createRoot(node)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
