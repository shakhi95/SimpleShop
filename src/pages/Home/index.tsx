import { Button, CircularProgress } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axios';
import ProductCart from 'src/components/common/ProductCart';
import { setAppAlert, useAppDispatch, useAppValues } from 'src/contexts/app';
import apiRoutes from 'src/routes/api';

const HomePage = () => {
  //
  const appDispatch = useAppDispatch();
  const { appState } = useAppValues();
  const { data, isFetching, isError } = useQuery(['products', 'all'], getAllProduct);

  const { mutate, isLoading } = useMutation(addProductToCartReq, {
    onSuccess: (apiResponse) => {
      if (apiResponse.isSuccess) appDispatch(setAppAlert({ isShown: true, message: 'Added To Cart', mode: 'success' }));
      else appDispatch(setAppAlert({ isShown: true, message: 'SomeThing Went Wrong...', mode: 'error' }));
    },
  });

  if (isError) return <div>Some Error Happened.</div>;
  if (isFetching || !data) return <CircularProgress />;

  return (
    <div>
      {data.map((p) => {
        return (
          <ProductCart
            key={p._id}
            title={p.title}
            price={p.price}
            image={p.image}
            description={p.description}
            owner={p.owner.email}
            createdAt={p.createdAt}
            cartActions={
              <Button
                disabled={appState !== 'LoggedIn' || isLoading}
                size="small"
                variant="outlined"
                onClick={() => mutate(p._id)}
              >
                Add To Cart
              </Button>
            }
          />
        );
      })}
      {data.length === 0 && 'No Data , Add Some'}
    </div>
  );
};

const addProductToCartReq = async (productId: string) => {
  const { data } = await AXIOS.post<ApiResponse>(apiRoutes.products.addToProduct, { productId });
  return data;
};

const getAllProduct = async () => {
  const { data } = await AXIOS.get<ProductItem[]>(apiRoutes.products.getAll);
  return data || [];
};

export default HomePage;
