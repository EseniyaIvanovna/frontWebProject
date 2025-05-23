import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Avatar,
  Typography,
  Divider,
  Stack,
} from '@mui/material';
import { Home, PersonAdd, Send } from '@mui/icons-material';
import Header from '../components/header';
import { Post } from '../components/post';

interface User {
  id: number;
  name: string;
  lastName: string;
  dateOfBirth: Date;
  info?: string;
  email?: string;
  isFriend?: boolean;
}

interface PostType {
  id: number;
  author: {
    id: number;
    name: string;
    lastName: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  comments: Array<{
    id: number;
    author: {
      id: number;
      name: string;
      lastName: string;
    };
    content: string;
    createdAt: string;
  }>;
}

const UserProfilePage = () => {
  // Данные текущего пользователя (кто смотрит профиль)
  const [currentUser] = useState<User>({
    id: 2,
    name: 'Мария',
    lastName: 'Петрова',
    dateOfBirth: new Date(1999, 1, 5),
  });

  // Данные пользователя, чей профиль просматриваем
  const [profileUser] = useState<User>({
    id: 1,
    name: 'Иван',
    lastName: 'Иванов',
    dateOfBirth: new Date(1990, 5, 15),
    info: 'Люблю путешествовать и программировать',
    email: 'ivan.ivanov@example.com',
    isFriend: false,
  });

  // Посты пользователя
  const [posts, setPosts] = useState<PostType[]>([
    {
      id: 1,
      author: {
        id: 1,
        name: 'Иван',
        lastName: 'Иванов',
      },
      content: 'Сегодня замечательный день! Солнце светит, птицы поют.',
      createdAt: '2 часа назад',
      likes: 15,
      isLiked: false,
      comments: [
        {
          id: 1,
          author: {
            id: 2,
            name: 'Мария',
            lastName: 'Петрова',
          },
          content: 'Согласна! Я тоже сегодня гуляла в парке, очень красиво!',
          createdAt: '1 час назад',
        },
      ],
    },
    {
      id: 2,
      author: {
        id: 1,
        name: 'Иван',
        lastName: 'Иванов',
      },
      content: 'Кто-нибудь знает хорошие курсы по React?',
      createdAt: '5 часов назад',
      likes: 7,
      isLiked: true,
      comments: [],
    },
  ]);

  const handleLike = (postId: number): void => {
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

  const handleAddFriend = (): void => {
    console.log('Добавлен в друзья');
  };

  const handleSendMessage = (): void => {
    console.log('Отправлено сообщение');
  };

  const formatDate = (date: Date): string => {
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
        {/* Левая часть - аватар и кнопки */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            width: { xs: '100%', md: '30%' },
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
            {profileUser.name.charAt(0)}
            {profileUser.lastName.charAt(0)}
          </Avatar>

          <Stack spacing={2} sx={{ width: '100%', maxWidth: 300 }}>
            <Button
              variant={profileUser.isFriend ? 'outlined' : 'contained'}
              startIcon={<PersonAdd />}
              onClick={handleAddFriend}
              sx={{
                bgcolor: profileUser.isFriend ? 'inherit' : '#997F6D',
                color: profileUser.isFriend ? '#997F6D' : 'white',
                borderColor: '#997F6D',
                '&:hover': {
                  bgcolor: profileUser.isFriend
                    ? 'rgba(153, 127, 109, 0.1)'
                    : '#7a6554',
                },
              }}
            >
              {profileUser.isFriend ? 'У вас в друзьях' : 'Добавить в друзья'}
            </Button>

            <Button
              component={Link}
              to='/messages'
              variant='outlined'
              startIcon={<Send />}
              onClick={handleSendMessage}
              sx={{
                color: '#997F6D',
                borderColor: '#997F6D',
                '&:hover': {
                  backgroundColor: 'rgba(153, 127, 109, 0.1)',
                  borderColor: '#7a6554',
                },
              }}
            >
              Отправить сообщение
            </Button>

            <Button
              href='/'
              variant='outlined'
              sx={{
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
          </Stack>
        </Box>

        {/* Правая часть - информация о пользователе  */}
        <Paper
          sx={{
            flex: 1,
            p: 3,
            backgroundColor: '#FFF9F2',
            borderRadius: 2,
            width: { xs: '100%', md: '70%' },
          }}
        >
          <Typography variant='h4' sx={{ mb: 2 }}>
            {profileUser.name} {profileUser.lastName}
          </Typography>

          <Typography>
            <strong>Email:</strong> {profileUser.email}
          </Typography>
          <Typography>
            <strong>Дата рождения:</strong>{' '}
            {formatDate(profileUser.dateOfBirth)}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography>
            <strong>О себе:</strong>
          </Typography>
          <Typography paragraph sx={{ mt: 1 }}>
            {profileUser.info}
          </Typography>
        </Paper>
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
          <Post
            key={post.id}
            post={post}
            currentUser={currentUser}
            onLike={handleLike}
          />
        ))}
      </Box>
    </Box>
  );
};

export default UserProfilePage;
