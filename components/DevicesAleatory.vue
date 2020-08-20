<template>
    <div class="devicesAleatory" >
        <h2 class="titleDevice ">Estos quizás te gusten, si no puedes ver <nuxt-link class="linkToCatalogo" :to="'/catalogo'">nuestro catalogo</nuxt-link> .</h2>
        
        <div v-loading="devicesID == ''" :class="{ loadingDevices: devicesID == '' }" v-show="devicesID == ''">
            Obteniendo dispositivos...
        </div>

        <div class="containerDevices">
            <Device v-for="deviceID in devicesID" :id="deviceID" :key="deviceID" v-show="devicesID"></Device>
        </div>
    </div>
</template>

<script>
import Device from '@/components/Device'
export default {
    name: 'DevicesAleatory',
    components:{
        Device
    },
    data () {
        return {
            devicesID:[]
        }
    },
    methods:{
        async getDevicesAleatory(){
            const devicesAleatory = await this.$axios.get('devicesAleatory');
            const response = devicesAleatory.data

            response.forEach(element => {
                const id = element._id
                this.devicesID.push(id)
            }); 
        }
    },
    mounted(){
        this.getDevicesAleatory()
    }
}
</script>

<style>
.devicesAleatory{
    margin-top: 30%;
    text-align: center;
}
.devicesAleatory .titleDevice{
    margin-bottom: 50px;
    padding: 20px;
}
.linkToCatalogo{
    color: var(--color-primary);
    font-weight: bold;
    text-shadow: 1px 1px #777;
}
.loadingDevices{
    margin: 100px auto 0 auto;
  width: 100%;
  display: block;
  height: 30vh;
  text-align: center;
}
@media (min-width: 700px){
    .devicesAleatory{
        margin-top: 10%;
    }
}
</style>
