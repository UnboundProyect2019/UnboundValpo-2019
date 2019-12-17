<template>
    <div>
        <v-container>
            <p>datoahijado worksss</p>  
            <p>{{ numero }}</p>  
            <br>
            <p>{{ usuario }}</p>
            <br>
            <p>itemStore = {{ itemStore }}</p>
            <br>
            <p>idAhijado =  {{ idAhijado }}</p>

        </v-container>  
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex' //estudiar metodos de vuex

export default {
    data: () => ({
        
    }),
    methods:{

    },
    computed:{
        ...mapState(['numero','itemStore','usuario','idAhijado'])
    }    
}
</script>