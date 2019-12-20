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
            <v-tab :to="{name:'padrino'}">Familias</v-tab>
          </v-tabs>
        </div>
      </template>
      <v-toolbar flat color="white">
        <v-toolbar-title>Ahijados</v-toolbar-title>
        <v-divider class="mx-4" inset vertical ></v-divider>
        <v-flex mt-8>
          <v-select
          :items="proyectosBusqueda"
          label="Proyectos"
          v-model="search"
          solo
        ></v-select>
        </v-flex>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field class="text-xs-center" v-model="search" append-icon="search"
          label="Busqueda" solo hide-details></v-text-field>
        
        <v-spacer></v-spacer>
        <!-- INICIO DIALOG -->
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on }" v-if="esAdministrador || esAsistSocial">
            <v-btn color="primary" dark class="mb-2" v-on="on" @click="limpiar()">Nuevo Ahijado</v-btn>
          </template>
          <v-card class="mx-auto">
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
                  <v-divider></v-divider>
                  <h3>Direcccion* (Informacion opcional)</h3>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="direccion_calle" label="Direccion Calle*"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="direccion_numero" label="Direccion Numero*"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="direccion_sector" label="Direccion Sector*"></v-text-field>
                  </v-col>
                  <v-divider></v-divider>
                  <h3>Informacion de pago* (Informacion opcional)</h3>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="info_pago_tipo_cuenta" label="Tipo de cuenta*"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="info_pago_numero_cuenta" label="Numero de cuenta*"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="info_pago_banco" label="Banco*"></v-text-field>
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
                <v-btn v-if="adAccionCA==1" @click="activate_carta_agradecimiento(), ejemplo()" color="green darken-1" text large >
                  Ingresar
                </v-btn>
                <v-btn v-if="adAccionCA==2" @click="deactivate_carta_agradecimiento(), ejemplo()" color="red darken-1" text large >
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
        <!-- Modal Datos de ahijados-->
        <v-dialog v-model="adModalDATA" max-width="700">
          <v-card>
            <v-contanier>
              <v-card-title class="display-1">
                Informacion de {{adNombreDATA}}
              </v-card-title>
              <v-divider></v-divider>
                  <v-card-text>
                    <v-container>
                      <v-btn>Agregar Familia</v-btn>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <div>
                            <strong > - Id : </strong>{{adIdDATA}}
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <div>
                            <strong > - Nombre : </strong>{{adNombreDATA}}
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <div>
                            <strong> - Apellidos : </strong>{{adApellidosDATA}}
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <div>
                            <strong> - Fecha de nacimiento : </strong>{{adFecha_nacimientoDATA}}
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <div>
                            <strong> - Discapacidad : </strong>{{adDiscapacidadDATA}}
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <div>
                            <strong> - Nivel educacional : </strong>{{adNivel_educacionalDATA}}
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <div>
                            <strong> - Calle : </strong>{{adDireccion_calleDATA}}
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <div>
                            <strong> - Numero : </strong>{{adDireccion_numeroDATA}}
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <div>
                            <strong> - Sector : </strong>{{adDireccion_sectorDATA}}
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <div>
                            <strong> - Tipo de cuenta : </strong>{{adInfo_pago_tipo_cuentaDATA}}
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <div>
                            <strong> - N° de cuenta : </strong>{{adInfo_pago_numero_cuentaDATA}}
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <div>
                            <strong> - Banco : </strong>{{adInfo_pago_bancoDATA}}
                          </div>
                        </v-col>
                      </v-row> 
                    </v-container>
                  </v-card-text>
                
              
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="activarDesactivarCerrarDATA()" color="primary" text large >
                Cerrar
                </v-btn>
              </v-card-actions>
            </v-contanier>
          </v-card>
        </v-dialog>
        <!-- Fin modal datos ahijados-->
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
      <!-- Implementar el eliminar -->
      <v-icon
        small
        class="mr-2"
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <!-- FIN TEMPLATE ACTIONS -->
    
    <template v-slot:item.estado="{ item }">
      <template>
        <!-- ver si es admin o asist social -->
      </template>
      <div v-if="item.estado">
        <!-- <span class="green--text">Activo</span> -->
        <v-btn small text color="success" @click="activarDesactivarMostrar(2,item)">Activo</v-btn>
      </div>
      <div v-else>
        <v-btn small text color="error" @click="activarDesactivarMostrar(1,item)">Inactivo</v-btn>
      </div>
    </template> 
    
    <template v-slot:item.carta_agradecimiento="{ item }">
      <div v-if="item.carta_agradecimiento">
        <v-btn text small color="success" @click="activarDesactivarMostrarCA(2,item)">Entregada</v-btn>
      </div>
      <div v-else>
        <v-btn text small color="error" @click="activarDesactivarMostrarCA(1,item)">No Entregada</v-btn>
      </div>
    </template>

    <template v-slot:item.carta_navidad="{ item }">
      <div v-if="item.carta_navidad">
        <v-btn text small color="success" @click="activarDesactivarMostrarCN(2,item)">Entregada</v-btn>
      </div>
      <div v-else>
        <v-btn text small color="error" @click="activarDesactivarMostrarCN(1,item)">No Entregada</v-btn>
      </div>
    </template>

    <template v-slot:item.carta_invierno="{ item }">
      <div v-if="item.carta_invierno">
        <v-btn text small color="success" @click="activarDesactivarMostrarCI(2,item)">Entregada</v-btn>
      </div>
      <div v-else>
        <v-btn text small color="error" @click="activarDesactivarMostrarCI(1,item)">No Entregada</v-btn>
      </div>
    </template>

    <template v-slot:item.data="{ item }">
      <!-- en este item esta los datos del ahijado que quiero mostrar en el componente -->
      <!-- <v-btn text small @click="activarDesactivarMostrarDATA(item)">{{item._id}}</v-btn> -->
      <v-list-item :to="{name:'datoahijado'}">
        <v-btn  x-large @click="guardarAhijado(item)">datos</v-btn>
      </v-list-item>
      <!-- <v-btn text small :to="{name:'datoahijado'}" @click="guardarAhijado(item)">datos</v-btn> -->
      <!-- :to="{name:'datoahijado'}" -->
    </template>

    <template v-slot:no-data>
      <v-btn  color="primary" @click="listar()">Reset</v-btn>
    </template>

  </v-data-table>
