import { Button, Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AXIOS from 'src/api/axios';
import apiRoutes from 'src/routes/api';
import { faker } from '@faker-js/faker';
import { setAppAlert, useAppDispatch } from 'src/contexts/app';

interface Props {
  handleClose: (withReload: boolean) => void;
}

const defaultValues: {
  title: string;
  price: string;
  image: any;
  description: string;
} = {
  title: '',
  price: '',
  image: '',
  description: '',
};

const AddProductModal = ({ handleClose }: Props) => {
  //
  const appDispatch = useAppDispatch();
  const [formValues, setFormValues] = useState(defaultValues);

  const { mutate, isLoading } = useMutation(submitCreateProduct, {
    onSuccess: (apiResponse) => {
      if (apiResponse.isSuccess) handleClose(true);
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

    const formData = new FormData();

    formData.append('title', formValues.title);
    formData.append('image', formValues.image);
    formData.append('price', formValues.price);
    formData.append('description', formValues.description);

    mutate(formData);
  };

  const fillWithFaker = () => {
    setFormValues((preState) => ({
      ...preState,
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
        <Grid item>
          <TextField
            InputLabelProps={{ shrink: true }}
            name="title"
            label="Title"
            type="text"
            value={formValues.title}
            onChange={handleInputChange}
            sx={{ width: '400px' }}
          />
        </Grid>
        <Grid item>
          <TextField
            InputLabelProps={{ shrink: true }}
            name="price"
            label="Price"
            type="text"
            value={formValues.price}
            onChange={handleInputChange}
            sx={{ width: '400px' }}
          />
        </Grid>
        <Grid item>
          <TextField
            InputLabelProps={{ shrink: true }}
            name="image"
            label="Image"
            type="file"
            onChange={(e) => {
              // @ts-ignore
              const file: any = e.target.files[0];
              const acceptedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
              if (!acceptedTypes.includes(file.type)) {
                appDispatch(setAppAlert({ isShown: true, message: 'Image Format Not Ok', mode: 'error' }));
                return;
              }
              if (file.size > 5 * 1024 * 1024) {
                appDispatch(setAppAlert({ isShown: true, message: 'Image Size Not Ok : <5mb', mode: 'error' }));
                return;
              }
              setFormValues((preState) => ({ ...preState, image: file }));
            }}
            sx={{ width: '400px' }}
          />
        </Grid>
        <Grid item>
          <TextField
            InputLabelProps={{ shrink: true }}
            name="description"
            label="Description"
            type="text"
            value={formValues.description}
            onChange={handleInputChange}
            sx={{ width: '400px' }}
          />
        </Grid>
        <Grid item>
          <Button sx={{ mx: '5px' }} disabled={isLoading} color="primary" variant="contained" type="submit">
            Add Product
            {isLoading && <CircularProgress sx={{ ml: '5px' }} color="secondary" size={14} />}
          </Button>
          <Button sx={{ mx: '5px' }} disabled={isLoading} color="primary" variant="contained" onClick={fillWithFaker}>
            Fill !
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const submitCreateProduct = async (formData: FormData) => {
  const { data } = await AXIOS.post<ApiResponse>(apiRoutes.products.createProduct, formData);
  return data;
};

export default AddProductModal;
