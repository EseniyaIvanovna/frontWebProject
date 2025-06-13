/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { Box, Avatar, Typography, IconButton, Paper } from '@mui/material';
import { Favorite, ChatBubbleOutline } from '@mui/icons-material';
import { CommentSection } from '../components/comment';
import {
  useGetCommentsByPostQuery,
  useAddCommentMutation,
} from '../api/commentApiSlice';

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
  };
  currentUser: {
    id: number;
    name: string;
    lastName: string;
  };
  onLike: (postId: number) => void;
  likesCount: number;
  isLiked: boolean;
}

export const Post = ({
  post,
  currentUser,
  onLike,
  likesCount,
  isLiked,
}: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const { data: comments = [], refetch: refetchComments } =
    useGetCommentsByPostQuery({ postId: post.id });
  const [addComment] = useAddCommentMutation();

  const handleAddComment = async (content: string) => {
    try {
      await addComment({
        postId: post.id,
        userId: currentUser.id,
        content,
      }).unwrap();
      refetchComments();
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
    }
  };

  return (
    <Paper sx={{ mb: 3, p: 3, borderRadius: 2 }}>
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
            {new Date(post.createdAt).toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {/* Текст поста */}
      <Typography sx={{ mb: 2, whiteSpace: 'pre-line' }}>
        {post.content}
      </Typography>

      {/* Кнопки действий */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          onClick={() => onLike(post.id)}
          sx={{
            color: isLiked ? 'error.main' : 'inherit',
            '&:hover': {
              color: 'error.main',
            },
          }}
          aria-label='Лайк'
        >
          <Favorite color={isLiked ? 'error' : 'inherit'} />
          <Typography sx={{ ml: 0.5 }}>{likesCount}</Typography>
        </IconButton>

        <IconButton
          onClick={() => setShowComments(!showComments)}
          aria-label='Комментарии'
        >
          <ChatBubbleOutline />
          <Typography sx={{ ml: 0.5 }}>{comments.length}</Typography>
        </IconButton>
      </Box>

      {/* Секция комментариев */}
      {/* {showComments && (
        <CommentSection
          comments={comments.map(comment => ({
            id: comment.id,
            author: {
              name: comment.author.name,
              lastName: comment.author.lastName,
            },
            content: comment.content,
            createdAt: new Date(comment.createdAt).toLocaleString(),
          }))}
          currentUser={currentUser}
          onAddComment={handleAddComment}
        />
      )} */}
    </Paper>
  );
};
