<template>
    <div class="devicesAleatory">
        <el-input class="inputModel" placeholder="Filtrar según modelo" v-model="inputFilterModel"></el-input>
        <el-button v-if="error" class="inputModel" @click="reload">Recargar</el-button>

        <div class="containerCatalogo ">
            <Device class="deviceCat" v-for="device in filteredDevices" :id="device._id" :key="device._id"></Device>
        </div>
        <div class="notFoundCatalogo" v-show="devices.lenght === 0">
            <h3 class="NotFound">Ese modelo se nos ha escapado, ayúdanos a encontrarlo.
            <br>
            <br>
            Indícanos a traves del <nuxt-link class="linkToCatalogo" :to="'/contacto'">formulario de contacto</nuxt-link> que modelo estás buscando y lo capturaremos lo antes posible.</h3>
        </div>
    </div>
</template>

<script>
import Device from '@/components/Device'

export default {
    components:{
        Device
    },
    data(){
        return{
            inputFilterModel: '',
            devices: this.$store.state.devicesList,
            error: false,
            devicesFiltered: ''
        }
    },
    methods:{
        reload(){
            this.$router.push('/')
            setTimeout(() => {
                this.$router.push('/catalogo')
            }, 10);
        }
    },
    mounted () {
        this.$store.dispatch('getDevicesList')
    },
    computed:{
        filteredDevices () {
            try{
                return this.devices.filter( device => {
                    return device.DeviceName.toLowerCase().includes(this.inputFilterModel.toLowerCase())
                }) 
            } catch (err) {
                this.error = true
            }
        }
    }
}
</script>

<style>
.inputModel{
    display: block;
    margin: 0 auto;
    width: 80%;
}
.containerCatalogo{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 2%;
}
.deviceCat{
    max-width: 300px;
}
.notFoundCatalogo{
    margin-top: 8%;
}
.notFoundCatalogo h3{
    font-size: 1em;
    padding: 20%;
}
@media (min-width: 640px){
    .inputModel{
        margin: 20px auto;
        width: 50%;
    }
}
</style>