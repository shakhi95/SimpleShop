//
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FC, PropsWithChildren } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({ palette: { mode: 'dark' }, typography: { button: { textTransform: 'none' } } });

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default Provider;
