import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Paper,
  Divider,
} from '@mui/material';
import { Send } from '@mui/icons-material';

interface Comment {
  id: number;
  author: {
    name: string;
    lastName: string;
  };
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  comments: Comment[];
  currentUser: {
    name: string;
    lastName: string;
  };
  onAddComment: (content: string) => void;
}

export const CommentSection = ({
  comments,
  currentUser,
  onAddComment,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      {/* Поле ввода нового комментария */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ mr: 2 }}>
          {currentUser.name.charAt(0)}
          {currentUser.lastName.charAt(0)}
        </Avatar>
        <TextField
          fullWidth
          variant='outlined'
          size='small'
          placeholder='Написать комментарий...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <IconButton
          color='primary'
          onClick={handleSubmit}
          disabled={!newComment.trim()}
          sx={{ ml: 1 }}
        >
          <Send />
        </IconButton>
      </Box>

      {/* Список комментариев */}
      {comments.length > 0 ? (
        <>
          <Divider sx={{ my: 2 }} />
          {comments.map((comment) => (
            <Box key={comment.id} sx={{ display: 'flex', mb: 2 }}>
              <Avatar sx={{ mr: 2 }}>
                {comment.author.name.charAt(0)}
                {comment.author.lastName.charAt(0)}
              </Avatar>
              <Box>
                <Typography fontWeight='500'>
                  {comment.author.name} {comment.author.lastName}
                  <Typography
                    component='span'
                    variant='caption'
                    color='text.secondary'
                    sx={{ ml: 1 }}
                  >
                    {comment.createdAt}
                  </Typography>
                </Typography>
                <Typography>{comment.content}</Typography>
              </Box>
            </Box>
          ))}
        </>
      ) : (
        <Typography color='text.secondary' textAlign='center' py={2}>
          Нет комментариев
        </Typography>
      )}
    </Paper>
  );
};
