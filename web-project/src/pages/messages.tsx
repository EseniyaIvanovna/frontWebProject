import React, { useState, useEffect } from 'react';
import { Box, IconButton, Avatar, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';
import Header from '../components/header';
import UserList from '../components/userList';
import MessageList from '../components/messageList';
import MessageInput from '../components/messageInput';
import { User } from '../api/models/user';
import { Message } from '../api/models/message';
import { UserRoles } from '../api/models/userRoles';

const MessagesPage = () => {
  // Заглушка текущего пользователя
  const [currentUser] = useState<User>({
    id: 1,
    name: 'Иван',
    lastName: 'Иванов',
    dateOfBirth: new Date(1990, 0, 1),
    info: 'Администратор системы',
    email: 'admin@example.com',
    photoAttachmentId: 1,
    role: UserRoles.Admin,
  });

  // Заглушка списка пользователей
  const [users] = useState<User[]>([
    {
      id: 2,
      name: 'Мария',
      lastName: 'Петрова',
      dateOfBirth: new Date(1992, 5, 15),
      info: 'Менеджер по продажам',
      email: 'maria@example.com',
      photoAttachmentId: 2,
      role: UserRoles.User,
    },
    {
      id: 3,
      name: 'Алексей',
      lastName: 'Сидоров',
      dateOfBirth: new Date(1985, 10, 20),
      info: 'Разработчик',
      email: 'alex@example.com',
      photoAttachmentId: 3,
      role: UserRoles.User,
    },
  ]);

  // Заглушка сообщений
  const [messages, setMessages] = useState<Record<number, Message[]>>({
    2: [
      {
        id: 1,
        senderId: 2,
        receiverId: 1,
        text: 'Добрый день! Есть вопросы по проекту',
        createdAt: new Date(Date.now() - 3600000),
      },
      {
        id: 2,
        senderId: 1,
        receiverId: 2,
        text: 'Какие именно вопросы?',
        createdAt: new Date(Date.now() - 1800000),
      },
    ],
    3: [
      {
        id: 3,
        senderId: 3,
        receiverId: 1,
        text: 'Готов протестировать новые функции',
        createdAt: new Date(Date.now() - 7200000),
      },
    ],
  });

  const [activeUser, setActiveUser] = useState<User | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setActiveUser(users[0]);
    }, 500);
  }, []);

  const handleSendMessage = (text: string) => {
    if (!activeUser || !text.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      senderId: currentUser.id,
      receiverId: activeUser.id,
      text,
      createdAt: new Date(),
    };

    setMessages((prev) => ({
      ...prev,
      [activeUser.id]: [...(prev[activeUser.id] || []), newMessage],
    }));
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFD3B6' }}>
      <Header />

      <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        {/* Левая колонка */}
        <Box
          sx={{
            width: 300,
            bgcolor: '#997F6D',
            color: 'white',
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          <IconButton
            href='/'
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'white',
              zIndex: 1,
            }}
          >
            <Home />
          </IconButton>

          <UserList
            users={users}
            activeUserId={activeUser?.id || 0}
            onUserSelect={(userId) => {
              const user = users.find((u) => u.id === userId);
              if (user) setActiveUser(user);
            }}
          />
        </Box>

        {/* Правая колонка */}
        {activeUser ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.paper',
            }}
          >
            {/* Шапка переписки */}
            <Box
              sx={{
                p: 2,
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ bgcolor: '#997F6D', mr: 2 }}>
                {activeUser.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant='h6'>
                  {activeUser.name} {activeUser.lastName}
                </Typography>
              </Box>
            </Box>

            {/* Список сообщений */}
            <MessageList
              messages={messages[activeUser.id] || []}
              currentUserId={currentUser.id}
            />

            {/* Ввод сообщения */}
            <MessageInput onSend={handleSendMessage} />
          </Box>
        ) : (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          ></Box>
        )}
      </Box>
    </Box>
  );
};

export default MessagesPage;
