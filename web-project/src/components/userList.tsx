import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  ListItemButton,
} from '@mui/material';
import { User } from '../api/models/user';

interface UserListProps {
  users: User[];
  activeUserId: number;
  onUserSelect: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  activeUserId,
  onUserSelect,
}) => {
  return (
    <>
      <Typography variant='h6' sx={{ p: 2, color: 'white' }}>
        Сообщения
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem
            key={user.id}
            disablePadding
            sx={{
              bgcolor: activeUserId === user.id ? 'white' : 'transparent',
              color: activeUserId === user.id ? '#997F6D' : 'white',
              '&:hover': {
                bgcolor:
                  activeUserId === user.id
                    ? 'white'
                    : 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <ListItemButton onClick={() => onUserSelect(user.id)}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor:
                      activeUserId === user.id
                        ? '#997F6D'
                        : 'rgba(255, 255, 255, 0.2)',
                    color: activeUserId === user.id ? 'white' : 'inherit',
                  }}
                ></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${user.name} ${user.lastName}`}
                secondary={
                  <Typography
                    component='span'
                    sx={{
                      color:
                        activeUserId === user.id
                          ? '#997F6D'
                          : 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.875rem',
                    }}
                  ></Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default UserList;
