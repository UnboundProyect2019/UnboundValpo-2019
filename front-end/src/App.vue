<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="false" 
      :temporary="primaryDrawer.type === 'temporary'"
      v-if="logueado"
      app
      overflow
    >
    <template>
    <v-flex>
        <v-navigation-drawer permanent>
          <v-list >
            <v-list-item>
              <v-list-item-avatar>
                <!-- <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img> -->
              <v-avatar color="indigo">
                <v-icon dark>mdi-account-circle</v-icon>
              </v-avatar>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="title">Mostrar nombre del usuario</v-list-item-title>
                <v-list-item-title>Rol :Usuario</v-list-item-title>
                <v-list-item-subtitle>tenkla123@gmail.com</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon>mdi-menu-down</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <!-- LISTAS -->

          <v-list dense>

      
              <template v-if="esAdministrador || esLector || esAsistSocial">
                <v-list-item :to="{name:'home'}">
                  <v-list-item-action>
                    <v-icon>home</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                  <v-list-item-title>Inicio</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              
              <template v-if="esAdministrador"> 
                <v-list-item :to="{name:'proyecto'}">
                  <v-list-item-action>
                    <v-icon>mdi-star</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                  <v-list-item-title>Proyectos</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-if="esAdministrador">
                <v-list-item :to="{name:'usuario'}">
                  <v-list-item-action>
                    <v-icon>mdi-account-group-outline</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                  <v-list-item-title>Usuarios</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-if="esAdministrador || esLector || esAsistSocial">
                <v-list-item :to="{name:'ahijado'}">
                  <v-list-item-action>
                    <v-icon>mdi-folder</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                  <v-list-item-title>Ahijados</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-if="esAdministrador || esLector || esAsistSocial">
                <v-list-item :to="{name:'egresado'}">
                  <v-list-item-action>
                    <v-icon>mdi-check-circle</v-icon>
                  </v-list-item-action>
                  <v-list-item-content>
                  <v-list-item-title>Egresados</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>  
          </v-list>
          
          <template v-slot:append>
            <div class="pa-2">
              <v-btn block outlined @click="salir()" color="error">Salir</v-btn>
            </div>
          </template>
        </v-navigation-drawer>

    </v-flex>
    </template>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="primaryDrawer.clipped" app >
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Sistema de apadrinamientos</v-toolbar-title>
    </v-app-bar>

    <!-- CONTENIDO -->
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <!-- FIN CONTENIDO -->
    <!-- FOOTER -->
    <v-footer :inset="footer.inset" app>
      <span class="px-4">&copy; Fundacion Unbound Valparaiso - {{ new Date().getFullYear() }}</span>
    </v-footer>
    <!-- FIN FOOTER -->
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({
      drawers: true,
      primaryDrawer: {
        model: null,
        type: 'default (no property)',
        clipped: false,
        floating: false,
        mini: false,
      },
      footer: {
        inset: true,
      },
      item: 0,
      items: [
        { text: 'Home', icon: 'home', to:{name: 'home'} },
        { text: 'Proyectos', icon: 'mdi-star', to:{name: 'proyecto'} },
        { text: 'Usuarios', icon: 'mdi-account-group-outline', to:{name: 'proyecto'} },//mdi-folder mdi-check-circle mdi-history 
        { text: 'Ahijados', icon: 'mdi-folder', to:{name: 'proyecto'} },
        { text: 'Egresados', icon: 'mdi-check-circle', to:{name: 'proyecto'} },
      ],
    }),
    computed: {
      logueado(){
        return this.$store.state.usuario;
      },
      esAdministrador(){
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'Administrador' 
      },
      esLector(){
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'Lector' 
      },
      esAsistSocial(){
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'Asist_Social' 
      },
     
    },
    created() {
      this.$store.dispatch("autoLogin");
    },
    methods: {
     salir(){
       this.$store.dispatch("salir");
     } 
    },
  }
  // mdi-account-group-outline --> Usuarios mdi-account-multiple
</script>

