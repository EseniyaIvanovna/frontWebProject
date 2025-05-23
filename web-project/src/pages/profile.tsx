import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Avatar,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import { Add, Edit, Home } from '@mui/icons-material';
import Header from '../components/header';
import ProfilePost from '../components/ProfilePost';

const ProfilePage = () => {
  // Данные пользователя
  const [user] = useState({
    name: 'Иван',
    lastName: 'Иванов',
    dateOfBirth: new Date(1990, 5, 15),
    info: 'Люблю путешествовать и программировать',
    email: 'ivan.ivanov@example.com',
  });

  // Посты
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: 'Сегодня замечательный день! Солнце светит, птицы поют.',
      createdAt: '2 часа назад',
      likes: 15,
      isLiked: false,
      comments: 3,
    },
    {
      id: 2,
      content: 'Только что закончил новый проект на React!',
      createdAt: '5 дней назад',
      likes: 42,
      isLiked: true,
      comments: 8,
    },
  ]);

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const handleAddPost = () => {
    const newPost = {
      id: Date.now(),
      content: 'Новый пост!',
      createdAt: 'Только что',
      likes: 0,
      isLiked: false,
      comments: 0,
    };
    setPosts([newPost, ...posts]);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU');
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

      {/* Информация о пользователе */}
      <Box
        sx={{
          display: 'flex',
          p: 4,
          gap: 4,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Аватар */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              width: 150,
              height: 150,
              fontSize: '3rem',
              bgcolor: '#997F6D',
            }}
          >
            {user.name.charAt(0)}
            {user.lastName.charAt(0)}
          </Avatar>
          <Button
            href='/'
            variant='outlined'
            sx={{
              width: '100%',
              height: 56,
              minWidth: 0,
              color: '#997F6D',
              borderColor: '#997F6D',
              '&:hover': {
                backgroundColor: 'rgba(153, 127, 109, 0.1)',
                borderColor: '#7a6554',
              },
            }}
            startIcon={<Home />}
          >
            Главная
          </Button>
        </Box>

        {/* Данные пользователя */}
        <Paper
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: '#FFF9F2',
            borderRadius: 2,
            position: 'relative',
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: '#997F6D',
            }}
          >
            <Edit />
          </IconButton>

          <Typography variant='h4' sx={{ mb: 2 }}>
            {user.name} {user.lastName}
          </Typography>

          <Typography>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography>
            <strong>Дата рождения:</strong> {formatDate(user.dateOfBirth)}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography>
            <strong>О себе:</strong>
          </Typography>
          <Typography paragraph sx={{ mt: 1 }}>
            {user.info}
          </Typography>
        </Paper>
      </Box>

      {/* Кнопка добавления поста */}
      <Box sx={{ px: 4, mb: 3 }}>
        <Button
          fullWidth
          variant='contained'
          startIcon={<Add />}
          sx={{
            py: 2,
            bgcolor: '#997F6D',
            '&:hover': { bgcolor: '#7a6554' },
          }}
          onClick={handleAddPost}
        >
          Добавить пост
        </Button>
      </Box>

      {/* Лента постов */}
      <Box
        sx={{
          flexGrow: 1,
          px: 4,
          pb: 4,
          overflowY: 'auto',
        }}
      >
        {posts.map((post) => (
          <ProfilePost
            key={post.id}
            post={post}
            onLike={handleLike}
            onEdit={() => console.log('Edit post', post.id)}
            onDelete={() => setPosts(posts.filter((p) => p.id !== post.id))}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProfilePage;
