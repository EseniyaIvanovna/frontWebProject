import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Message } from '../api/models/message';

interface MessageItemProps {
  message: Message;
  currentUserId: number;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  currentUserId,
}) => {
  const isMe = message.senderId === currentUserId;

  return (
    <Box
      sx={{
        alignSelf: isMe ? 'flex-end' : 'flex-start',
        maxWidth: '70%',
        mb: 2,
      }}
    >
      <Paper
        sx={{
          p: 2,
          bgcolor: isMe ? '#FFD3B6' : 'white',
          borderLeft: isMe ? 'none' : '4px solid #997F6D',
          borderRight: isMe ? '4px solid #FFD3B6' : 'none',
          borderRadius: isMe ? '12px 12px 0 12px' : '0 12px 12px 12px',
          boxShadow: 1,
        }}
      >
        <Typography>{message.text}</Typography>
        <Typography
          variant='caption'
          sx={{
            display: 'block',
            textAlign: 'right',
            color: 'text.secondary',
            mt: 1,
          }}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MessageItem;
