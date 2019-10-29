<template>
  <v-data-table
    :headers="headers"
    :items="usuarios"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Usuarios</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-text-field class="text-xs-center" v-model="search" append-icon="search"
                    label="Busqueda" solo hide-details></v-text-field>
        <v-spacer></v-spacer>
        <!-- INICIO DIALOG -->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Usuario</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="nombre" label="Nombre del usuario"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select v-model="rol" :items="roles" label="Rol"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="contacto" label="Contacto del Usuario"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field type="password" v-model="password" label="Contraseña"></v-text-field>
                  </v-col>
                  <!-- Validacion -->
                  <v-col cols="12" sm="12" md="12" v-show="valida">
                    <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">
                    </div> 
                  </v-col>
                  <!-- Fin validacion -->
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="guardar">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="adModal" max-width="290">
          <v-card>
            <v-card-title class="headline" v-if="adAccion==1">
              Activar Usuario
            </v-card-title>
            <v-card-title class="headline" v-if="adAccion==2">
              Desactivar Usuario
            </v-card-title>
            <v-card-text>
              Estas a punto de <span v-if="adAccion==1">activar</span><span v-if="adAccion==2">desactivar</span>
              el al usuario {{adNombre}}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
               <v-btn @click="activarDesactivarCerrar()" color="dark darken-1" text large>
                  Cancelar
                </v-btn>
                <v-btn v-if="adAccion==1" @click="activar()" color="green darken-1" text large >
                  Activar
                </v-btn>
                <v-btn v-if="adAccion==2" @click="desactivar()" color="red darken-1" text large >
                  Desctivar
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- FIN DIALOG -->
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <template v-if="item.estado">
        <v-icon
            small
            @click="activarDesactivarMostrar(2,item)"
        >
            block
        </v-icon>    
      </template>
      <template v-else>
        <v-icon
            small
            @click="activarDesactivarMostrar(1,item)"
        >
            check
        </v-icon>    
      </template>    
    </template>
       <template v-slot:item.estado="{ item }">
          <div v-if="item.estado">
              <span class="green--text">Activo</span>
              <!-- <v-chip :color="getColor(item.estado)" dark>Activo</v-chip> -->
          </div>
          <div v-else>
              <span class="red--text">Inactivo</span>
              <!-- <v-chip :color="getColor(item.estado)" dark>Inactivo</v-chip> -->
          </div>
      </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="listar()">Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
  import axios from 'axios';
  export default {
    data: () => ({
      dialog: false,
      search:'',
      usuarios:[],
      headers: [
        { text: 'Actions', value: 'action', sortable: false },
        { text: 'Nombre', value: 'nombre',sortable: true  },
        { text: 'Rol', value: 'rol',sortable: true},
        { text: 'Contacto', value: 'contacto',sortable: false },
        { text: 'Email', value: 'email',sortable: false },
        { text: 'Estado', value: 'estado' },
      ],
      editedIndex: -1,
      _id:'',
      nombre:'',
      rol:'',
      roles:['Administrador','Asist_Social','Lector'],
      contacto:'',
      email:'',
      password:'',
      valida:0, //me va a determinar si los datos ingresados no son correctos
      validaMensaje:[],
      adModal:0, //gestionar el modal si desea activar o desactivar el registro
      adAccion:0, //dice que accion deseo realizar, si es 1 activar, si es 2 desactivar
      adNombre:'',//el nombre del proyecto que deseo activar o desactivar
      adId:'' //obtengo el id del proyecto que deseo activar o desactivar
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.listar()
    },

    methods: {
      listar(){
        let me = this;
        let header = {"Token": this.$store.state.token};
        let configuracion = {headers:header}; //headers --> S
        axios.get('usuario/list',configuracion).then(function (response) {
            // console.log(response);
            me.usuarios = response.data;
        }).catch(function (error) {
          console.log(error);
        });
      },

      limpiar(){
        this._id='';
        this.rol='';
        this.nombre='';
        this.contacto='';
        this.email='';
        this.password='';
        this.valida=0;
        this.validaMensaje=[];
        this.editedIndex=-1;
      },

      guardar(){
        let me = this;
        let header = {"Token": this.$store.state.token};
        let configuracion = {headers:header}; //headers --> S          
        if (this.validar()) {
          return;
        }
        if (this.editedIndex > -1) {
          //editar los datos del regisro
           axios.put('usuario/update',{
               '_id':this._id,
               'rol':this.rol, 
              'nombre':this.nombre, 
              'contacto':this.contacto, 
              'email': this.email,
              'password': this.password
        },configuracion)
          .then(function (response) {
            me.limpiar();
            me.close();
            me.listar();
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          //guardar un nuevo registro
          axios.post('usuario/add',{
              'rol':this.rol, 
              'nombre':this.nombre, 
              'contacto':this.contacto, 
              'email': this.email,
              'password': this.password
            },configuracion)
          .then(function (response) {
            me.limpiar();
            me.close();
            me.listar();
          }).catch(function (error) {
            console.log(error);
          });
        }
      },

      validar(){
        this.valida=0;
        this.validaMensaje=[];
        if (!this.rol) {
          this.validaMensaje.push('Selecione un rol');
        }
        if (this.nombre < 1 || this.nombre.length > 50) {
          this.validaMensaje.push('El nombre debe tener como maximo 50 caracteres');
        }
        if (this.email < 1 || this.email.length > 35) {
          this.validaMensaje.push('El email debe tener como maximo 35 caracteres');
        }
        if (this.password < 1 || this.password.length > 64) {
          this.validaMensaje.push('La contraseña debe tener entre 1 y 64 caracteres');
        }
        if (this.validaMensaje.length) {
          this.valida = 1;
        }
        return this.valida;
      },

      editItem (item) {
        this._id=item._id;
        this.rol=item.rol;
        this.nombre=item.nombre;
        this.contacto=item.contacto;
        this.email=item.email;
        this.password=item.password;
        this.dialog = true;
        this.editedIndex=1;
      },

     activarDesactivarMostrar(accion,item){
       this.adModal=1;
       this.adNombre=item.nombre;
       this.adId=item._id;
       if (accion ==1) {
         this.adAccion = 1;
       } else if (accion == 2) {
         this.adAccion = 2;
       } else {
         this.adModal=0;
       }
     },

     activar(){
       let me = this;
        let header = {"Token": this.$store.state.token};
        let configuracion = {headers:header}; //headers --> S
       axios.put('usuario/activate',{'_id':this.adId},configuracion)
          .then(function (response) {
            me.adModal=0;
            me.adAccion=0;
            me.adNombre='';
            me.adId='';
            me.listar();
          }).catch(function (error) {
            console.log(error);
          });
     },
     desactivar(){
       let me = this;
        let header = {"Token": this.$store.state.token};
        let configuracion = {headers:header}; //headers --> S
       axios.put('usuario/deactivate',{'_id':this.adId},configuracion)
          .then(function (response) {
            me.adModal=0;
            me.adAccion=0;
            me.adNombre='';
            me.adId='';
            me.listar();
          }).catch(function (error) {
            console.log(error);
          });
     },

      activarDesactivarCerrar(){
        this.adModal=0;
      },

      close () {
        this.dialog = false
      },

    },
  }
</script>