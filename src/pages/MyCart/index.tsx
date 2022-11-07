import { Box, Button, Card, CardContent, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axios';
import { setAppAlert, useAppDispatch } from 'src/contexts/app';
import apiRoutes from 'src/routes/api';

const MyCart = () => {
  //
  const appDispatch = useAppDispatch();

  const { data, isError, isFetching, refetch } = useQuery(['my-cart'], fetchMyCart);
  const { refetch: fetchPdf } = useQuery(['my-cart', 'pdf'], fetchMyCartPdf, {
    enabled: false,
    onSuccess: (blobData) => {
      const url = URL.createObjectURL(blobData);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `YourCart-${new Date().getTime()}.pdf`);
      link.click();
    },
  });

  const { mutate, isLoading } = useMutation(removeProductToCartReq, {
    onSuccess: (apiResponse) => {
      if (apiResponse.isSuccess) {
        appDispatch(setAppAlert({ isShown: true, message: 'Removed From Cart', mode: 'success' }));
        refetch();
      } else appDispatch(setAppAlert({ isShown: true, message: 'SomeThing Went Wrong...', mode: 'error' }));
    },
  });

  if (isError) return <div>Some Error Happened.</div>;
  if (isFetching || !data) return <CircularProgress />;

  return (
    <Grid container direction="column">
      <Grid item>
        <Button disabled={data.length === 0} variant="outlined" color="warning" onClick={() => fetchPdf()}>
          DownLoad As Pdf !
        </Button>
      </Grid>
      <Grid item my="15px">
        <Divider />
      </Grid>
      <Grid item>
        {data.length > 0 && (
          <Card sx={{ display: 'flex', mb: '20px' }}>
            <CardContent sx={[{ width: '100%' }, { '&:last-child': { padding: '16px' } }]}>
              <Grid container alignItems="center">
                <Box sx={{ width: '40%' }}>
                  <Typography component="div" variant="subtitle2">
                    Title
                  </Typography>
                </Box>
                <Box sx={{ width: '20%', textAlign: 'center' }}>
                  <Typography variant="subtitle2" component="div">
                    Quantity
                  </Typography>
                </Box>
                <Box sx={{ width: '20%', textAlign: 'center' }}>
                  <Typography variant="subtitle2" component="div">
                    Price(One)
                  </Typography>
                </Box>
                <Box sx={{ width: '20%', textAlign: 'center' }}>
                  <Typography variant="subtitle2" component="div">
                    Actions
                  </Typography>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        )}
        {data.map((p) => {
          return (
            <Card sx={{ display: 'flex', mb: '15px' }}>
              <CardContent sx={[{ width: '100%' }, { '&:last-child': { padding: '10px' } }]}>
                <Grid container alignItems="center">
                  <Box sx={{ width: '40%' }}>
                    <Typography component="div" variant="subtitle2" color="text.secondary">
                      {p.product.title}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '20%', textAlign: 'center' }}>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                      {p.quantity}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '20%', textAlign: 'center' }}>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                      {p.product.price}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '20%', textAlign: 'center' }}>
                    <Button disabled={isLoading} color="error" onClick={() => mutate(p.product._id)}>
                      Delete
                    </Button>
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          );
        })}
        {data.length === 0 && 'No Data , Add Some'}
      </Grid>
    </Grid>
  );
};

type Response = {
  _id: string;
  quantity: number;
  product: {
    _id: string;
    title: string;
    price: number;
  };
};

const fetchMyCartPdf = async () => {
  const { data } = await AXIOS.get(apiRoutes.products.getMyCartAsPdf, { responseType: 'blob' });
  return data;
};

const removeProductToCartReq = async (productId: string) => {
  const { data } = await AXIOS.post<ApiResponse>(apiRoutes.products.removeProductFromCart, { productId });
  return data;
};

const fetchMyCart = async () => {
  const { data } = await AXIOS.get<Response[]>(apiRoutes.products.getMyCart);
  return data || [];
};

export default MyCart;
