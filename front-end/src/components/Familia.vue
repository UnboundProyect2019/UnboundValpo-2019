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

        <v-dialog v-model="dialog2" max-width="1000px"> <!-- Implementar datatable -->

          <v-card class="mx-auto">
            <v-card-title>
              <span class="headline">Integrantes</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <template>
                  <v-data-table
                    :headers="cabeceraIntegrantes"
                    :items="integrantes"
                    class="elevation-1"
                  ></v-data-table>

                </template>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close2">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

       <v-dialog v-model="dialogintegrante" max-width="500px">

          <v-card class="mx-auto">
            <v-card-title>
              <span class="headline">{{ formTitleIntegrante }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <!-- <template>
                  <v-data-table
                    :headers="cabeceraIntegrantes"
                    :items="familias.integrantes"
                    class="elevation-1"
                  ></v-data-table>
                </template>
                 -->
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="nombre_completo" label="nombre del integranre" ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="parentesco" label="Parentesco" ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="edad" label="Edad" ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="nivel_educacional" label="nivel educacional" ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="ocupacion" label="Ocupacion" ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="ingresos" label="Ingresos" ></v-text-field>
                </v-col>
              </v-row>

              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close3">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="guardarIntegrante(item)">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
                  <h3>Informacion de egreso*</h3>
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

                  <!-- <v-col cols="12" sm="6" md="6">
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="ingreso" label="Ingreso"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="egreso" label="Egreso"></v-text-field>
                  </v-col> -->
                
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
      <v-btn @click="listarIntegrantes(item)">Integrantes</v-btn>
    </template>

    <template v-slot:item.add_integrante="{ item }">
      <!-- <v-btn color="green">Agregar Integrante</v-btn> -->
      <v-btn class="mx-2" fab dark small color="green">
        <v-icon dark @click="addIntegrante(item)">mdi-plus</v-icon>  <!-- en el item esta guardado el id de familia -->
      </v-btn>
    </template>

    <template v-slot:no-data>
      <v-btn color="primary" @click="listar()">Reset</v-btn>
    </template>

  </v-data-table>
</template>
<script>
  import axios from 'axios';
  // import { mapState,mapMutations,mapActions } from 'vuex';

  export default {
    data: () => ({
      dialog: false,
      dialog2: false,
      dialogintegrante: false,
      search:'',
      familias:[],
      integrantes: [],
      headers: [
        { text: 'Acciones', value: 'action', sortable: false },
        { text: 'Nombre familia', value: 'nombre_familia', sortable: false },
        { text: 'Padre', value: 'padre',sortable: false }, 
        { text: 'Madre', value: 'madre', sortable: false },
        { text: 'Ahijado', value: 'ahijado.nombre',sortable: true  },
        { text: 'Ficha Familiar', value: 'ficha_familiar',sortable: false },
        { text: 'Integrantes familiares', value: 'data',sortable: false },
        { text: 'Agregar Integrantes', value: 'add_integrante',sortable: false },

        // { text: 'Carta Navidad', value: 'carta_navidad',sortable: false },
        // { text: 'Carta Invierno', value: 'carta_invierno',sortable: false },
        // { text: 'Datos', value: 'data',sortable: false },
      ],
      cabeceraIntegrantes: [
        { text: 'Nombre completo', value: 'nombre_completo', sortable: false }, 
        { text: 'Parentesco', value: 'parentesco', sortable: false },
        { text: 'Edad', value: 'edad', sortable: false },
        { text: 'Nivel educacional', value: 'nivel_educacional', sortable: false },
        { text: 'Ocupacion', value: 'ocupacion', sortable: false },
        { text: 'Ingresos', value: 'ingresos', sortable: false },


        // { text: 'Carta Navidad', value: 'carta_navidad',sortable: false },
        // { text: 'Carta Invierno', value: 'carta_invierno',sortable: false },
        // { text: 'Datos', value: 'data',sortable: false },
      ],
      editedIndex: -1,
      editedIntegrante: -1,
      item:'', //ojo
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
      _idFamilia:'',
      nombre_completo:'',
      parentesco:'',
      edad:'',
      nivel_educacional:'',
      ocupacion:'',
      ingresos:'',

       ficha_familiar : '',
        nombre_familia : '',
        padre:'',
        madre:'',
        ingresos:0,
        egresos:0,
        total:0,
        alimentacion:0,
        arriendo : 0,
        luz : 0,
        agua : 0,
        gas : 0,
        movilizacion : 0,
        otro : 0
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Familia' : 'Editar Familia'
      },
      formTitleIntegrante () {
        return this.editedIntegrante === -1 ? 'Nuevo Integrante' : 'Editar Integrante'
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
      // this.selectProyecto();
    },

    methods: {
      addIntegrante(item){ // hacer
        this._idFamilia = item._id;
        this.dialogintegrante = true;  
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
      limpiarIntegrante(){
        this._idFamilia='';
        this.nombre_completo='';
        this.parentesco='';
        this.edad='';
        this.nivel_educacional='';
        this.ocupacion='';
        this.ingresos='';
        this.valida=0;
        this.validaMensaje=[];
        this.editedIndex=-1;
      },
      guardarIntegrante(item){
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
          axios.post('integrante/add',{
            'familia':this._idFamilia,
            'nombre_completo':this.nombre_completo, 
            'parentesco': this.parentesco,
            'edad': this.edad,
            'nivel_educacional': this.nivel_educacional,
            'ocupacion': this.ocupacion,
            'ingresos': this.ingresos
            
            },configuracion)
          .then(function (response) {
            me.limpiarIntegrante();
            me.close3();
            // me.listar();
          }).catch(function (error) {
            console.log(error);
          });
        }
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

      listarIntegrantes(item){
        // this.editedIndex = 1;
        this._idFamilia = item._id;
        this.dialog2 = true;
        let me = this;
        let header = {"Token": this.$store.state.token};
        let configuracion = {headers:header}; //headers --> S
        // ,{'familia':this._idFamilia} ,configuracion  ?familia=`${_idFamilia}`  ,{params:{familia:this._idFamilia}}
        axios.get('integrante/query?familia='+`${item._id}`,configuracion).then(function (response) { //error acaaaa
          // console.log(item);
          me.integrantes = response.data;
          me.limpiarIntegrante();
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
      close () {
        this.dialog = false
      },
      close2 () {
        this.dialog2 = false
      },
      close3 (){
        this.dialogintegrante = false
      }

    },
  }
</script>