<template>

  <v-simple-table >

    <template v-slot:default>
      <thead>
        <v-container>
            <v-btn color="primary" :to="{name:'ahijado'}"> Atras</v-btn>
        </v-container>
        <template>
            <div class="text-center">
                <v-dialog
                v-model="dialog"
                width="600"
                >
                <template v-slot:activator="{ on }">
                    <v-btn
                    color="green"
                    dark
                    v-on="on"
                    >
                    Agregar datos familiares
                    </v-btn>
                </template>
                <!-- <template v-slot:activator="{ on }">
                    <v-btn
                    color="yelow"
                    dark
                    v-on="on"
                    >
                    Editar datos familiares
                    </v-btn>
                </template> -->

                <v-card>
                    <v-card-title
                    class="headline grey lighten-2"
                    primary-title
                    >
                    {{ formTitle }}
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field v-model="ficha_familiar" label="Ficha familiar"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field v-model="alimentacion" label="Alimentacion"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="arriendo" label="Arriendo"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="luz" label="Luz"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="agua" label="Agua"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="gas" label="Gas"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="movilizacion" label="Movilizacion"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="otro" label="Otro"></v-text-field>
                                </v-col>
                                
                                <!-- VALIDACION DE MENSAJES -->
                                <!-- <v-col cols="12" sm="12" md="12" v-show="valida">
                                <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">
                                </div> 
                                </v-col> -->
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="red" text @click="dialog = false"> Cerrar</v-btn>
                        <v-btn color="green" text @click="guardar" > Guardar </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </div>
        </template>
        <tr>
          <th class="text-center">Datos</th>
          <th class="text-center">Informacion</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td label="Dense"><strong>Id : </strong></td>
          <td>{{ itemStore._id }}</td>
        </tr>

        <tr>
          <td label="Dense"><strong>Nombre : </strong></td>
          <td>{{ itemStore.nombre }}</td>
        </tr>

        <tr>
            <td><strong>Apellidos : </strong></td>
            <td>{{ itemStore.apellidos }}</td>
        </tr>


        <tr>
            <td><strong>Estado : </strong></td>
            <template v-if="itemStore.estado">
                <td><span class="green--text">Activo</span></td>
            </template>
            <template v-else>
                <td><span class="red--text">Egredaso</span></td>
            </template>
            <!-- <td>{{ itemStore.estado }}</td> -->
        </tr>

        <tr>
            <td><strong>Proyecto : </strong></td>
            <td>{{ itemStore.proyecto.nombre_proyecto }}</td>
        </tr>

        <tr>
            <td><strong>Fecha de nacimiento : </strong></td>
            <td>{{ itemStore.fecha_nacimiento }}</td>
        </tr>

        <tr>
            <td><strong>Discapacidad : </strong></td>
            <td>{{ itemStore.discapacidad }}</td>
        </tr>

        <tr>
            <td><strong>Nivel educacional : </strong></td>
            <td>{{ itemStore.nivel_educacional }}</td>
        </tr>

        <tr>
            <td><strong>Direccion - Calle : </strong></td>
            <td>{{ itemStore.direccion.calle }}</td>
        </tr>

        <tr>
            <td><strong>Direccion - Numero : </strong></td>
            <td>{{ itemStore.direccion.numero }}</td>
        </tr>

        <tr>
            <td><strong>Direccion - Sector : </strong></td>
            <td>{{ itemStore.direccion.sector }}</td>
        </tr>

        <tr>
            <td><strong>Informacion de Pago - Tipo de cuenta : </strong></td>
            <td>{{ itemStore.info_pago.tipo_cuenta }}</td>
        </tr>

        <tr>
            <td><strong>Informacion de Pago - Numero de cuenta : </strong></td>
            <td>{{ itemStore.info_pago.numero_cuenta }}</td>
        </tr>

        <tr>
            <td><strong>Informacion de Pago - Banco : </strong></td>
            <td>{{ itemStore.info_pago.pago_banco }}</td>
        </tr>

        <!-- <tr>
            {{itemStore}}
        </tr> -->
      </tbody>
    </template>
  </v-simple-table>

</template>
<script>
import { mapState } from 'vuex' //estudiar metodos de vuex
import axios from 'axios';


export default {
    data: () => ({
        dialog : false,
        adAction : 0,
        idAhijado: '',
        editedIndex: -1,
        ficha_familiar : '',
        alimentacion : '',
        arriendo : '',
        luz : '',
        agua : '',
        gas : '',
        movilizacion : '',
        otro : ''

    }),
    methods:{
        getColor (calories) {
            if (calories > 400) return 'red'
            else if (calories > 200) return 'orange'
            else return 'green'
        },
        close () {
            this.dialog = 0
        },
         limpiar(){
            this.idAhijado = '',
            this.ficha_familiar='';
            this.alimentacion='';
            this.arriendo='';
            this.luz='';
            this.agua='';
            this.gas='';
            this.movilizacion='';
            this.otro='';
            this.editedIndex=-1;
        },
        editItem (item) {
            this.idAhijado=this.$store.state.itemStore._id;
            this.ficha_familiar=this.$store.state.itemStore.ficha_familiar;
            this.alimentacion=this.$store.state.itemStore.alimentacion;
            this.arriendo=this.$store.state.itemStore.arriendo;
            this.luz=this.$store.state.itemStore.luz;
            this.agua=this.$store.state.itemStore.agua;
            this.gas=this.$store.state.itemStore.gas;
            this.movilizacion=this.$store.state.itemStore.movilizacion;
            this.otro=this.$store.state.itemStore.otro;
            
            this.dialog = true;
            this.editedIndex = 1;
        },
        guardar(){
            let me = this;
            let idAhijado = this.$store.state.itemStore._id;
            let header = {"Token": this.$store.state.token};
            let configuracion = {headers:header}; //headers --> S          
            // if (this.validar()) {
            //     return;
            // }
            if (this.editedIndex > -1) {
            //editar los datos del regisro 
            axios.put('familia/update',{
                    '_id':idAhijado,
                    'ficha_familiar':this.ficha_familiar, 
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
                    // me.listar();
                }).catch(function (error) {
                    console.log(error);
                });
            } else {
            //guardar un nuevo registro
                axios.post('familia/add',{ 
                    'ahijado':idAhijado,
                    'ficha_familiar':this.ficha_familiar, 
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
                    // me.listar();
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        close () {
            this.dialog = false
        },

    },
    computed:{
        ...mapState(['numero','itemStore','usuario']),
        formTitle () {
            return this.editedIndex === -1 ? 'Agregar datos familiares' : 'Editar Datos'
        },
        esAdministrador(){
            return this.$store.state.usuario && this.$store.state.usuario.rol == 'Administrador' 
        },
        esAsistSocial(){
            return this.$store.state.usuario && this.$store.state.usuario.rol == 'Asist_Social' 
        }
    }    
}
</script>