import Page404 from 'src/pages/404';
import ContactUs from 'src/pages/ContactUs';
import HomePage from 'src/pages/Home';
import MyCart from 'src/pages/MyCart';
import MyProducts from 'src/pages/MyProducts';
import SignIn from 'src/pages/SignIn';
import SignUp from 'src/pages/SignUp';

//
const appRoutes: {
  path: string;
  component: () => JSX.Element;
  renderFor: 'All' | 'LoggedIn' | 'LoggedOut';
}[] = [
  {
    path: '/',
    component: HomePage,
    renderFor: 'All',
  },
  {
    path: '/my-products',
    component: MyProducts,
    renderFor: 'LoggedIn',
  },
  {
    path: '/my-cart',
    component: MyCart,
    renderFor: 'LoggedIn',
  },
  {
    path: '/sign-up',
    component: SignUp,
    renderFor: 'LoggedOut',
  },
  {
    path: '/sign-in',
    component: SignIn,
    renderFor: 'LoggedOut',
  },
  {
    path: '/contact-us',
    component: ContactUs,
    renderFor: 'All',
  },
  {
    path: '*',
    component: Page404,
    renderFor: 'All',
  },
];

export default appRoutes;
