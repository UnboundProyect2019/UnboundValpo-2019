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
                    @click="limpiar"
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
                    <!-- establecer los imputs del nuevo modelo familia -->
                    <v-card-text>
                        <v-container> 
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field v-model="ficha_familiar" label="Ficha familiar"></v-text-field>
                                </v-col>
                                 <v-col cols="12" sm="12" md="12">
                                    <v-text-field v-model="nombre_familia" label="Nombre Familia"></v-text-field>
                                </v-col>
                                 <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="padre" label="Nombre del padre de familia"></v-text-field>
                                </v-col>
                                 <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="madre" label="Nombre de la madre de la familia"></v-text-field>
                                </v-col>
                                 <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="ingresos" type="numbrer" label="Ingresos"></v-text-field>
                                </v-col>
                                 <!-- <v-col cols="12" sm="12" md="12">
                                    <v-text-field v-model="egresos" type="number" label="Egresos"></v-text-field>
                                </v-col> -->
                                 <!-- <v-col cols="12" sm="12" md="12">
                                    <v-text-field v-model="alimentacion" type="number" label="Alimentacion"></v-text-field>
                                </v-col> -->
                                 <!-- <v-col cols="12" sm="12" md="12">
                                    <v-text-field v-model="alimentacion" type="number" label="Alimentacion"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field v-model="alimentacion" type="number" label="Alimentacion"></v-text-field>
                                </v-col> -->
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="arriendo" type="number" label="Arriendo"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="luz" type="number" label="Luz"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="agua" type="number" label="Agua"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="gas" type="number" label="Gas"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="movilizacion" type="number" label="Movilizacion"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="otro" type="number" label="Otro"></v-text-field>
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
import { mapState } from 'vuex';
import axios from 'axios';


export default {
    data: () => ({
        dialog : false,
        adAction : 0,
        idAhijado: '',
        editedIndex: -1,
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
            this.nombre_familia='';
            this.padre='';
            this.madre='',
            this.ingresos=0;
            this.egresos=0;
            this.total=0;
            this.arriendo=0;
            this.luz=0;
            this.agua=0;
            this.gas=0;
            this.movilizacion=0;
            this.otro=0;
            this.editedIndex=-1;
        },
        editItem (item) {  // agregar items de nuevo modelo
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