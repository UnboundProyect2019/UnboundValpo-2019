<template>
    <div id="app">
        <v-app id="inspire">
            <v-content>
                <v-container fluid fill-height>
                    <v-layout justify-center>
                    <v-flex xs12 sm8 md4>
                        <v-card class="elevation-12">
                        <v-toolbar flat>
                            <v-toolbar-title>Acceso al sistema</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <!-- <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                    :href="source"
                                    icon
                                    large
                                    target="_blank"
                                    v-on="on"
                                    >
                                    <v-icon>mdi-code-tags</v-icon>
                                    </v-btn>
                                </template>
                                <span>Source</span>
                            </v-tooltip> -->
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    autofocus
                                    v-model="email"
                                    label="E-mail"
                                    name="login"
                                    prepend-icon="person"
                                    type="text"
                                    aria-required
                                ></v-text-field>

                                <v-text-field
                                    v-model="password"
                                    label="Contraseña"
                                    name="password"
                                    prepend-icon="lock"
                                    type="password"
                                    required
                                ></v-text-field>
                            </v-form>
                            <v-flex class="red--text" v-if="errorM">
                                {{errorM}}
                            </v-flex>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn block outlined color="primary"  @click="ingresar()">Ingresar</v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
        </v-app>
    </div>
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