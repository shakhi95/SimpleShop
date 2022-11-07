import { Button, CircularProgress, Grid } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import AXIOS from 'src/api/axios';
import { setAppAlert, useAppDispatch } from 'src/contexts/app';
import apiRoutes from 'src/routes/api';

interface Props {
  handleClose: (withReload: boolean) => void;
  data: ProductItem;
}

const DeleteProductModal = ({ handleClose, data }: Props) => {
  //
  const appDispatch = useAppDispatch();

  const { mutate, isLoading } = useMutation(submitDeleteProduct, {
    onSuccess: (apiResponse) => {
      if (apiResponse.isSuccess) handleClose(true);
      else appDispatch(setAppAlert({ isShown: true, message: apiResponse.error, mode: 'error' }));
    },
  });

  return (
    <Grid sx={{ width: '400px' }} container direction="column" justifyContent="center" alignItems="center" spacing={4}>
      <Grid item>Are you Sure Wanna Delete: {data.title}</Grid>
      <Grid item>
        <Button
          sx={{ mx: '5px' }}
          disabled={isLoading}
          color="secondary"
          variant="contained"
          onClick={() => mutate({ productId: data._id })}
        >
          Delete
          {isLoading && <CircularProgress sx={{ ml: '5px' }} color="secondary" size={14} />}
        </Button>
      </Grid>
    </Grid>
  );
};

type PostBody = {
  productId: string;
};

const submitDeleteProduct = async (postBody: PostBody) => {
  const { data } = await AXIOS.post<ApiResponse>(apiRoutes.products.deleteProduct, { ...postBody });
  return data;
};

export default DeleteProductModal;