</template>
<script>
  import axios from 'axios';
  // import Vuex from 'vuex'
  import { mapState,mapMutations,mapActions } from 'vuex';

  export default {
    data: () => ({
      dialog: false,
      search:'',
      searchNombreProyecto:'',
      ahijados:[],
      headers: [
        { text: 'Actions', value: 'action', sortable: false },
        { text: 'Estado', value: 'estado',sortable: false }, 
        { text: 'Proyecto', value: 'proyecto.nombre_proyecto', sortable: false },
        { text: 'Nombre', value: 'nombre',sortable: true  },
        { text: 'Apellidos', value: 'apellidos' ,sortable: false },
        { text: 'Carta Agradecimiento', value: 'carta_agradecimiento',sortable: false },
        { text: 'Carta Navidad', value: 'carta_navidad',sortable: false },
        { text: 'Carta Invierno', value: 'carta_invierno',sortable: false },
        { text: 'Datos', value: 'data',sortable: false },
      ],
      editedIndex: -1,
      _id:'',
      proyecto:'',
      proyectos: [],
      proyectosBusqueda:[],
      nombre:'',
      apellidos:'',
      fecha_nacimiento:'',
      discapacidad:'',
      nivel_educacional:'',
      direccion_calle:'',
      direccion_numero:'',
      direccion_sector:'',
      info_pago_tipo_cuenta:'',
      info_pago_numero_cuenta:'',
      info_pago_banco:'',
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

      adModalDATA:0,
      adAccionDATA:'',
      adIdDATA:'',
      adNombreDATA:'',
      adApellidosDATA:'',
      adFecha_nacimientoDATA:'',
      adDiscapacidadDATA:'',
      adNivel_educacionalDATA:'',
      // add desde aqui info para ver en el modal
      adDireccion_calleDATA:'',
      adDireccion_numeroDATA:'',
      adDireccion_sectorDATA:'',
      adInfo_pago_tipo_cuentaDATA:'',
      adInfo_pago_numero_cuentaDATA:'',
      adInfo_pago_bancoDATA:'',

      item2:{}
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Agregar nuevo ahijado' : 'Editar Ahijado'
      },
      esAdministrador(){
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'Administrador' 
      },
      esAsistSocial(){
        return this.$store.state.usuario && this.$store.state.usuario.rol == 'Asist_Social' 
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.listar();
      this.selectProyecto();
      this.selectProyectoBusqueda();
    },

    methods: {
      // ...mapMutations(['setAhijado']),
      // ...mapState(['obtenerAhijado']),
      ...mapActions(['obtenerAhijado']),
      guardarAhijado(item){
        // console.log(item);
        this.$store.dispatch("obtenerAhijado",item);
        
        // let me = this;
        // let header = {"Token": this.$store.state.token};
        // let configuracion = {headers:header};
        // axios.get('ahijado/query',{'_id':item._id},configuracion).then(data => {
        //   console.log(data);
        //   this.$store.dispatch("obtenerAhijado",data);
        // }).catch(function(error){
        //   console.log(error);
        // });
        
      },
      selectProyecto(){ 
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
      selectProyectoBusqueda(){ 
        let me = this;
        let proyectoArray =[];
        let header = {"Token": this.$store.state.token};
        let configuracion = {headers:header}; //headers --> S
        axios.get('proyecto/list',configuracion).then(function (response) { //OJO
            // console.log(response);
            proyectoArray = response.data;
            proyectoArray.map(function (x) {
                me.proyectosBusqueda.push({text:x.nombre_proyecto, value:x.nombre_proyecto});
            })
        }).catch(function (error) {
          console.log(error);
        });
      },
      listar(){
        let me = this;
        let header = {"Token": this.$store.state.token};
        let configuracion = {headers:header}; //headers --> S
        axios.get('ahijado/listAhijados',configuracion).then(function (response) {
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
        this.direccion_calle='';
        this.direccion_numero='';
        this.direccion_sector='';
        this.info_pago_tipo_cuenta='';
        this.info_pago_numero_cuenta='';
        this.info_pago_banco='';
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
          //editar los datos del regisro -------------------> OJO CON EL NUEVO MODELO AHIJADO
           axios.put('ahijado/update',{
              '_id':this._id,
              'proyecto':this.proyecto, 
              'nombre': this.nombre,
              'apellidos': this.apellidos,
              'fecha_nacimiento': this.fecha_nacimiento,
              'discapacidad': this.discapacidad,
              'nivel_educacional': this.nivel_educacional,
              'direccion.calle':this.direccion_calle,
              'direccion.numero':this.direccion_numero,
              'direccion.sector':this.direccion_sector,
              'info_pago.tipo_cuenta':this.info_pago_tipo_cuenta,
              'info_pago.numero_cuenta':this.info_pago_numero_cuenta,
              'info_pago.pago_banco':this.info_pago_banco
            
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
          axios.post('ahijado/add',{ //puse un punto para acceder al obreto direccion y infro pago del objeto
            'proyecto':this.proyecto, 
            'nombre': this.nombre,
            'apellidos': this.apellidos,
            'fecha_nacimiento': this.fecha_nacimiento,
            'discapacidad': this.discapacidad,
            'nivel_educacional': this.nivel_educacional,
            'direccion.calle':this.direccion_calle,
            'direccion.numero':this.direccion_numero,
            'direccion.sector':this.direccion_sector,
            'info_pago.tipo_cuenta':this.info_pago_tipo_cuenta,
            'info_pago.numero_cuenta':this.info_pago_numero_cuenta,
            'info_pago.pago_banco':this.info_pago_banco
            
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
        this.direccion_calle=item.direccion.calle;
        this.direccion_numero=item.direccion.numero;
        this.direccion_sector=item.direccion.sector;
        this.info_pago_tipo_cuenta=item.info_pago.tipo_cuenta;
        this.info_pago_numero_cuenta=item.info_pago.numero_cuenta;
        this.info_pago_banco=item.info_pago.pago_banco;

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

    activarDesactivarMostrarDATA(item){
      this.adModalDATA=1;
      // this.adNombre=item.nombre;
      this.adIdDATA=item._id;
      this.adNombreDATA=item.nombre;
      this.adApellidosDATA=item.apellidos;
      this.adFecha_nacimientoDATA=item.fecha_nacimiento;
      this.adDiscapacidadDATA=item.discapacidad;
      this.adNivel_educacionalDATA=item.nivel_educacional;
      this.adDireccion_calleDATA=item.direccion_calle;
      this.adDireccion_numeroDATA=item.direccion_numero;
      this.adDireccion_sectorDATA=item.direccion_sector;
      this.adInfo_pago_tipo_cuentaDATA=item.info_pago_tipo_cuenta;
      this.adInfo_pago_numero_cuentaDATA=item.info_pago_numero_cuenta;
      this.adInfo_pago_bancoDATA=item.info_pago_banco;

    }, 

    mostrarDATA(){
      let me = this;
      let header = {"Token": this.$store.state.token};
      let configuracion = {headers:header}; //headers --> S
      axios.get('ahijado/query',{'_id':this.adIdDATA},configuracion)
        .then(function (response) {
          me.adModalDATA=0; //deberia mantenerse en 1 creo
          // me.adAccion=0;
          // me.adNombre='';
          me.adIdDATA='';
          me.listar();  
        }).catch(function (error) {
          console.log(error);
        });
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

      activarDesactivarCerrarDATA(){
        this.adModalDATA=0;
      },

      close () {
        this.dialog = false
      },

    },
  }
</script>