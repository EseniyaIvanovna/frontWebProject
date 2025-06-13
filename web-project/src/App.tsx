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
import AuthProtected from './components/AuthProtected';
import { Provider } from 'react-redux';
import store from './store/store';
import RegisterPage from './pages/registration';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            {/* <Route path='/' element={<MainPage />} /> */}
            {/* <Route path='/profile' element={<ProfilePage />} /> */}
            <Route path='/profile/:userId' element={<UserProfile />} />
            <Route path='/login' element={<AuthPage />} />

            <Route path='/register' element={<RegisterPage />} />

            <Route element={<AuthProtected />}>
              <Route path='/' element={<MainPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/friends' element={<FriendsPage />} />
              <Route path='/messages' element={<MessagePage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
