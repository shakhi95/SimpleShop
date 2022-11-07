//
const apiRoutes = {
  products: {
    getAll: 'products/getAll',
    getMyProducts: 'products/getMyProducts',
    createProduct: 'products/create',
    deleteProduct: 'products/delete',
    editProduct: 'products/edit',
    addToProduct: 'products/add-to-cart',
    removeProductFromCart: 'products/remove-from-cart',
    getMyCart: 'products/getMyCart',
    getMyCartAsPdf: 'products/getMyCartAsPdf',
  },
  auth: {
    checkToken: 'auth/check-token',
    signUp: 'auth/sign-up',
    signIn: 'auth/sign-in',
  },
};

export default apiRoutes;
