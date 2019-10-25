<template>
    <v-layout align-center justify-center>
        <v-flex cols="12" sm="8" md="6" lg5 x14 mt-12>
            <v-card>
                <v-toolbar dark color="blue darken-3">
                    <v-toolbar-title>
                        Acceso al sistema
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field autofocus v-model="email" color="accent" label="Email" aria-required>
                    </v-text-field>
                    <v-text-field v-model="password" type="password" color="accent" label="Password" required>
                    </v-text-field>
                    <v-flex class="red--text" v-if="errorM">
                        {{errorM}}
                    </v-flex>
                    <v-card-actions class="px-3 pb-3">
                        <v-flex text-xs-right>
                            <v-btn @click="ingresar()" color="primary" class="btn-block">Ingresar</v-btn>
                        </v-flex>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            email:'',
            password:'',
            errorM:null
        }
    },
    methods: {
        ingresar(){
            axios.post('usuario/login',{email: this.email, password: this.password})
            .then(respuesta => {
                // console.log(respuesta.data.user);
                // console.log(respuesta.data.tokenReturn);
                return respuesta.data;
            })
            .then(data => {
                this.$store.dispatch("guardarToken",data.tokenReturn);
                this.$router.push({name: 'home'});
            })
            .catch(error => { //error undefined
                // console.log(error);
                this.errorM=null;
                if (error.response.status == 404) {
                    this.errorM = 'No existe el usuario o las credenciales son incorrectas';
                } else {
                    this.errorM = 'Ocurrio un error con el servidor';
                }
            });
        }
    },
}
</script>