import React from 'react';
import { Box } from '@mui/material';
import MessageItem from './messageItem';
import { Message } from '../api/models/message';

interface MessageListProps {
  messages: Message[];
  currentUserId: number;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        p: 2,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          currentUserId={currentUserId}
        />
      ))}
    </Box>
  );
};

export default MessageList;
