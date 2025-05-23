import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Send } from '@mui/icons-material';

interface MessageInputProps {
  onSend: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        fullWidth
        variant='outlined'
        placeholder='Написать сообщение...'
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button
        variant='contained'
        startIcon={<Send />}
        onClick={handleSubmit}
        sx={{
          bgcolor: '#997F6D',
          '&:hover': { bgcolor: '#7a6554' },
          height: 56,
        }}
      >
        Отправить
      </Button>
    </Box>
  );
};

export default MessageInput;
