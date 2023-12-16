import Contact from '../views/pages/contact';
import Detail from '../views/pages/detail-post';
import FormPost from '../views/pages/post-form';
import Home from '../views/pages/home';
import Login from '../views/pages/login';
import Post from '../views/pages/post-page';
import Register from '../views/pages/register';
import Posted from '../views/pages/posted-page';

const routes = {
  '/': Home, // default page
  '/home': Home,
  '/post': Post,
  '/form': FormPost,
  '/searchpages': Posted,
  '/detail/:id': Detail,
  '/login': Login,
  '/register': Register,
  '/contact': Contact,
};

export default routes;
