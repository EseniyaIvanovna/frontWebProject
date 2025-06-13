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

interface ProfileCommentSectionProps {
  postId: number;
}

export const ProfileCommentSection = ({
  postId,
}: ProfileCommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const { data: comments = [], isLoading } = useGetCommentsByPostQuery({
    postId,
  });

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
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
            <Comment key={comment.id} comment={comment} />
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

const Comment = ({ comment }: { comment: any }) => {
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
      <Avatar src={author?.photoAttachmentUrl || undefined}>
        {!author?.photoAttachmentUrl &&
          `${author?.name.charAt(0)}${author?.lastName.charAt(0)}`}
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
