import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Proyecto from '../components/Proyecto.vue'
import Login from '../components/Login.vue'
import Usuario from '../components/Usuario.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{
      administrador:true,
      lector:true,
      asist_social:true
    }
  },
  {
    path: '/proyecto',
    name: 'proyecto',
    component: Proyecto,
    meta: {
      administrador: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      libre: true
    }
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: Usuario,
    meta: {
      administrador: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) =>{
  if (to.matched.some(record => record.meta.libre)) { //dando acceso a las rutas que tinene en su archivo "meta" = libre
    next();
  } else if (store.state.usuario && store.state.usuario.rol == 'Administrador') {
    if (to.matched.some(record => record.meta.administrador)) {
        next();
    }
  } else if (store.state.usuario && store.state.usuario.rol == 'Asist_Social') {
    if (to.matched.some(record => record.meta.asist_social)) {
      next();
    }
  } else if (store.state.usuario && store.state.usuario.rol == 'Lector') {
    if (to.matched.some(record => record.meta.lector)) {
      next();
    }
  } else {
    next({name:'login'});
  }
});

export default router
