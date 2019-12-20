<template>

  <v-simple-table >
    <template v-slot:default>
      <thead>

        <v-container>
            <v-btn color="primary" :to="{name:'ahijado'}"> Atras</v-btn>
        </v-container>

        <tr>
          <th class="text-center">Datos</th>
          <th class="text-center">Informacion</th>
        </tr>
      </thead>
      <tbody>
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

    }),
    methods:{
        getColor (calories) {
            if (calories > 400) return 'red'
            else if (calories > 200) return 'orange'
            else return 'green'
        },
    },
    computed:{
        ...mapState(['numero','itemStore','usuario','idAhijado'])
    }    
}
</script>