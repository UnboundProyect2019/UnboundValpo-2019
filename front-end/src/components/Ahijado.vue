<template>
  <v-data-table
    :headers="headers"
    :items="ahijados"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Ahijados</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-text-field class="text-xs-center" v-model="search" append-icon="search"
          label="Busqueda" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <!-- INICIO DIALOG -->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Ahijado</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="nombre" label="Nombre"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="apellidos" label="Apellidos"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <v-select v-model="proyecto" :items="proyectos" label="Proyecto"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="fecha_nacimiento" label="Fecha de nacimiento"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="discapacidad" label="Discapcidad"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="nivel_educacional" label="Nivel educacional"></v-text-field>
                  </v-col>

                  <!-- VALIDACION DE MENSAJES -->
                  <v-col cols="12" sm="12" md="12" v-show="valida">
                    <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">
                    </div> 
                  </v-col>
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
              Activar Proyecto
            </v-card-title>
            <v-card-title class="headline" v-if="adAccion==2">
              Desactivar Proyecto
            </v-card-title>
            <v-card-text>
              Estas a punto de <span v-if="adAccion==1">activar</span><span v-if="adAccion==2">desactivar</span>
              el item {{adNombre}}
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
    <template v-slot:item.carta_agradecimiento="{ item }">
        <div v-if="item.carta_agradecimiento">
            <span class="green--text">Entregada</span>
            <!-- <v-chip :color="getColor(item.estado)" dark>Activo</v-chip> -->
        </div>
        <div v-else>
            <span class="red--text"> No Entregada</span>
            <!-- <v-chip :color="getColor(item.estado)" dark>Inactivo</v-chip> -->
        </div>
    </template>
    <template v-slot:item.carta_navidad="{ item }">
        <div v-if="item.carta_navidad">
            <span class="green--text">Entregada</span>
            <!-- <v-chip :color="getColor(item.estado)" dark>Activo</v-chip> -->
        </div>
        <div v-else>
            <span class="red--text"> No Entregada</span>
            <!-- <v-chip :color="getColor(item.estado)" dark>Inactivo</v-chip> -->
        </div>
    </template>
    <template v-slot:item.carta_invierno="{ item }">
        <div v-if="item.carta_invierno">
            <span class="green--text">Entregada</span>
            <!-- <v-chip :color="getColor(item.estado)" dark>Activo</v-chip> -->
        </div>
        <div v-else>
            <span class="red--text"> No Entregada</span>
            <!-- <v-chip :color="getColor(item.estado)" dark>Inactivo</v-chip> -->
        </div>
    </template>
    <template v-slot:item.data="{ item }">
        <v-btn>datos</v-btn>
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
      ahijados:[],
      headers: [
        { text: 'Actions', value: 'action', sortable: false },
        { text: 'Proyecto', value: 'proyecto.nombre_proyecto', sortable: false },
        { text: 'Estado', value: 'estado',sortable: false }, 
        { text: 'Nombre', value: 'nombre',sortable: true  },
        { text: 'Apellidos', value: 'apellidos' ,sortable: true },
        { text: 'Carta Agradecimiento', value: 'carta_agradecimiento',sortable: false },
        { text: 'Carta Navidad', value: 'carta_navidad',sortable: false },
        { text: 'Carta Invierno', value: 'carta_invierno',sortable: false },
        { text: 'Datos', value: 'data',sortable: false },
      ],
      editedIndex: -1,
      _id:'',
      proyecto:'',
      proyectos: [],
      nombre:'',
      apellidos:'',
      fecha_nacimiento:'',
      discapacidad:'',
      nivel_educacional:'',
      valida:0, //me va a determinar si los datos ingresados no son correctos
      validaMensaje:[],
      adModal:0, //gestionar el modal si desea activar o desactivar el registro
      adAccion:0, //dice que accion deseo realizar, si es 1 activar, si es 2 desactivar
      adNombre:'',//el nombre del proyecto que deseo activar o desactivar
      adId:'' //obtengo el id del proyecto que deseo activar o desactivar
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Ahijado' : 'Editar Ahijado'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.listar();
      this.selectProyecto();
    },

    methods: {
      selectProyecto(){ //hacer disponible para asist social
        let me = this;
        let proyectoArray =[];
        let header = {"Token": this.$store.state.token};
        let configuracion = {headers:header}; //headers --> S
        axios.get('proyecto/list',configuracion).then(function (response) { //OJO
            // console.log(response);
            proyectoArray = response.data;
            proyectoArray.map(function (x) {
                me.proyectos.push({text:x.nombre_proyecto, value:x._id});
            })
        }).catch(function (error) {
          console.log(error);
        });
      },
      listar(){
        let me = this;
        let header = {"Token": this.$store.state.token};
        let configuracion = {headers:header}; //headers --> S
        axios.get('ahijado/list',configuracion).then(function (response) {
            // console.log(response);
            me.ahijados = response.data;
        }).catch(function (error) {
          console.log(error);
        });
      },

      limpiar(){
        this._id='';
        this.proyecto='';
        this.nombre='';
        this.apellidos='';
        this.fecha_nacimiento='';
        this.discapacidad='';
        this.nivel_educacional='';
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
           axios.put('ahijado/update',{
              '_id':this._id,
              'proyecto':this.proyecto, 
              'nombre': this.nombre,
              'apellidos': this.apellidos,
              'fecha_nacimiento': this.fecha_nacimiento,
              'discapacidad': this.discapacidad,
              'nivel_educacional': this.nivel_educacional
            
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
          axios.post('ahijado/add',{
              'proyecto':this.proyecto, 
              'nombre': this.nombre,
              'apellidos': this.apellidos,
              'fecha_nacimiento': this.fecha_nacimiento,
              'discapacidad': this.discapacidad,
              'nivel_educacional': this.nivel_educacional
            
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
        if (!this.proyecto) {
            this.validaMensaje.push('Seleccione un proyecto'); 
        }
        if (this.nombre < 1 || this.nombre.length > 60) {
          this.validaMensaje.push('El nombre del ahijado debe tener entre 1 y 60 caracteres');
        }
        if (this.apellidos < 1 || this.apellidos.length > 100) {
          this.validaMensaje.push('El apellido del ahijado debe tener entre 1 y 100 caracteres');
        }
         if (this.fecha_nacimiento < 1) {
          this.validaMensaje.push('La fecha de nacimiento es obligatoria');
        }
        if (this.validaMensaje.length) {
          this.valida = 1;
        }
        return this.valida;
      },

      editItem (item) {
        this._id=item._id;
        this.proyecto=item.proyecto._id;
        this.nombre=item.nombre;
        this.apellidos=item.apellidos;
        this.fecha_nacimiento=item.fecha_nacimiento;
        this.discapacidad=item.discapacidad;
        this.nivel_educacional=item.nivel_educacional;
        this.dialog = true;
        this.editedIndex=1;
      },

     activarDesactivarMostrar(accion,item){
       this.adModal=1;
       this.adNombre=item.nombre_proyecto;
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
       axios.put('proyecto/activate',{'_id':this.adId},configuracion)
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
       axios.put('proyecto/deactivate',{'_id':this.adId},configuracion)
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