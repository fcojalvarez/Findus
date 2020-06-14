<template>
    <div class="devicesAleatory">
        <h2 class="titleDevice">Móviles buenos, bonitos y baratos</h2>
        <div class="containerDevices">
            <Device v-for="deviceID in devicesID" :id="deviceID" :key="deviceID"></Device>
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
            let devicesAleatory = await this.$axios.get('devicesAleatory');
            devicesAleatory = devicesAleatory.data

            devicesAleatory.forEach(element => {
                let id = element._id
                this.devicesID.push(id)
            });
        },
        prueba(){
            console.log(this.devicesID)
        }
    },
    mounted(){
        this.getDevicesAleatory()
    }
}
</script>

<style>
.devicesAleatory{
    margin-top: 15%;
    text-align: center;
}
.devicesAleatory .titleDevice{
    margin-bottom: 50px;
}
</style>
