import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function Header() {
  return (
    <AppBar
      position='static'
      sx={{ width: '100%', backgroundColor: '#997F6D' }}
    >
      <Toolbar>
        {/* Логотип */}
        <Typography
          variant='h6'
          sx={{
            flexGrow: 1,
            fontSize: '40px',
            fontWeight: 'bold',
            color: '#FFD3B6',
            userSelect: 'none',
          }}
        >
          DigiLog
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Поиск */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
              },
            }}
          >
            <InputBase
              placeholder='Поиск...'
              sx={{
                color: 'white',
                width: '200px',
                padding: '8px 12px',
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />
            <IconButton sx={{ color: 'white' }}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Кнопка выхода */}
          <Tooltip
            title='Выход'
            placement='bottom'
            arrow
            slotProps={{
              tooltip: {
                sx: {
                  bgcolor: 'rgba(0, 0, 0, 0.8)',
                  fontSize: '0.8rem',
                  borderRadius: '4px',
                  padding: '6px 12px',
                },
              },
              arrow: {
                sx: {
                  color: 'rgba(0, 0, 0, 0.8)',
                },
              },
            }}
          >
            <IconButton
              component={Link}
              to='/auth'
              sx={{
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
