/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Link as MuiLink,
  Box,
  Avatar,
  Typography,
  IconButton,
  Paper,
  Skeleton,
} from '@mui/material';
import { Favorite, ChatBubbleOutline } from '@mui/icons-material';
import { useGetUserByIdQuery } from '../api/userApiSlice';
import {
  useGetCommentsByPostQuery,
  useAddCommentMutation,
} from '../api/commentApiSlice';
import {
  useGetReactionsByPostQuery,
  useAddReactionMutation,
  useRemoveReactionMutation,
} from '../api/reactionApiSlice';
import { CommentSection } from './comment';

interface PostWithDataProps {
  post: {
    id: number;
    userId: number;
    content: string;
    createdAt: Date;
  };
  currentUser: {
    id: number;
    name: string;
    lastName: string;
  };
}

export const PostWithData = ({ post, currentUser }: PostWithDataProps) => {
  const [showComments, setShowComments] = useState(false);

  // Загружаем данные автора поста
  const { data: author, isLoading: isAuthorLoading } = useGetUserByIdQuery({
    id: post.userId,
  });

  // Загружаем реакции
  const { data: reactions = [], isLoading: isReactionsLoading } =
    useGetReactionsByPostQuery({ postId: post.id });

  // Загружаем комментарии
  const {
    data: comments = [],
    isLoading: isCommentsLoading,
    refetch: refetchComments,
  } = useGetCommentsByPostQuery({ postId: post.id }, { skip: !showComments });

  const [addComment] = useAddCommentMutation();
  const [addReaction] = useAddReactionMutation();
  const [removeReaction] = useRemoveReactionMutation();

  // Обработчик лайков
  const handleLike = async () => {
    const userReaction = reactions.find((r) => r.userId === currentUser.id);
    if (userReaction) {
      await removeReaction({ id: userReaction.id });
    } else {
      await addReaction({ postId: post.id, userId: currentUser.id, type: 1 });
    }
  };

  // Обработчик добавления комментария
  const handleAddComment = async (content: string) => {
    await addComment({ postId: post.id, content }).unwrap();
    refetchComments();
  };

  // Количество лайков
  const likesCount = reactions.length;
  const isLiked = reactions.some((r) => r.userId === currentUser.id);

  if (isAuthorLoading) {
    return <Skeleton variant='rectangular' height={200} />;
  }

  if (!author) return null;

  return (
    <Paper sx={{ mb: 3, p: 3, borderRadius: 2 }}>
      {/* Шапка поста */}
      <Box sx={{ display: 'flex', mb: 2 }}>
        <Avatar sx={{ mr: 2 }}>
          {author.name.charAt(0)}
          {author.lastName.charAt(0)}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <MuiLink
            component={Link}
            to={`/profile/${author.id}`}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': { textDecoration: 'underline' },
              fontWeight: '500',
            }}
          >
            {author.name} {author.lastName}
          </MuiLink>
          <Typography variant='caption' color='text.secondary' sx={{ mt: 0.5 }}>
            {post.createdAt.toLocaleString()}
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
          onClick={handleLike}
          sx={{
            color: isLiked ? 'error.main' : 'inherit',
            '&:hover': { color: 'error.main' },
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
          <Typography sx={{ ml: 0.5 }}>
            {isCommentsLoading ? '...' : comments.length}
          </Typography>
        </IconButton>
      </Box>

      {/* Секция комментариев */}
      {showComments && (
        <CommentSection
          postId={post.id}
          currentUser={currentUser}
          onAddComment={handleAddComment}
        />
      )}
    </Paper>
  );
};
