<template>
  <v-data-table
    :headers="headers"
    :items="familias"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <template>
        <div>
          <v-tabs>
          <v-tab :to="{name:'ahijado'}">Ahijados</v-tab>
          <v-tab :to="{name:'egresado'}">Egresados</v-tab>
          <v-tab :to="{name:'familia'}">Familias</v-tab>
        </v-tabs>
        </div>
      </template>
      <v-toolbar flat color="white">
        <v-toolbar-title>Familias</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        
        <!-- <v-divider class="mx-4" inset vertical ></v-divider> -->
        <v-text-field class="text-xs-center" v-model="search" append-icon="search"
          label="Busqueda" solo hide-details></v-text-field>
        <v-spacer></v-spacer>
      </v-toolbar>




        <v-dialog v-model="dialog" max-width="600px">

          <v-card class="mx-auto">
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="ficha_familiar" label="Ficha familiar"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="nombre_familia" label="Nombre familia"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="padre" label="Nombre del padre"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="madre" label="Nombre de la madre"></v-text-field>
                  </v-col>
                  <v-divider></v-divider>
                  <h3>Informacio de egreso*</h3>
                  <v-col cols="12" sm="6" md="6">
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="arriendo" label="Arriendo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="agua" label="Agua"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="luz" label="Luz"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="gas" label="gas"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="movilizacion" label="Movilizacion"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="otro" label="otro"></v-text-field>
                  </v-col>

                  <v-divider></v-divider>
                  <h3>Totales*</h3>

                  <v-col cols="12" sm="6" md="6">
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="ingreso" label="Ingreso"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="egreso" label="Egreso"></v-text-field>
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
      




    </template>
    <!-- TEMPLATE ACTIONS -->
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
    </template>
    <!-- FIN TEMPLATE ACTIONS -->
    

    <template v-slot:item.data="{ item }">
      <v-btn>Integrantes</v-btn>
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
      familias:[],
      headers: [
        { text: 'Acciones', value: 'action', sortable: false },
        { text: 'Nombre familia', value: 'nombre_familia', sortable: false },
        { text: 'Padre', value: 'padre',sortable: false }, 
        { text: 'Madre', value: 'madre', sortable: false },
        { text: 'Ahijado', value: 'ahijado.nombre',sortable: true  },
        { text: 'Ficha Familiar', value: 'ficha_familiar',sortable: false },
        { text: 'Integrantes familiares', value: 'data',sortable: false },

        // { text: 'Carta Navidad', value: 'carta_navidad',sortable: false },
        // { text: 'Carta Invierno', value: 'carta_invierno',sortable: false },
        // { text: 'Datos', value: 'data',sortable: false },
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
      adId:'', //obtengo el id del proyecto que deseo activar o desactivar
      
      adModalCA:0,
      adAccionCA:'',
      adIdCA:'',

      adModalCN:0,
      adAccionCN:'',
      adIdCN:'',

      adModalCI:0,
      adAccionCI:'',
      adIdCI:'',
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Familia' : 'Editar Familia'
      },
      esAdministrador(){
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'Administrador' 
      },
      esAsistSocial(){
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'Asist_Social' 
      },
      esLector(){
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'Lector' 
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
        axios.get('familia/list',configuracion).then(function (response) {
            // console.log(response);
            me.familias = response.data;
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

        if (this.editedIndex > -1) {
          //editar los datos del regisro
           axios.put('familia/update',{

             '_id':this._id,
            'ficha_familiar':this.ficha_familiar, 
            'nombre_familia':this.nombre_familia,
            'padre':this.padre,
            'madre':this.madre,
            'ingresos':this.ingresos,
            'total':this.total,
            'alimentacion': this.alimentacion,
            'arriendo': this.arriendo,
            'luz': this.luz,
            'agua': this.agua,
            'gas': this.gas,
            'movilizacion':this.movilizacion,
            'otro':this.otro,
            
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
        this.ficha_familiar=item.ficha_familiar;
        this.nombre_familia=item.nombre_familia;
        this.padre=item.padre;
        this.madre=item.madre;
        this.ingresos=item.ingresos;
        this.total=item.total;
        this.alimentacion=item.alimentacion;
        this.arriendo=item.arriendo;
        this.luz=item.luz;
        this.agua=item.agua;
        this.gas=item.gas;
        this.movilizacion=item.movilizacion;
        this.otro=item.otro;
        this.editedIndex=1;
        this.dialog = true;

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

    activarDesactivarMostrarCA(accion,item){
      this.adModalCA=1;
      // this.adNombre=item.nombre;
      this.adIdCA=item._id;
      if (accion ==1) {
        this.adAccionCA = 1;
      } else if (accion == 2) {
        this.adAccionCA = 2;
      } else {
        this.adModalCA=0;
      }
    }, 

    activarDesactivarMostrarCN(accion,item){
      this.adModalCN=1;
      // this.adNombre=item.nombre;
      this.adIdCN=item._id;
      if (accion ==1) {
        this.adAccionCN = 1;
      } else if (accion == 2) {
        this.adAccionCN = 2;
      } else {
        this.adModalCN=0;
      }
    }, 

    activarDesactivarMostrarCI(accion,item){
      this.adModalCI=1;
      // this.adNombre=item.nombre;
      this.adIdCI=item._id;
      if (accion ==1) {
        this.adAccionCI = 1;
      } else if (accion == 2) {
        this.adAccionCI = 2;
      } else {
        this.adModalCI=0;
      }
    }, 

    activar(){
      let me = this;
      let header = {"Token": this.$store.state.token};
      let configuracion = {headers:header}; //headers --> S
      axios.put('ahijado/activate',{'_id':this.adId},configuracion)
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
 
    activate_carta_agradecimiento(){
      let me = this;
      let header = {"Token": this.$store.state.token};
      let configuracion = {headers:header}; //headers --> S
      axios.put('ahijado/activateca',{'_id':this.adIdCA},configuracion)
      .then(function (response) {
        me.adModalCA=0;
        me.adAccionCA=0;
        // me.adNombre='';
        me.adIdCA='';
        me.listar();
      }).catch(function (error) {
        console.log(error);
      });
    },

    activate_carta_navidad(){
      let me = this;
      let header = {"Token": this.$store.state.token};
      let configuracion = {headers:header}; //headers --> S
      axios.put('ahijado/activatecn',{'_id':this.adIdCN},configuracion)
      .then(function (response) {
        me.adModalCN=0;
        me.adAccionCN=0;
        // me.adNombre='';
        me.adIdCN='';
        me.listar();
      }).catch(function (error) {
        console.log(error);
      });
    },

    activate_carta_invierno(){
      let me = this;
      let header = {"Token": this.$store.state.token};
      let configuracion = {headers:header}; //headers --> S
      axios.put('ahijado/activateci',{'_id':this.adIdCI},configuracion)
      .then(function (response) {
        me.adModalCI=0;
        me.adAccionCI=0;
        // me.adNombre='';
        me.adIdCI='';
        me.listar();
      }).catch(function (error) {
        console.log(error);
      });
    },

    desactivar(){
      let me = this;
      let header = {"Token": this.$store.state.token};
      let configuracion = {headers:header}; //headers --> S
      axios.put('ahijado/deactivate',{'_id':this.adId},configuracion)
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

    deactivate_carta_agradecimiento(){
      let me = this;
      let header = {"Token": this.$store.state.token};
      let configuracion = {headers:header}; //headers --> S
      axios.put('ahijado/deactivateca',{'_id':this.adIdCA},configuracion)
      .then(function (response) {
        me.adModalCA=0;
        me.adAccionCA=0;
        // me.adNombre='';
        me.adIdCA='';
        me.listar();
      }).catch(function (error) {
        console.log(error);
      });
    },

    deactivate_carta_navidad(){
      let me = this;
      let header = {"Token": this.$store.state.token};
      let configuracion = {headers:header}; //headers --> S
      axios.put('ahijado/deactivatecn',{'_id':this.adIdCN},configuracion)
      .then(function (response) {
        me.adModalCN=0;
        me.adAccionCN=0;
        // me.adNombre='';
        me.adIdCN='';
        me.listar();
      }).catch(function (error) {
        console.log(error);
      });
    },

    deactivate_carta_invierno(){
      let me = this;
      let header = {"Token": this.$store.state.token};
      let configuracion = {headers:header}; //headers --> S
      axios.put('ahijado/deactivateci',{'_id':this.adIdCI},configuracion)
      .then(function (response) {
        me.adModalCI=0;
        me.adAccionCI=0;
        // me.adNombre='';
        me.adIdCI='';
        me.listar();
      }).catch(function (error) {
        console.log(error);
      });
    },

      activarDesactivarCerrar(){
        this.adModal=0;
      },

      activarDesactivarCerrarCA(){
        this.adModalCA=0;
      },

      activarDesactivarCerrarCN(){
        this.adModalCN=0;
      },

      activarDesactivarCerrarCI(){
        this.adModalCI=0;
      },
      close () {
        this.dialog = false
      },

    },
  }
</script>