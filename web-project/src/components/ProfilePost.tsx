import React, { useState } from 'react';
import { Paper, Typography, IconButton, Box } from '@mui/material';
import { Favorite, ChatBubbleOutline, Edit, Delete } from '@mui/icons-material';

interface ProfilePostProps {
  post: {
    id: number;
    content: string;
    createdAt: string;
    likes: number;
    isLiked: boolean;
    comments: number;
  };
  onLike: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProfilePost = ({ post, onLike, onEdit, onDelete }: ProfilePostProps) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <Paper
      sx={{
        mb: 3,
        p: 3,
        backgroundColor: '#FFF9F2',
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'relative',
      }}
    >
      {/* Кнопки управления */}
      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
        <IconButton onClick={() => onEdit(post.id)} size='small'>
          <Edit fontSize='small' />
        </IconButton>
        <IconButton onClick={() => onDelete(post.id)} size='small'>
          <Delete fontSize='small' color='error' />
        </IconButton>
      </Box>

      <Typography
        variant='caption'
        color='text.secondary'
        sx={{ mb: 1, display: 'block' }}
      >
        {post.createdAt}
      </Typography>

      <Typography paragraph sx={{ mb: 2 }}>
        {post.content}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          onClick={() => onLike(post.id)}
          sx={{ color: post.isLiked ? '#FF6B6B' : 'inherit' }}
          size='small'
        >
          <Favorite />
          <Typography variant='body2' sx={{ ml: 0.5 }}>
            {post.likes}
          </Typography>
        </IconButton>

        <IconButton onClick={() => setShowComments(!showComments)} size='small'>
          <ChatBubbleOutline />
          <Typography variant='body2' sx={{ ml: 0.5 }}>
            {post.comments}
          </Typography>
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ProfilePost;
