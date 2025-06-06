/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Avatar,
  Typography,
  Divider,
  IconButton,
  TextField,
  Modal,
  Stack,
  CircularProgress,
} from '@mui/material';
import { Add, Edit, Home, Save, Cancel } from '@mui/icons-material';
import Header from '../components/header';
import ProfilePost from '../components/ProfilePost';
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostsByUserQuery,
} from '../api/postApiSlice';
import { useUpdateUserMutation, useUserInfoQuery } from '../api/userApiSlice';

const ProfilePage = () => {
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch: refetchUser,
  } = useUserInfoQuery({});

  const {
    data: posts = [],
    isLoading: isPostsLoading,
    isError: isPostsError,
    refetch: refetchPosts,
  } = useGetPostsByUserQuery({ id: userData?.id || 0 }, { skip: !userData });

  const [updateUser] = useUpdateUserMutation();

  const [createPost] = useCreatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const [editData, setEditData] = useState({
    name: '',
    lastName: '',
    dateOfBirth: new Date(),
    email: '',
    info: '',
    photo: null as File | null,
    photoUrl: '',
  });

  const [newPostText, setNewPostText] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Заполняем данные пользователя при загрузке
  useEffect(() => {
    if (userData) {
      setEditData({
        name: userData.name,
        lastName: userData.lastName,
        dateOfBirth: new Date(userData.dateOfBirth),
        email: userData.email,
        info: userData.info || 'Пользователь пока ничего не рассказал о себе',
        photo: null,
        photoUrl: userData.photoAttachmentUrl || '',
      });
    }
  }, [userData]);

  // Обработчики событий
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setEditData((prev) => ({
        ...prev,
        photo: file,
        photoUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData((prev) => ({ ...prev, dateOfBirth: new Date(e.target.value) }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateUser({
        name: editData.name,
        lastName: editData.lastName,
        dateOfBirth: editData.dateOfBirth.toISOString(),
        info: editData.info,
        photoAttachmentUrl: editData.photoUrl,
      }).unwrap();

      setIsEditModalOpen(false);
      refetchUser();
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
    }
  };
  const handleAddPost = async () => {
    if (!newPostText.trim() || !userData) return;

    try {
      await createPost({
        userId: userData.id,
        text: newPostText,
      }).unwrap();
      setNewPostText('');
      refetchPosts();
    } catch (error) {
      console.error('Ошибка при создании поста:', error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost(postId).unwrap();
      refetchPosts();
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
    }
  };

  const handleLike = (postId: number) => {
    // Реализуйте логику лайков, если есть соответствующий API
    console.log('Like post:', postId);
  };

  if (isUserLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isUserError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography color='error'>Не удалось загрузить профиль</Typography>
      </Box>
    );
  }
  if (isPostsError)
    return <Typography color='error'>Ошибка загрузки постов</Typography>;

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
        {/* Аватар */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              width: 150,
              height: 150,
              fontSize: '3rem',
              bgcolor: '#997F6D',
            }}
            src={editData.photoUrl}
          >
            {!editData.photoUrl &&
              `${editData.name.charAt(0)}${editData.lastName.charAt(0)}`}
          </Avatar>

          <Button
            href='/'
            variant='outlined'
            sx={{
              width: '100%',
              height: 56,
              minWidth: 0,
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
        </Box>

        {/* Данные пользователя */}
        <Paper
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: '#FFF9F2',
            borderRadius: 2,
            position: 'relative',
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: '#997F6D',
            }}
            onClick={() => setIsEditModalOpen(true)}
          >
            {/* добавить подгрузку фото пользователя*/}
            <Edit />
          </IconButton>

          <Typography variant='h4' sx={{ mb: 2 }}>
            {editData.name} {editData.lastName}
          </Typography>
          <Typography>
            <strong>Email:</strong> {editData.email}
          </Typography>
          <Typography>
            <strong>Дата рождения:</strong>{' '}
            {editData.dateOfBirth.toLocaleDateString('ru-RU')}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography>
            <strong>О себе:</strong>
          </Typography>
          <Typography paragraph sx={{ mt: 1, whiteSpace: 'pre-line' }}>
            {editData.info}
          </Typography>
        </Paper>
      </Box>

      {/* Форма добавления поста */}
      <Box sx={{ px: 4, mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder='Что у вас нового?'
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          sx={{ mb: 2, backgroundColor: 'white', borderRadius: 1 }}
        />
        <Button
          fullWidth
          variant='contained'
          startIcon={<Add />}
          onClick={handleAddPost}
          disabled={!newPostText.trim()}
          sx={{ py: 2, bgcolor: '#997F6D', '&:hover': { bgcolor: '#7a6554' } }}
        >
          Опубликовать
        </Button>
      </Box>

      {/* Лента постов */}
      <Box sx={{ flexGrow: 1, px: 4, pb: 4 }}>
        {isPostsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : isPostsError ? (
          <Typography color='error' sx={{ textAlign: 'center' }}>
            Ошибка загрузки постов
          </Typography>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <ProfilePost
              key={post.id}
              post={{
                id: post.id,
                content: post.text,
                createdAt: new Date(post.createdAt).toLocaleString('ru-RU'),
                likes: 0,
                isLiked: false,
                comments: 0,
              }}
              onLike={() => console.log('Like')}
              onEdit={() => console.log('Edit')}
              onDelete={() => console.log('Delete')}
            />
          ))
        ) : (
          <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
            Пока нет постов
          </Typography>
        )}
      </Box>

      {/* Модальное окно редактирования */}
      {/* Модальное окно редактирования профиля */}
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 500 },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Typography variant='h6' component='h2' mb={2}>
            Редактировать профиль
          </Typography>

          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src={editData.photoUrl} sx={{ width: 80, height: 80 }} />
              <Button
                variant='contained'
                component='label'
                sx={{ bgcolor: '#997F6D', '&:hover': { bgcolor: '#7a6554' } }}
              >
                Загрузить фото
                <input
                  type='file'
                  hidden
                  accept='image/*'
                  onChange={handlePhotoChange}
                  ref={fileInputRef}
                />
              </Button>
            </Box>

            <TextField
              fullWidth
              label='Имя'
              name='name'
              value={editData.name}
              onChange={handleInputChange}
            />

            <TextField
              fullWidth
              label='Фамилия'
              name='lastName'
              value={editData.lastName}
              onChange={handleInputChange}
            />

            <TextField
              fullWidth
              label='Email'
              name='email'
              value={editData.email}
              onChange={handleInputChange}
            />

            <TextField
              fullWidth
              label='Дата рождения'
              type='date'
              InputLabelProps={{ shrink: true }}
              value={editData.dateOfBirth.toISOString().split('T')[0]}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  dateOfBirth: new Date(e.target.value),
                }))
              }
            />

            <TextField
              fullWidth
              label='О себе'
              name='info'
              value={editData.info}
              onChange={handleInputChange}
              multiline
              rows={4}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button
                variant='outlined'
                startIcon={<Cancel />}
                onClick={() => setIsEditModalOpen(false)}
              >
                Отмена
              </Button>
              <Button
                variant='contained'
                startIcon={<Save />}
                onClick={handleSaveChanges}
                sx={{ bgcolor: '#997F6D', '&:hover': { bgcolor: '#7a6554' } }}
              >
                Сохранить
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfilePage;
