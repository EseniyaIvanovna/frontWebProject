/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  CssBaseline,
  CircularProgress,
} from '@mui/material';
import { Lock, Email } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoginRequest } from '../api/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/authApiSlice';

const validationSchema = Yup.object({
  email: Yup.string().email('Некорректный email').required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Обязательное поле'),
});

const AuthPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik<LoginRequest>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await login(values).unwrap();
        navigate('/profile');
      } catch (error) {
        setFieldError('password', 'Неверный email или пароль');
        setFieldError('email', 'Неверный email или пароль');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <CssBaseline />

      {/* Градиентная часть (1/3 экрана) */}
      <Box
        sx={{
          width: '33%',
          background: 'linear-gradient(135deg, #FFD3B6, #997F6D)',
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          p: 4,
        }}
      ></Box>

      {/* Основная часть (2/3 экрана) */}
      <Container
        sx={{
          width: '67%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          p: 4,
          boxShadow: { xs: 'none', md: 1 },
        }}
      >
        {/* Заголовок сайта */}
        <Typography
          variant='h1'
          align='center'
          gutterBottom
          sx={{
            mb: 6,
            fontWeight: 'bold',
            color: '#997F6D',
            fontSize: '4rem',
          }}
        >
          DigiLog
        </Typography>

        {/* Форма регистрации */}
        <Box
          component='form'
          onSubmit={formik.handleSubmit}
          sx={{
            mt: 1,
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mx: 'auto',
          }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoComplete='email'
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: <Email sx={{ mr: 1, color: '#997F6D' }} />,
            }}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Пароль'
            type='password'
            id='password'
            autoComplete='current-password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: <Lock sx={{ mr: 1, color: '#997F6D' }} />,
            }}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              bgcolor: '#997F6D',
              '&:hover': {
                bgcolor: '#7a6554',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color='inherit' />
            ) : (
              'Войти'
            )}
          </Button>

          <Button
            fullWidth
            variant='outlined'
            sx={{
              mt: 1,
              mb: 2,
              py: 1.5,
              color: '#997F6D',
              borderColor: '#997F6D',
              '&:hover': {
                borderColor: '#7a6554',
                color: '#7a6554',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgba(153, 127, 109, 0.04)',
              },
              transition: 'all 0.3s ease',
            }}
            href='/register'
          >
            Нет аккаунта? Зарегистрироваться
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthPage;
