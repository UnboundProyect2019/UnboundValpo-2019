import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router/index'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null, //added
    usuario:null,
    numero:11, //ejemplo
    itemStore: null,
    // idAhijado: null
  },
  mutations: {
    setToken(state, token){
      state.token=token;
    },
    setUsuario(state,usuario){
      state.usuario=usuario;
    },
    setAhijado(state,ahijado){ 
      state.itemStore = ahijado;
    },
    // setId(state,_id){
    //   state.idAhijado = _id;
    // }
  },
  actions: {
    guardarToken({commit},token){
      commit("setToken",token);
      commit("setUsuario",decode(token));
      localStorage.setItem("token",token);
    },
    autoLogin({commit}){
      let token = localStorage.getItem("token");
      if (token) {
        commit("setToken", token);
        commit("setUsuario", decode(token));
      }
      router.push({name:'home'});
    },
    salir({commit}){
      commit("setToken",null);
      commit("setUsuario",null);
      localStorage.removeItem("token");
      router.push({name:'login'});
    },
    obtenerAhijado({commit},item){ //revisar
      commit("setAhijado",item)
    },
  },
  modules: {
  }
})
