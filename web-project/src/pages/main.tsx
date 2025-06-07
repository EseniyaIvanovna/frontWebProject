/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Box, Button, CircularProgress, Paper } from '@mui/material';
import { AccountCircle, Mail, People } from '@mui/icons-material';
import { Post } from '../components/post';
import Header from '../components/header';
import { useGetAllPostsQuery } from '../api/postApiSlice';
import {
  useAddReactionMutation,
  useRemoveReactionMutation,
  useGetReactionsByPostQuery,
} from '../api/reactionApiSlice';
import { PostWithData } from '../components/postWithData';
import { useUserInfoQuery } from '../api/userApiSlice';

export default function MainPage() {
  // const { data: userInfo, isLoading: isUserLoading } = useUserInfoQuery({});
  const {
    data: posts = [],
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useGetAllPostsQuery({});

  // if (isUserLoading || isPostsLoading) {
  //   return (
  //     <Box display='flex' justifyContent='center' mt={4}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  if (isPostsError) {
    return (
      <Box p={3}>
        <Alert severity='error'>Не удалось загрузить посты</Alert>
      </Box>
    );
  }

  // if (!userInfo) {
  //   return (
  //     <Box p={3}>
  //       <Alert severity='error'>Не удалось загрузить данные пользователя</Alert>
  //     </Box>
  //   );
  // }

  // const currentUser = {
  //   id: userInfo.id,
  //   name: userInfo.name,
  //   lastName: userInfo.lastName,
  // }
  const currentUser = {
    id: 17,
    name: 'Есения',
    lastName: 'Мижутина',
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FFD3B6',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          overflow: 'hidden',
        }}
      >
        {/* Боковая панель с кнопками */}
        <Paper
          sx={{
            width: 220,
            p: 3,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            borderRight: '1px solid #997F6D',
            flexShrink: 0,
          }}
        >
          <Button
            component={Link}
            to='/profile'
            startIcon={<AccountCircle sx={{ fontSize: '28px' }} />}
            sx={{
              color: '#997F6D',
              border: '1px solid #997F6D',
              borderRadius: 2,
              py: 2.5,
              fontSize: '18px',
              fontWeight: 500,
              '& .MuiButton-startIcon': { mr: '12px' },
              '&:hover': { backgroundColor: 'rgba(153, 127, 109, 0.1)' },
            }}
          >
            Профиль
          </Button>

          <Button
            component={Link}
            to='/messages'
            startIcon={<Mail sx={{ fontSize: '28px' }} />}
            sx={{
              color: '#997F6D',
              border: '1px solid #997F6D',
              borderRadius: 2,
              py: 2.5,
              fontSize: '18px',
              fontWeight: 500,
              '& .MuiButton-startIcon': { mr: '12px' },
              '&:hover': { backgroundColor: 'rgba(153, 127, 109, 0.1)' },
            }}
          >
            Сообщения
          </Button>

          <Button
            component={Link}
            to='/friends'
            startIcon={<People sx={{ fontSize: '28px' }} />}
            sx={{
              color: '#997F6D',
              border: '1px solid #997F6D',
              borderRadius: 2,
              py: 2.5,
              fontSize: '18px',
              fontWeight: 500,
              '& .MuiButton-startIcon': { mr: '12px' },
              '&:hover': { backgroundColor: 'rgba(153, 127, 109, 0.1)' },
            }}
          >
            Друзья
          </Button>
        </Paper>

        {/* Лента постов */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 800 }}>
            {posts.map((post) => (
              <PostWithData
                key={post.id}
                post={post}
                currentUser={currentUser}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
