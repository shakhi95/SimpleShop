import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import AXIOS from 'src/api/axios';
import { setAppAlert, useAppDispatch } from 'src/contexts/app';
import apiRoutes from 'src/routes/api';
import { useState } from 'react';

interface Props {
  handleClose: (withReload: boolean) => void;
  data: ProductItem;
}

const EditProductModal = ({ handleClose, data }: Props) => {
  //
  const appDispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<{
    title: string;
    price: string;
    image: any;
    description: string;
  }>({
    title: data.title,
    price: String(data.price),
    image: '',
    description: data.description,
  });

  const { mutate, isLoading } = useMutation(submitEditProduct, {
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

    formData.append('productId', data._id);
    formData.append('title', formValues.title);
    formData.append('image', formValues.image);
    formData.append('price', formValues.price);
    formData.append('description', formValues.description);

    mutate(formData);
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
          <Button sx={{ mx: '5px' }} disabled={isLoading} color="warning" variant="contained" type="submit">
            Edit
            {isLoading && <CircularProgress sx={{ ml: '5px' }} color="secondary" size={14} />}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const submitEditProduct = async (formData: FormData) => {
  const { data } = await AXIOS.post<ApiResponse>(apiRoutes.products.editProduct, formData);
  return data;
};

export default EditProductModal;
