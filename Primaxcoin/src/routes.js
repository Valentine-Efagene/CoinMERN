import NotFound from './NotFound.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import LogIn from './LogIn.jsx';
import UpdateDetails from './UpdateDetails.jsx';
import ContactAdd from './ContactAdd.jsx';
import ContactList from './ContactList.jsx';
import ContactUpdate from './ContactUpdate.jsx';
import Test from './Test.jsx';

const routes = [
  { path: '/home', component: Home },
  { path: '/test', component: Test },
  { path: '/about', component: About },
  { path: '/login', component: LogIn },
  { path: '/update', component: UpdateDetails },
  { path: '/contactadd', component: ContactAdd },
  { path: '/contacts', component: ContactList },
  { path: '/edit/:id', component: ContactUpdate },
  { path: '*', component: NotFound },
];

export default routes;
