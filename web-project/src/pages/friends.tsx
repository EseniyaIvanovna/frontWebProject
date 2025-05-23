import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  Stack,
} from '@mui/material';
import { Send, PersonRemove, Home } from '@mui/icons-material';
import Header from '../components/header';

interface Friend {
  id: number;
  name: string;
  avatar: string;
  postCount: number;
}

const FriendsPage = () => {
  const friends: Friend[] = [
    {
      id: 1,
      name: 'Иван Иванов',
      avatar: '',
      postCount: 42,
    },
    {
      id: 2,
      name: 'Мария Петрова',
      avatar: '',
      postCount: 28,
    },
    {
      id: 3,
      name: 'Алексей Сидоров',
      avatar: '',
      postCount: 15,
    },
  ];

  const handleRemoveFriend = (friendId: number): void => {
    console.log('Удалить из друзей пользователя с id:', friendId);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FFD3B6',
      }}
    >
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
            sx={{
              color: '#997F6D',
              fontWeight: 'bold',
            }}
          >
            Мои друзья
          </Typography>

          <IconButton
            component={Link}
            to='/'
            sx={{
              color: '#997F6D',
              '&:hover': {
                backgroundColor: 'rgba(153, 127, 109, 0.1)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <Home fontSize='large' />
          </IconButton>
        </Stack>

        <List sx={{ width: '100%' }}>
          {friends.map((friend, index) => (
            <React.Fragment key={friend.id}>
              <ListItem
                sx={{
                  px: 0,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  },
                }}
                secondaryAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      component={Link}
                      to='/messages'
                      variant='outlined'
                      startIcon={<Send />}
                      sx={{
                        color: '#997F6D',
                        borderColor: '#997F6D',
                        '&:hover': {
                          borderColor: '#7a6554',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      Сообщение
                    </Button>
                    <Button
                      variant='outlined'
                      startIcon={<PersonRemove />}
                      onClick={() => handleRemoveFriend(friend.id)}
                      sx={{
                        color: 'error.main',
                        borderColor: 'error.main',
                        '&:hover': {
                          borderColor: 'error.dark',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        },
                      }}
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
                    {friend.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      component={Link}
                      to={`/profile/${friend.id}`}
                      sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: 500,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {friend.name}
                    </Typography>
                  }
                  secondary={`Постов: ${friend.postCount}`}
                  sx={{ ml: 2 }}
                />
              </ListItem>
              {index < friends.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default FriendsPage;
