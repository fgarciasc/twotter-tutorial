import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserProfile from '../views/UserProfile.vue'
import AdminProfile from '@/views/AdminProfile.vue'
import store from '@/store'
import { users } from '@/assets/users'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user/:userId',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminProfile,
    meta:{
      requiresAdmin: true
    }
  },
  
  // {
  //   path: '/about',
  //   name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach( async (to, from, next)=>{
  const user = store.state.User.user;

  if(!user){
    await store.dispatch('User/setUser', users[0]);
  }

  const isAdmin = false;
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if(requiresAdmin && !isAdmin){
    next({name: 'home'})
  }else{
    next()
  }
})

export default router
