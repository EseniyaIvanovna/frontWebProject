import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Paper } from '@mui/material';
import { AccountCircle, Mail, People } from '@mui/icons-material';
import { Post } from '../components/post';
import Header from '../components/header';

export default function MainPage() {
  const currentUser = {
    id: 1,
    name: 'Текущий',
    lastName: 'Пользователь',
  };

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        id: 1,
        name: 'Иван',
        lastName: 'Иванов',
      },
      content:
        'Сегодня замечательный день! Солнце светит, птицы поют. Решил прогуляться в парке и насладиться природой.',
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
        id: 3,
        name: 'Алексей',
        lastName: 'Сидоров',
      },
      content:
        'Кто-нибудь знает хорошие курсы по React? Хочу улучшить свои навыки в разработке интерфейсов.',
      createdAt: '5 часов назад',
      likes: 7,
      isLiked: true,
      comments: [],
    },
  ]);

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      })
    );
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
            backgroundColor: '#FFD3B6',
          }}
        >
          <Box
            sx={{
              width: '100%',
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
      </Box>
    </Box>
  );
}
