<template>
  <v-data-table
    :headers="headers"
    :items="ahijados"
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
        <v-toolbar-title>Ahijados Egresados</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-flex mt-8>
            <v-select
            :items="proyectos"
            label="Proyectos"
            
            solo
          ></v-select>
        </v-flex>
        <v-divider class="mx-4" inset vertical ></v-divider>
        <v-text-field class="text-xs-center" v-model="search" append-icon="search"
          label="Busqueda" solo hide-details></v-text-field>
        <v-spacer></v-spacer>
      
        <!-- Modal Activar / Egresar Ahijados -->
        <v-dialog v-model="adModal" max-width="290">
          <v-card>
            <v-card-title class="headline" v-if="adAccion==1">
              Ingresar Ahijado
            </v-card-title>
            <v-card-title class="headline" v-if="adAccion==2">
              Egresar Ahijado
            </v-card-title>
            <v-card-text>
              Estas a punto de <span v-if="adAccion==1">activar</span><span v-if="adAccion==2">Egresar</span>
              al ahijado {{adNombre}}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
               <v-btn @click="activarDesactivarCerrar()" color="dark darken-1" text large>
                  Cancelar
                </v-btn>
                <v-btn v-if="adAccion==1" @click="activar()" color="green darken-1" text large >
                  Ingresar
                </v-btn>
                <v-btn v-if="adAccion==2" @click="desactivar()" color="red darken-1" text large >
                  Egresar
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Fin modal acivar / egresar ahijados -->
        <!-- Modal entregas de cartas de agradecimiento-->
        <v-dialog v-model="adModalCA" max-width="450">
          <v-card>
            <v-card-title class="headline" v-if="adAccionCA==1">
              Entregar Carta de agradecimiento
            </v-card-title>
            <v-card-title class="headline" v-if="adAccionCA==2">
              Quitar Carta de agradecimiento
            </v-card-title>
            <v-card-text>
              Estas a punto de <span v-if="adAccionCA==1">Ingresar</span><span v-if="adAccionCA==2">Quitar</span>
              una carta de agradecimiento
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
               <v-btn @click="activarDesactivarCerrarCA()" color="dark darken-1" text large>
                  Cancelar
                </v-btn>
                <v-btn v-if="adAccionCA==1" @click="activate_carta_agradecimiento()" color="green darken-1" text large >
                  Ingresar
                </v-btn>
                <v-btn v-if="adAccionCA==2" @click="deactivate_carta_agradecimiento()" color="red darken-1" text large >
                  Quitar
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Fin modal cartas de agradecimiento-->
        <!-- Modal entregas de cartas de navidad-->
        <v-dialog v-model="adModalCN" max-width="350">
          <v-card>
            <v-card-title class="headline" v-if="adAccionCN==1">
              Entregar Carta de navidad
            </v-card-title>
            <v-card-title class="headline" v-if="adAccionCN==2">
              Quitar Carta de navidad
            </v-card-title>
            <v-card-text>
              Estas a punto de <span v-if="adAccionCN==1">Ingresar</span><span v-if="adAccionCN==2">Quitar</span>
              una carta de navidad
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
               <v-btn @click="activarDesactivarCerrarCN()" color="dark darken-1" text large>
                  Cancelar
                </v-btn>
                <v-btn v-if="adAccionCN==1" @click="activate_carta_navidad()" color="green darken-1" text large >
                  Ingresar
                </v-btn>
                <v-btn v-if="adAccionCN==2" @click="deactivate_carta_navidad()" color="red darken-1" text large >
                  Quitar
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Fin modal cartas de navidad-->
        <!-- Modal entregas de cartas de invierno-->
        <v-dialog v-model="adModalCI" max-width="350">
          <v-card>
            <v-card-title class="headline" v-if="adAccionCI==1">
              Entregar Carta de invierno
            </v-card-title>
            <v-card-title class="headline" v-if="adAccionCI==2">
              Quitar Carta de invierno
            </v-card-title>
            <v-card-text>
              Estas a punto de <span v-if="adAccionCI==1">Ingresar</span><span v-if="adAccionCI==2">Quitar</span>
              una carta de invierno
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
               <v-btn @click="activarDesactivarCerrarCI()" color="dark darken-1" text large>
                  Cancelar
                </v-btn>
                <v-btn v-if="adAccionCI==1" @click="activate_carta_invierno()" color="green darken-1" text large >
                  Ingresar
                </v-btn>
                <v-btn v-if="adAccionCI==2" @click="deactivate_carta_invierno()" color="red darken-1" text large >
                  Quitar
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Fin modal cartas de invierno-->
        <!-- FIN DIALOGS -->
      </v-toolbar>
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
     
    <template v-slot:item.estado="{ item }">
      <template v-if="esLector">
        <div v-if="item.estado">
          <span class="green--text">Activo</span>
        </div>
        <div v-else>
          <span class="red--text">Egresado</span>
        </div>
      </template>
      <template v-else>
        <div v-if="item.estado">
          <!-- <span class="green--text">Activo</span> -->
          <v-btn small text color="success" @click="activarDesactivarMostrar(2,item)">Activo</v-btn>
        </div>
        <div v-else>
          <v-btn small text color="error" @click="activarDesactivarMostrar(1,item)">Egresado</v-btn>
        </div>
      </template>
     
    </template> 
    
    <template v-slot:item.carta_agradecimiento="{ item }">
      <template v-if="esLector">
          <div v-if="item.carta_agradecimiento">
            <span class="green--text">Entregada</span>
          </div>
          <div v-else>
            <span class="red--text">No entregada</span>
          </div>
      </template>
      <template v-else>
        <div v-if="item.carta_agradecimiento">
          <v-btn text small color="success" @click="activarDesactivarMostrarCA(2,item)">Entregada</v-btn>
        </div>
        <div v-else>
          <v-btn text small color="error" @click="activarDesactivarMostrarCA(1,item)">No Entregada</v-btn>
        </div>
      </template>
    </template>

    <template v-slot:item.carta_navidad="{ item }">
      <template v-if="esLector">
          <div v-if="item.carta_navidad">
            <span class="green--text">Entregada</span>
          </div>
          <div v-else>
            <span class="red--text">No entregada</span>
          </div>
      </template>
      <template v-else>
        <div v-if="item.carta_navidad">
          <v-btn text small color="success" @click="activarDesactivarMostrarCA(2,item)">Entregada</v-btn>
        </div>
        <div v-else>
          <v-btn text small color="error" @click="activarDesactivarMostrarCA(1,item)">No Entregada</v-btn>
        </div>
      </template>
    </template>

    <template v-slot:item.carta_invierno="{ item }">
      <template v-if="esLector">
          <div v-if="item.invierno">
            <span class="green--text">Entregada</span>
          </div>
          <div v-else>
            <span class="red--text">No entregada</span>
          </div>
      </template>
      <template v-else>
        <div v-if="item.invierno">
          <v-btn text small color="success" @click="activarDesactivarMostrarCA(2,item)">Entregada</v-btn>
        </div>
        <div v-else>
          <v-btn text small color="error" @click="activarDesactivarMostrarCA(1,item)">No Entregada</v-btn>
        </div>
      </template>
    </template>

    <template v-slot:item.data="{ item }">
      <v-list-item :to="{name:'datoahijado'}">
        <v-btn  x-large @click="guardarAhijado(item)">datos</v-btn>
      </v-list-item>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="listar()">Reset</v-btn>
    </template>

  </v-data-table>
</template>
<script>
  import axios from 'axios';
  import { mapState,mapMutations,mapActions } from 'vuex';

  export default {
    data: () => ({
      dialog: false,
      search:'',
      ahijados:[],
      headers: [
        { text: 'Actions', value: 'action', sortable: false },
        { text: 'Estado', value: 'estado',sortable: false }, 
        { text: 'Proyecto', value: 'proyecto.nombre_proyecto', sortable: false },
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
        return this.editedIndex === -1 ? 'Nuevo Ahijado' : 'Editar Ahijado'
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
      ...mapActions(['obtenerAhijado']),
      guardarAhijado(item){
        // console.log(item);
        this.$store.dispatch("obtenerAhijado",item);
      },
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
        axios.get('ahijado/listEgresados',configuracion).then(function (response) {
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