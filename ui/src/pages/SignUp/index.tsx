import type { FC } from 'react'
import { Link as RouterLink } from 'react-router'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormHelperText from '@mui/material/FormHelperText'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import useUpdatePageTitle from '@/hooks/use-update-document-title'
import GoogleIcon from '@/icons/google.svg'
import Logo from '@/icons/logo.svg'

import FormFields from './components/FormFields'
import useSignUpForm from './hooks/use-sign-up-form'

const SignUp: FC = () => {
  useUpdatePageTitle('Network Area | Sign up')
  const { control, handleSubmit, isSubmitting, submitError } = useSignUpForm()

  return (
    <>
      <Stack
        direction={{ sm: 'row' }}
        alignItems="center"
        sx={{ width: '80%', alignSelf: 'center' }}
      >
        <Logo />
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)', lineHeight: 1.5 }}
        >
          Sign up
        </Typography>
      </Stack>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <FormFields control={control} />
        {typeof submitError === 'string' && (
          <FormHelperText sx={{ textAlign: 'center' }} error>
            {submitError}
          </FormHelperText>
        )}
        <Button type="submit" disabled={isSubmitting} fullWidth variant="contained">
          Sign up
        </Button>
      </Box>
      <Divider>
        <Typography sx={{ color: 'text.secondary' }}>or</Typography>
      </Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert('Sign up with Google')}
          startIcon={<GoogleIcon />}
        >
          Sign up with Google
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link
            component={RouterLink}
            to="/sign-in"
            variant="body2"
            sx={{ alignSelf: 'center', fontWeight: 'bold' }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
    </>
  )
}

export default SignUp
