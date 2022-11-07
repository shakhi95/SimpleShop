import { Button, CircularProgress, Divider, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AXIOS from 'src/api/axios';
import CustomModal from 'src/components/common/Modal';
import ProductCart from 'src/components/common/ProductCart';
import apiRoutes from 'src/routes/api';
import AddProductModal from './AddProductModal';
import DeleteProductModal from './DeleteProductModal';
import EditProductModal from './EditProductModal';

const MyProducts = () => {
  //
  const [openModal, setOpenModal] = React.useState<{ id: string; data: any }>({ id: '', data: {} });

  const { data, isFetching, isError, refetch } = useQuery(['products', 'mine'], getMyProducts);

  const handleClose = (withReload?: boolean) => {
    withReload && refetch();
    setOpenModal({ id: '', data: {} });
  };

  if (isError) return <div>Some Error Happened.</div>;
  if (isFetching || !data) return <CircularProgress />;

  return (
    <Grid container direction="column">
      <Grid item>
        <Button onClick={() => setOpenModal({ id: 'AddProduct', data: {} })} variant="outlined" color="success">
          Add a Products
        </Button>
      </Grid>
      <Grid item my="15px">
        <Divider />
      </Grid>
      <Grid item>
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
                <>
                  <Button
                    onClick={() => setOpenModal({ id: 'EditProduct', data: p })}
                    size="small"
                    color="warning"
                    variant="outlined"
                    sx={{ mx: '5px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => setOpenModal({ id: 'DeleteProduct', data: p })}
                    size="small"
                    color="error"
                    variant="outlined"
                    sx={{ mx: '5px' }}
                  >
                    Delete
                  </Button>
                </>
              }
            />
          );
        })}
        {data.length === 0 && 'No Data , Add Some'}
      </Grid>
      <CustomModal isOpen={openModal.id === 'AddProduct'} onClose={() => handleClose()}>
        <AddProductModal handleClose={handleClose} />
      </CustomModal>
      <CustomModal isOpen={openModal.id === 'DeleteProduct'} onClose={() => handleClose()}>
        <DeleteProductModal handleClose={handleClose} data={openModal.data} />
      </CustomModal>
      <CustomModal isOpen={openModal.id === 'EditProduct'} onClose={() => handleClose()}>
        <EditProductModal handleClose={handleClose} data={openModal.data} />
      </CustomModal>
    </Grid>
  );
};

const getMyProducts = async () => {
  const { data } = await AXIOS.get<ProductItem[]>(apiRoutes.products.getMyProducts);
  return data || [];
};

export default MyProducts;
