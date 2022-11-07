import { Card, CardContent, CardMedia, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { baseURL } from 'src/api/axios';

interface Props extends Omit<ProductItem, '_id' | 'owner'> {
  cartActions: JSX.Element;
  owner: string;
}

const ProductCart: React.FC<Props> = ({
  cartActions = <></>,
  description = '-',
  image = '',
  price = '00',
  title = '-',
  owner,
  createdAt,
}) => {
  //
  return (
    <Card sx={{ display: 'flex', mb: '20px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto', width: '75%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Grid container justifyContent={'space-between'} alignItems="center">
            <Typography component="div" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" component="div">
              ${price}
            </Typography>
          </Grid>
          <Grid mb="8px" container justifyContent={'space-between'} alignItems="center">
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {owner}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" component="div">
              {new Date(createdAt).toTimeString().slice(0, 9)}
            </Typography>
          </Grid>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {description}
          </Typography>
        </CardContent>
        <Divider sx={{ my: '5px' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>{cartActions}</Box>
      </Box>
      <CardMedia component="img" sx={{ width: '25%', height: 200 }} image={baseURL + image} alt={title} />
    </Card>
  );
};

export default ProductCart;
