import React from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { useAppValues } from 'src/contexts/app';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { unAuthorized } from 'src/api/axios';

const Header = () => {
  //
  const { appState } = useAppValues();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, mb: '40px' }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button color="inherit" sx={{ mx: '5px' }} onClick={() => navigate('/')}>
              All Product
            </Button>
            {appState === 'LoggedIn' && (
              <>
                <Button color="inherit" sx={{ mx: '5px' }} onClick={() => navigate('/my-products')}>
                  My Product
                </Button>
                <Button color="inherit" sx={{ mx: '5px' }} onClick={() => navigate('/my-cart')}>
                  My Cart
                </Button>
              </>
            )}
            <Button color="inherit" sx={{ mx: '5px' }} onClick={() => navigate('/contact-us')}>
              Contact Us
            </Button>
          </Box>

          {appState === 'LoggedOut' && (
            <>
              <Button variant="contained" color="info" sx={{ mx: '5px' }} onClick={() => navigate('/sign-up')}>
                Sign Up
              </Button>
              <Button variant="contained" color="info" sx={{ mx: '5px' }} onClick={() => navigate('/sign-in')}>
                Sign In
              </Button>
            </>
          )}
          {appState === 'LoggedIn' && (
            <>
              <Button variant="contained" color="info" sx={{ mx: '5px' }} onClick={() => unAuthorized()}>
                Sign Out
              </Button>
            </>
          )}
          {appState === 'Loading' && <CircularProgress color="warning" size={16} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
