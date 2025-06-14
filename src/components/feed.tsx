import React, { useState } from 'react';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { ChatBubbleOutline, Favorite } from '@mui/icons-material';
//import Post from '../components/post';

const Feed = () => {
  // Заглушка данных для нескольких постов
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: 'Иван',
        lastName: 'Иванов',
      },
      content: 'Сегодня замечательный день! Солнце светит, птицы поют.',
      createdAt: '2 часа назад',
      likes: 15,
      comments: 3,
      isLiked: false,
    },
    {
      id: 2,
      author: {
        name: 'Мария',
        lastName: 'Петрова',
      },
      content: 'Только что закончила новый проект. Очень довольна результатом!',
      createdAt: '5 часов назад',
      likes: 42,
      comments: 8,
      isLiked: true,
    },
    {
      id: 3,
      author: {
        name: 'Алексей',
        lastName: 'Сидоров',
      },
      content:
        'Кто-нибудь знает хорошие курсы по React? Хочу улучшить свои навыки.',
      createdAt: '1 день назад',
      likes: 7,
      comments: 5,
      isLiked: false,
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
        maxWidth: 600,
        mx: 'auto',
        py: 2,
        '& > *': {
          mb: 2,
        },
      }}
    >
      {posts.map((post) => (
        <Post
          key={post.id}
          author={post.author}
          postContent={post.content}
          createdAt={post.createdAt}
          likes={post.likes}
          commentsCount={post.comments}
          isLiked={post.isLiked}
          onLike={() => handleLike(post.id)}
        />
      ))}
    </Box>
  );
};

const Post = ({
  author,
  postContent,
  createdAt,
  likes,
  commentsCount,
  isLiked,
  onLike,
}: {
  author: { name: string; lastName: string };
  postContent: string;
  createdAt: string;
  likes: number;
  commentsCount: number;
  isLiked: boolean;
  onLike: () => void;
}) => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        overflow: 'hidden',
      }}
    >
      {/* Шапка поста с автором */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar sx={{ mr: 2 }}>
          {author.name.charAt(0)}
          {author.lastName.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant='subtitle1'>
            {author.name} {author.lastName}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {createdAt}
          </Typography>
        </Box>
      </Box>

      {/* Текст поста */}
      <Box sx={{ p: 2 }}>
        <Typography>{postContent}</Typography>
      </Box>

      {/* Кнопки взаимодействия */}
      <Box
        sx={{
          display: 'flex',
          px: 2,
          py: 1,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <IconButton
          onClick={onLike}
          color={isLiked ? 'error' : 'default'}
          sx={{ mr: 1 }}
        >
          <Favorite />
          <Typography sx={{ ml: 1 }}>{likes}</Typography>
        </IconButton>

        <IconButton sx={{ mr: 1 }}>
          <ChatBubbleOutline />
          <Typography sx={{ ml: 1 }}>{commentsCount}</Typography>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Feed;
