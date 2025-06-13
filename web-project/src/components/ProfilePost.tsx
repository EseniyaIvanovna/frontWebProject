/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Paper,
  Typography,
  IconButton,
  Box,
  TextField,
  Button,
} from '@mui/material';
import { Favorite, ChatBubbleOutline, Edit, Delete } from '@mui/icons-material';
import { useGetReactionsByPostQuery } from '../api/reactionApiSlice';
import { useGetCommentsByPostQuery } from '../api/commentApiSlice';
import { CommentSection } from './comment';
import { ProfileCommentSection } from './CommentSectionReadOnly';

interface ProfilePostProps {
  post: {
    id: number;
    text: string;
    createdAt: string;
  };

  onLike: (id: number) => void;
  onEdit: (id: number, newContent: string) => void;
  onDelete: (id: number) => void;
  refetchPosts: () => void;
}

const ProfilePost = ({ post, onLike, onEdit, onDelete }: ProfilePostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.text);

  const { data: reactions = [], isLoading: isReactionsLoading } =
    useGetReactionsByPostQuery({ postId: post.id });

  const {
    data: comments = [],
    isLoading: isCommentsLoading,
    refetch: refetchComments,
  } = useGetCommentsByPostQuery({ postId: post.id });

  const handleSave = () => {
    onEdit(post.id, editedContent);
    setIsEditing(false);
  };

  const likesCount = reactions.length;

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
        <IconButton onClick={() => setIsEditing(!isEditing)} size='small'>
          <Edit fontSize='small' />
        </IconButton>
        <IconButton onClick={() => onDelete(post.id)} size='small'>
          <Delete fontSize='small' color='error' />
        </IconButton>
      </Box>

      {isEditing ? (
        <>
          <TextField
            fullWidth
            multiline
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button onClick={handleSave} variant='contained' size='small'>
            Сохранить
          </Button>
        </>
      ) : (
        <>
          <Typography
            variant='caption'
            color='text.secondary'
            sx={{ mb: 1, display: 'block' }}
          >
            {post.createdAt}
          </Typography>

          <Typography paragraph sx={{ mb: 2 }}>
            {post.text}
          </Typography>
        </>
      )}

      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton sx={{ color: '#FF6B6B' }} size='small' disabled>
          <Favorite />
          <Typography variant='body2' sx={{ ml: 0.5 }}>
            {likesCount}
          </Typography>
        </IconButton>

        <IconButton onClick={() => setShowComments(!showComments)} size='small'>
          <ChatBubbleOutline />
          <Typography variant='body2' sx={{ ml: 0.5 }}>
            {comments.length}
          </Typography>
        </IconButton>
      </Box>

      {/* Секция комментариев */}
      {showComments && <ProfileCommentSection postId={post.id} />}
    </Paper>
  );
};

export default ProfilePost;
