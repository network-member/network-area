import type { FC } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import SignUpPage from './pages/SignUp'

const theme = createTheme({
  palette: {
    text: { primary: '#1E2E52' },
  },
})

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <SignUpPage />
    </ThemeProvider>
  )
}

export default App
