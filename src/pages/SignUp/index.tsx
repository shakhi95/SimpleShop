import { Button, Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AXIOS from 'src/api/axios';
import apiRoutes from 'src/routes/api';
import { useNavigate } from 'react-router-dom';
import { setAppAlert, useAppDispatch } from 'src/contexts/app';

const defaultValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  //
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const [formValues, setFormValues] = useState(defaultValues);

  const { mutate, isLoading } = useMutation(submitSignUpReq, {
    onSuccess: (apiResponse) => {
      if (apiResponse.isSuccess) navigate('/sign-in');
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
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formValues.confirmPassword}
            onChange={handleInputChange}
            sx={{ width: '300px' }}
          />
        </Grid>
        <Grid item>
          <Button disabled={isLoading} color="primary" variant="contained" type="submit">
            Sign Up
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
  confirmPassword: string;
};

const submitSignUpReq = async (postBody: PostBody) => {
  const { data } = await AXIOS.post<ApiResponse>(apiRoutes.auth.signUp, { ...postBody });
  return data;
};

export default SignUp;
