import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './theme';
import MainPage from './pages/main';
import ProfilePage from './pages/profile';
import UserProfile from './pages/userProfile';
import AuthPage from './pages/login';
import FriendsPage from './pages/friends';
import MessagePage from './pages/messages';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/profile/:userId' element={<UserProfile />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/friends' element={<FriendsPage />} />
          <Route path='/messages' element={<MessagePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
