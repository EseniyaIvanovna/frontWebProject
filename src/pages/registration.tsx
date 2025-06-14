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
import { Email, Person, Lock, CalendarToday } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../api/authApiSlice';

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Минимум 2 символа').required('Обязательное поле'),
  lastName: Yup.string()
    .min(2, 'Минимум 2 символа')
    .required('Обязательное поле'),
  dateOfBirth: Yup.date()
    .required('Обязательное поле')
    .max(new Date(), 'Дата рождения не может быть в будущем'),
  email: Yup.string().email('Некорректный email').required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('Подтвердите пароль'),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      dateOfBirth: null as Date | null,
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await register({
          Name: values.name,
          LastName: values.lastName,
          DateOfBirth: values.dateOfBirth,
          Email: values.email,
          Password: values.password,
        }).unwrap();
        navigate('/login');
      } catch (error) {
        setFieldError('email', 'Ошибка регистрации');
        setFieldError('password', 'Ошибка регистрации');
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
            id='name'
            label='Имя'
            name='name'
            autoComplete='given-name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{
              startAdornment: <Person sx={{ mr: 1, color: '#997F6D' }} />,
            }}
          />

          <TextField
            margin='normal'
            required
            fullWidth
            id='lastName'
            label='Фамилия'
            name='lastName'
            autoComplete='family-name'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            InputProps={{
              startAdornment: <Person sx={{ mr: 1, color: '#997F6D' }} />,
            }}
          />

          <TextField
            margin='normal'
            required
            fullWidth
            id='dateOfBirth'
            label='Дата рождения'
            name='dateOfBirth'
            type='date'
            InputLabelProps={{ shrink: true }}
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
            }
            helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
            InputProps={{
              startAdornment: (
                <CalendarToday sx={{ mr: 1, color: '#997F6D' }} />
              ),
            }}
          />

          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            autoComplete='email'
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
            autoComplete='new-password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: <Lock sx={{ mr: 1, color: '#997F6D' }} />,
            }}
          />

          <TextField
            margin='normal'
            required
            fullWidth
            name='confirmPassword'
            label='Подтвердите пароль'
            type='password'
            id='confirmPassword'
            autoComplete='new-password'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            InputProps={{
              startAdornment: <Lock sx={{ mr: 1, color: '#997F6D' }} />,
            }}
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            disabled={formik.isSubmitting || isLoading}
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
              'Зарегистрироваться'
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
            href='/login'
          >
            Уже есть аккаунт? Войти
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
