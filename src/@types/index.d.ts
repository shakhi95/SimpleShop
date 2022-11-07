type ProductItem = {
  _id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  owner: { email: string };
  createdAt: string;
};

type ApiResponse = {
  isSuccess: boolean;
  error: string;
};
