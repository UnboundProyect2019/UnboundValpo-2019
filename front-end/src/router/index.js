import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Proyecto from '../components/Proyecto.vue'
import Login from '../components/Login.vue'
import Usuario from '../components/Usuario.vue'
import Ahijado from '../components/Ahijado.vue'
import Egresado from '../components/Egresado.vue'
import Home from '../components/Home.vue'
import DatoAhijado from '../components/DatoAhijado'
import Padrino from '../components/Padrino'

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
  {
    path: '/ahijado',
    name: 'ahijado',
    component: Ahijado,
    meta: {
      administrador:true,
      lector:true,
      asist_social:true
    }
  },
  {
    path: '/egresado',
    name: 'egresado',
    component: Egresado,
    meta: {
      administrador:true,
      lector:true,
      asist_social:true
    }
  },
  {
    path: '/datoahijado',
    name: 'datoahijado',
    component: DatoAhijado,
    meta: {
      administrador:true,
      lector:true,
      asist_social:true
    }
  },
  {
    path: '/padrino',
    name: 'padrino',
    component: Padrino,
    meta: {
      administrador:true,
      lector:true,
      asist_social:true
    }
  }
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
