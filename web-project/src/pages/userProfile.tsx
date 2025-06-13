/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Avatar,
  Typography,
  Divider,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Home, PersonAdd, PersonRemove, Send } from '@mui/icons-material';
import Header from '../components/header';
import { PostWithData } from '../components/postWithData';
import { useGetUserByIdQuery, useUserInfoQuery } from '../api/userApiSlice';
import { useGetPostsByUserQuery } from '../api/postApiSlice';
import {
  useAddInteractionMutation,
  useGetInteractionByUserIdQuery,
  useRemoveInteractionMutation,
} from '../api/interactionApiSlice';

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const numericUserId = Number(userId);

  const { data: userInfo, isLoading: isCurrentUserLoading } = useUserInfoQuery(
    {}
  );
  const currentUserId = userInfo?.id;
  const {
    data: profileUser,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch: refetchUser,
  } = useGetUserByIdQuery({ id: numericUserId });

  const {
    data: posts = [],
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = useGetPostsByUserQuery({ id: numericUserId });

  const {
    data: interactions = [],
    isLoading: isInteractionsLoading,
    refetch: refetchInteractions,
  } = useGetInteractionByUserIdQuery(
    { id: currentUserId || 0 },
    { skip: !currentUserId }
  );

  const [addInteraction] = useAddInteractionMutation();
  const [removeInteraction] = useRemoveInteractionMutation();

  const [isFriend, setIsFriend] = useState(false);
  const [interactionId, setInteractionId] = useState<number | null>(null);

  useEffect(() => {
    if (interactions && currentUserId && profileUser) {
      const interaction = interactions.find(
        (interaction) =>
          (interaction.user1Id === currentUserId &&
            interaction.user2Id === profileUser.id) ||
          (interaction.user1Id === profileUser.id &&
            interaction.user2Id === currentUserId)
      );

      setIsFriend(!!interaction);
      setInteractionId(interaction?.id || null);
    }
  }, [interactions, currentUserId, profileUser]);

  const handleAddFriend = async () => {
    if (!currentUserId || !profileUser) return;

    try {
      await addInteraction({
        user1Id: currentUserId,
        user2Id: profileUser.id,
        status: 1,
      }).unwrap();
      refetchInteractions();
    } catch (error) {
      console.error('Failed to add friend:', error);
    }
  };

  const handleRemoveFriend = async () => {
    if (!interactionId) return;

    try {
      await removeInteraction(interactionId).unwrap();
      refetchInteractions();
    } catch (error) {
      console.error('Failed to remove friend:', error);
    }
  };

  const handleSendMessage = () => {
    navigate(`/messages/${numericUserId}`);
  };

  if (isCurrentUserLoading || isUserLoading || isInteractionsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!userInfo) {
    return (
      <Box p={3}>
        <Alert severity='error'>Не удалось загрузить данные пользователя</Alert>
      </Box>
    );
  }

  if (isUserError || !profileUser) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Alert severity='error'>Пользователь не найден</Alert>
        <Button component={Link} to='/' sx={{ mt: 2 }}>
          На главную
        </Button>
      </Box>
    );
  }

  const currentUser = {
    id: userInfo.id,
    name: userInfo.name,
    lastName: userInfo.lastName,
    photoAttachmentUrl: userInfo.photoAttachmentUrl,
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

      {/* Информация о пользователе */}
      <Box
        sx={{
          display: 'flex',
          p: 4,
          gap: 4,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Левая часть - аватар и кнопки */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            width: { xs: '100%', md: '30%' },
          }}
        >
          <Avatar
            sx={{
              width: 150,
              height: 150,
              fontSize: '3rem',
              bgcolor: '#997F6D',
            }}
          >
            {profileUser.name.charAt(0)}
            {profileUser.lastName.charAt(0)}
          </Avatar>

          <Stack spacing={2} sx={{ width: '100%', maxWidth: 300 }}>
            {isFriend ? (
              <Button
                variant='outlined'
                startIcon={<PersonRemove />}
                onClick={handleRemoveFriend}
                sx={{
                  color: '#997F6D',
                  borderColor: '#997F6D',
                  '&:hover': {
                    bgcolor: 'rgba(153, 127, 109, 0.1)',
                  },
                }}
              >
                Удалить из друзей
              </Button>
            ) : (
              <Button
                variant='contained'
                startIcon={<PersonAdd />}
                onClick={handleAddFriend}
                sx={{
                  bgcolor: '#997F6D',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#7a6554',
                  },
                }}
              >
                Добавить в друзья
              </Button>
            )}

            <Button
              href='/'
              variant='outlined'
              sx={{
                color: '#997F6D',
                borderColor: '#997F6D',
                '&:hover': {
                  backgroundColor: 'rgba(153, 127, 109, 0.1)',
                  borderColor: '#7a6554',
                },
              }}
              startIcon={<Home />}
            >
              Главная
            </Button>
          </Stack>
        </Box>

        {/* Правая часть - информация о пользователе  */}
        <Paper
          sx={{
            flex: 1,
            p: 3,
            backgroundColor: '#FFF9F2',
            borderRadius: 2,
            width: { xs: '100%', md: '70%' },
          }}
        >
          <Typography variant='h4' sx={{ mb: 2 }}>
            {profileUser.name} {profileUser.lastName}
          </Typography>

          <Typography>
            <strong>Email:</strong> {profileUser.email}
          </Typography>
          <Typography>
            <strong>Дата рождения:</strong>{' '}
            {new Date(profileUser.dateOfBirth).toLocaleDateString('ru-RU')}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography>
            <strong>О себе:</strong>
          </Typography>
          <Typography paragraph sx={{ mt: 1 }}>
            {profileUser.info}
          </Typography>
        </Paper>
      </Box>
      {/* Лента постов */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 800 }}>
          {posts.map((post) => (
            <PostWithData key={post.id} post={post} currentUser={currentUser} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfilePage;
