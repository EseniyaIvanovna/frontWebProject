import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { Box, Avatar, Typography, IconButton, Paper } from '@mui/material';
import { Favorite, ChatBubbleOutline } from '@mui/icons-material';
import { CommentSection } from '../components/comment';

interface PostProps {
  post: {
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
    comments: {
      id: number;
      author: {
        id: number;
        name: string;
        lastName: string;
      };
      content: string;
      createdAt: string;
    }[];
  };
  currentUser: {
    id: number;
    name: string;
    lastName: string;
  };
  onLike: (postId: number) => void;
}

export const Post = ({ post, currentUser, onLike }: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments);

  const handleAddComment = (content: string) => {
    const newComment = {
      id: Date.now(),
      author: currentUser,
      content,
      createdAt: 'Только что',
    };
    setComments([...comments, newComment]);
  };

  return (
    <Paper sx={{ mb: 3, p: 3 }}>
      {/* Шапка поста */}
      <Box sx={{ display: 'flex', mb: 2 }}>
        <Avatar sx={{ mr: 2 }}>
          {post.author.name.charAt(0)}
          {post.author.lastName.charAt(0)}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <MuiLink
            component={Link}
            to={`/profile/${post.author.id}`}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': { textDecoration: 'underline' },
              fontWeight: '500',
            }}
          >
            {post.author.name} {post.author.lastName}
          </MuiLink>
          <Typography variant='caption' color='text.secondary' sx={{ mt: 0.5 }}>
            {post.createdAt}
          </Typography>
        </Box>
      </Box>

      {/* Текст поста */}
      <Typography paragraph sx={{ mb: 2 }}>
        {post.content}
      </Typography>

      {/* Кнопки действий */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          onClick={() => onLike(post.id)}
          sx={{ color: post.isLiked ? 'error.main' : 'inherit' }}
        >
          <Favorite />
          <Typography sx={{ ml: 0.5 }}>{post.likes}</Typography>
        </IconButton>

        <IconButton onClick={() => setShowComments(!showComments)}>
          <ChatBubbleOutline />
          <Typography sx={{ ml: 0.5 }}>{comments.length}</Typography>
        </IconButton>
      </Box>

      {/* Секция комментариев */}
      {showComments && (
        <CommentSection
          comments={comments}
          currentUser={currentUser}
          onAddComment={handleAddComment}
        />
      )}
    </Paper>
  );
};
