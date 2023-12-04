import Contact from '../views/pages/contact';
import Detail from '../views/pages/detail-post';
import Edit from '../views/pages/edit';
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
  '/detail': Detail,
  '/login': Login,
  '/register': Register,
  '/contact': Contact,
  // eslint-disable-next-line no-dupe-keys
  '/register': Register,
  '/edit': Edit,
};

export default routes;
