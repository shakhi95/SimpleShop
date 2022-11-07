import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import appRoutes from './routes/app';
import { setAppState, useAppDispatch, useAppValues } from './contexts/app';
import { useQuery } from '@tanstack/react-query';
import { checkTokenReq, transferFunctions } from './api/axios';

const App = () => {
  //
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const { appState } = useAppValues();

  useQuery(['TokenCheck'], checkTokenReq, {
    onSuccess: (result) => {
      appDispatch(setAppState(result ? 'LoggedIn' : 'LoggedOut'));
    },
  });

  useEffect(() => {
    transferFunctions(navigate, appDispatch);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {appRoutes
          .filter(({ renderFor }) => renderFor === 'All' || renderFor === appState)
          .map(({ component: Component, path }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
      </Route>
    </Routes>
  );
};

export default App;
