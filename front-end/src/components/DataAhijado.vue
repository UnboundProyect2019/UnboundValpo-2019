<template>
    <div>
        <template>
            <div>
                <v-tabs>
                    <v-tab :to="{name:'ahijado'}">Ahijados</v-tab>
                    <v-tab :to="{name:'egresado'}">Egresados</v-tab>
                    <v-tab :to="{name:'padrino'}">Padrinos</v-tab>
                </v-tabs>
            </div>
        </template>
        <p>DataAhijado works</p>
    </div>
</template>

<script>
    export default {
        
    }
</script>