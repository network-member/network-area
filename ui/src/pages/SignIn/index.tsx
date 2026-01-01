import type { FC } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Link as RouterLink } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

import GoogleIcon from '@/icons/google.svg'
import Logo from '@/icons/logo.svg'

import FormFields, { FieldsValidationSchema, type FormFieldsT } from './components/FormFields'

const SignIn: FC = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(FieldsValidationSchema),
  })
  const onSubmit: SubmitHandler<FormFieldsT> = (data) => console.log(data)

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
          Sign in
        </Typography>
      </Stack>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <FormFields control={control} />
        <Button type="submit" fullWidth variant="contained">
          Sign in
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
          Sign in with Google
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link
            component={RouterLink}
            to="/sign-up"
            variant="body2"
            sx={{ alignSelf: 'center', fontWeight: 'bold' }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </>
  )
}

export default SignIn
