/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Paper,
  Divider,
  Skeleton,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { useGetUserByIdQuery } from '../api/userApiSlice';
import { useGetCommentsByPostQuery } from '../api/commentApiSlice';

interface CommentSectionProps {
  postId: number;
  currentUser: {
    id: number;
    name: string;
    lastName: string;
    photoAttachmentUrl: string | null;
  };
  onAddComment: (content: string) => void;
}

export const CommentSection = ({
  postId,
  currentUser,
  onAddComment,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const { data: comments = [], isLoading } = useGetCommentsByPostQuery({
    postId,
  });

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
        <Avatar src={currentUser?.photoAttachmentUrl || undefined}>
          {!currentUser.photoAttachmentUrl &&
            `${currentUser.name.charAt(0)}${currentUser.lastName.charAt(0)}`}
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
      {isLoading ? (
        <Box>
          {[1, 2, 3].map((i) => (
            <Box key={i} sx={{ display: 'flex', mb: 2 }}>
              <Skeleton
                variant='circular'
                width={40}
                height={40}
                sx={{ mr: 2 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton variant='text' width='60%' />
                <Skeleton variant='text' width='80%' />
              </Box>
            </Box>
          ))}
        </Box>
      ) : comments.length > 0 ? (
        <>
          <Divider sx={{ my: 2 }} />
          {comments.map((comment) => (
            <CommentWithAuthor
              key={comment.id}
              comment={comment}
              currentUser={currentUser}
            />
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

const CommentWithAuthor = ({
  comment,
  currentUser,
}: {
  comment: any;
  currentUser: any;
}) => {
  const { data: author, isLoading } = useGetUserByIdQuery({
    id: comment.userId,
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', mb: 2 }}>
        <Skeleton variant='circular' width={40} height={40} sx={{ mr: 2 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton variant='text' width='60%' />
          <Skeleton variant='text' width='80%' />
        </Box>
      </Box>
    );
  }

  if (!author) return null;

  return (
    <Box sx={{ display: 'flex', mb: 2 }}>
      <Avatar sx={{ mr: 2 }}>
        {author.name.charAt(0)}
        {author.lastName.charAt(0)}
      </Avatar>
      <Box>
        <Typography fontWeight='500'>
          {author.name} {author.lastName}
          <Typography
            component='span'
            variant='caption'
            color='text.secondary'
            sx={{ ml: 1 }}
          >
            {new Date(comment.createdAt).toLocaleString()}
          </Typography>
        </Typography>
        <Typography>{comment.content}</Typography>
      </Box>
    </Box>
  );
};
