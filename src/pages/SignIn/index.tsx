import { Button, Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AXIOS, { setAuthorizeData } from 'src/api/axios';
import apiRoutes from 'src/routes/api';
import { useNavigate } from 'react-router-dom';
import { setAppAlert, useAppDispatch } from 'src/contexts/app';

const defaultValues = {
  email: '',
  password: '',
};

const SignIn = () => {
  //
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const [formValues, setFormValues] = useState(defaultValues);

  const { mutate, isLoading } = useMutation(submitSignInReq, {
    onSuccess: (apiResponse) => {
      if (apiResponse.isSuccess) setAuthorizeData(apiResponse.token);
      else appDispatch(setAppAlert({ isShown: true, message: apiResponse.error, mode: 'error' }));
    },
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (isLoading) return;
    mutate(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <Grid item>
          <TextField
            name="email"
            label="Email"
            type="text"
            value={formValues.email}
            onChange={handleInputChange}
            sx={{ width: '300px' }}
          />
        </Grid>
        <Grid item>
          <TextField
            name="password"
            label="Password"
            type="password"
            value={formValues.password}
            onChange={handleInputChange}
            sx={{ width: '300px' }}
          />
        </Grid>

        <Grid item>
          <Button disabled={isLoading} color="primary" variant="contained" type="submit">
            Sign In
            {isLoading && <CircularProgress sx={{ ml: '5px' }} color="secondary" size={14} />}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

type PostBody = {
  email: string;
  password: string;
};

type Response = ApiResponse & {
  token: string;
};

const submitSignInReq = async (postBody: PostBody) => {
  const { data } = await AXIOS.post<Response>(apiRoutes.auth.signIn, { ...postBody });
  return data;
};

export default SignIn;
