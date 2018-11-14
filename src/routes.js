import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Secret from './components/Secret'
import EventDetail from './components/EventDetail'
import Page404 from './components/404'

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/about',
    component: About,
    exact: true
  },
  {
    path: '/contact',
    component: Contact,
    exact: true
  },
  {
    path: '/secret',
    component: Secret,
    exact: true
  },
  {
    path: '/event/:slug',
    component: EventDetail,
    exact: true
  },
  {
    path: '/notfound',
    component: Page404,
    exact: true
  }
]
