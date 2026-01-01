import type { FC } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

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
import { Card, SignUpContainer } from './styled'

const SignUp: FC = () => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(FieldsValidationSchema),
  })
  const onSubmit: SubmitHandler<FormFieldsT> = (data) => console.log(data)

  return (
    <>
      <SignUpContainer>
        <Card variant="outlined">
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
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormFields control={control} />
            <Button type="submit" fullWidth variant="contained">
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
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: 'center', fontWeight: 'bold' }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  )
}

export default SignUp
