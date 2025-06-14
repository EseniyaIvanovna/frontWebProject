/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  Stack,
  CircularProgress,
  Button,
  Alert,
  Skeleton,
} from '@mui/material';
import { Send, PersonRemove, Home } from '@mui/icons-material';
import Header from '../components/header';
import { useGetUserByIdQuery, useUserInfoQuery } from '../api/userApiSlice';
import {
  useGetInteractionByUserIdQuery,
  useRemoveInteractionMutation,
} from '../api/interactionApiSlice';
import { useGetPostsByUserQuery } from '../api/postApiSlice';

interface FriendData {
  id: number;
  name: string;
  lastName: string;
  postCount: number;
  isLoading: boolean;
  error?: boolean;
}

const FriendsPage = () => {
  const { data: currentUser } = useUserInfoQuery({});
  const {
    data: interactions = [],
    isLoading: isInteractionsLoading,
    refetch: refetchInteractions,
  } = useGetInteractionByUserIdQuery(
    { id: currentUser?.id || 0 },
    { skip: !currentUser?.id }
  );

  const [removeInteraction] = useRemoveInteractionMutation();
  const [friends, setFriends] = useState<FriendData[]>([]);

  const friendIds = useMemo(() => {
    if (!currentUser?.id) return [];
    return interactions.map((interaction) =>
      interaction.user1Id === currentUser.id
        ? interaction.user2Id
        : interaction.user1Id
    );
  }, [interactions, currentUser?.id]);

  const FriendItem = ({ friendId }: { friendId: number }) => {
    const {
      data: userData,
      isLoading: isUserLoading,
      error: userError,
    } = useGetUserByIdQuery({ id: friendId });
    const {
      data: posts = [],
      isLoading: isPostsLoading,
      error: postsError,
    } = useGetPostsByUserQuery({ id: friendId });

    const handleRemove = async () => {
      const interaction = interactions.find(
        (i) =>
          (i.user1Id === currentUser?.id && i.user2Id === friendId) ||
          (i.user1Id === friendId && i.user2Id === currentUser?.id)
      );

      if (interaction?.id) {
        await removeInteraction(interaction.id).unwrap();
        refetchInteractions();
      }
    };

    if (userError || postsError) {
      return (
        <ListItem sx={{ px: 0 }}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: '#FF6B6B', width: 56, height: 56 }}>
              !
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary='Ошибка загрузки'
            secondary='Не удалось загрузить данные'
            sx={{ ml: 2 }}
          />
        </ListItem>
      );
    }

    if (isUserLoading || isPostsLoading) {
      return (
        <ListItem sx={{ px: 0 }}>
          <ListItemAvatar>
            <Skeleton variant='circular' width={56} height={56} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton width={150} />}
            secondary={<Skeleton width={100} />}
            sx={{ ml: 2 }}
          />
        </ListItem>
      );
    }

    return (
      <ListItem
        sx={{ px: 0, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.02)' } }}
        secondaryAction={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant='outlined'
              startIcon={<PersonRemove />}
              onClick={handleRemove}
              sx={{ color: 'error.main', borderColor: 'error.main' }}
            >
              Удалить
            </Button>
          </Box>
        }
      >
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: '#997F6D',
              width: 56,
              height: 56,
              fontSize: '1.5rem',
            }}
          >
            {userData?.name?.charAt(0) || '?'}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              component={Link}
              to={`/profile/${friendId}`}
              sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 500 }}
            >
              {userData?.name} {userData?.lastName}
            </Typography>
          }
          secondary={`Постов: ${posts?.length || 0}`}
          sx={{ ml: 2 }}
        />
      </ListItem>
    );
  };

  if (!currentUser) {
    return (
      <Box p={3}>
        <Alert severity='error'>Не удалось загрузить данные пользователя</Alert>
        <Button component={Link} to='/' sx={{ mt: 2 }}>
          На главную
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFD3B6' }}>
      <Header />
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
          mt: 4,
        }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ mb: 3 }}
        >
          <Typography
            variant='h4'
            sx={{ color: '#997F6D', fontWeight: 'bold' }}
          >
            Мои друзья ({friendIds.length})
          </Typography>
          <IconButton
            component={Link}
            to='/'
            sx={{
              color: '#997F6D',
              '&:hover': { backgroundColor: 'rgba(153, 127, 109, 0.1)' },
            }}
          >
            <Home fontSize='large' />
          </IconButton>
        </Stack>

        {isInteractionsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress size={60} />
          </Box>
        ) : friendIds.length === 0 ? (
          <Typography sx={{ textAlign: 'center', py: 4 }}>
            У вас пока нет друзей
          </Typography>
        ) : (
          <List sx={{ width: '100%' }}>
            {friendIds.map((friendId, index) => (
              <React.Fragment key={friendId}>
                <FriendItem friendId={friendId} />
                {index < friendIds.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default FriendsPage;
