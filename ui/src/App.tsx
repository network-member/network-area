import type { FC } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import ApplicationRouter from './pages'

const theme = createTheme({
  palette: {
    text: { primary: '#1E2E52' },
  },
})

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <ApplicationRouter />
    </ThemeProvider>
  )
}

export default App
