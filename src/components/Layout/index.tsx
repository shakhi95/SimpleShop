import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppValues } from 'src/contexts/app';
import SnakeBar from '../common/SnakeBar';
import Header from './Header';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { baseURL } from 'src/api/axios';

const Layout = () => {
  //
  const queryClient = useQueryClient();
  const { appState } = useAppValues();

  useEffect(() => {
    const socket = io(baseURL);
    socket.on('products-changed', () => {
      queryClient.invalidateQueries(['products', 'all']);
    });
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <Container maxWidth="md">{appState === 'Loading' ? <>App Is Loading ...</> : <Outlet />}</Container>
      <SnakeBar />
    </div>
  );
};

export default Layout;
