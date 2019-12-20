<template>

  <v-simple-table >
      <!-- INICIO DIALOG -->
    <v-dialog v-model="dialog" max-width="600px">
        <!-- <template v-slot:activator="{ on }" v-if="esAdministrador || esAsistSocial">
            <v-btn color="primary" dark class="mb-2" v-on="on" @click="limpiar()">Agregar datos Familiares</v-btn>
        </template> -->
        <v-card class="mx-auto">
        <v-card-title>
            <span class="headline">Agregar Datos Familiares</span>
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

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
            <!-- <v-btn color="blue darken-1" text @click="guardar">Guardar</v-btn> -->
        </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- Final del modal -->
    <template v-slot:default>
      <thead>
        <v-container>
            <v-btn color="primary" :to="{name:'ahijado'}"> Atras</v-btn>
        </v-container>
        <v-container>
            <v-btn color="success" @click="abrirModal()"> Agregar familia</v-btn>
        </v-container>
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

export default {
    data: () => ({
        dialog:false,
        ficha_familiar:'',
        alimentacion:'',
        arriendo:'',
        luz:'',
        agua:'',
        gas:'',
        movilizacion:'',
        otro:''

    }),
    methods:{
        getColor (calories) {
            if (calories > 400) return 'red'
            else if (calories > 200) return 'orange'
            else return 'green'
        },
        abrirModal() {
            this.dialog = true;
        },
        close () {
            this.dialog = false
        },
    },
    computed:{
        ...mapState(['numero','itemStore','usuario','idAhijado']),
        esAdministrador(){
            return this.$store.state.usuario && this.$store.state.usuario.rol == 'Administrador' 
        },
        esAsistSocial(){
            return this.$store.state.usuario && this.$store.state.usuario.rol == 'Asist_Social' 
        }
    }    
}
</script>