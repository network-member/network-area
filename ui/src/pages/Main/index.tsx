import type { FC } from 'react'
import { useNavigate } from 'react-router'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ApiClient from '@/api/client'
import useApiMutation from '@/hooks/use-api-mutation'
import useUpdatePageTitle from '@/hooks/use-update-document-title'

const Main: FC = () => {
  useUpdatePageTitle('Network Area | Dashboard')
  const navigate = useNavigate()
  const handleLogout = async (): Promise<void> => {
    await ApiClient.logout()
    await navigate('/sign-in')
  }
  const [ping, { data }] = useApiMutation(ApiClient.ping)

  return (
    <Container sx={{ height: '100dvh' }}>
      <Stack gap={3} sx={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Stack direction="row" gap={3}>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
          <Button
            variant="text"
            onClick={async () => {
              await ping()
            }}
          >
            Ping
          </Button>
        </Stack>
        {typeof data === 'string' && <Typography>{data}</Typography>}
      </Stack>
    </Container>
  )
}

export default Main
