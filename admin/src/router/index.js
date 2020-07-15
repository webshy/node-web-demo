import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/categoryEdit'
import CategoryList from '../views/categoryList'

import ItemEdit from '../views/itemEdit'
import ItemList from '../views/itemList'

import HeroEdit from '../views/heroEdit'
import HeroList from '../views/heroList'

import ArticlesEdit from '../views/articlesEdit'
import ArticlesList from '../views/articlesList'

import AdEdit from '../views/adEdit'
import AdList from '../views/adList'

import AdminUserEdit from '../views/adminUserEdit'
import AdminUserList from '../views/adminUserList'




Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name:'login',
    component:Login,
    meta: { isPublic: true } 
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList },

      { path: '/items/create', component: ItemEdit },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/items/list', component: ItemList },

      { path: '/heros/create', component: HeroEdit },
      { path: '/heros/edit/:id', component: HeroEdit, props: true },
      { path: '/heros/list', component: HeroList },

      { path: '/articles/create', component: ArticlesEdit },
      { path: '/articles/edit/:id', component: ArticlesEdit, props: true },
      { path: '/articles/list', component: ArticlesList },

      { path: '/ads/create', component: AdEdit },
      { path: '/ads/edit/:id', component: AdEdit, props: true },
      { path: '/ads/list', component: AdList },

      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
      { path: '/admin_users/list', component: AdminUserList },


    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
const router = new VueRouter({
  routes
})

router.beforeEach((to, from ,next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
