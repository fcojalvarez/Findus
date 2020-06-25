<template>
    <div class="divCatalogo">
        <el-input class="inputModel" placeholder="Filtrar según modelo" v-model="inputFilterModel"></el-input>
        <div class="containerCatalogo" v-show="devicesFiltered.length > 0">
            <Device class="deviceCat" v-for="device in filteredDevices" :id="device._id" :key="device._id"></Device>
        </div>
        <div class="notFoundCatalogo" v-show="devicesFiltered.length === 0 && !error">
            <h3 class="NotFound">Ese modelo se nos ha escapado, ayúdanos a encontrarlo.
            <br>
            <br>
            Indícanos a traves del <nuxt-link class="linkToCatalogo" :to="'/contact'">formulario de contacto</nuxt-link> que modelo estás buscando y lo capturaremos lo antes posible.</h3>
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
            devicesFiltered: '',
        }
    },
    mounted () {
        this.$store.dispatch('getDevicesList')
    },
    computed:{
        filteredDevices () {
            try{
                this.devicesFiltered = this.devices.filter( device => {
                    return device.DeviceName.toLowerCase().includes(this.inputFilterModel.toLowerCase())
                }) 
                return this.devicesFiltered
            } catch (err) {
                this.error = true;
            }
        },
        devices() {
            return this.$store.state.devicesList
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
.notFoundCatalogo h3{
    font-size: 1em;
    padding: 10%;
}
@media (min-width: 640px){
    .inputModel{
        margin: 20px auto;
        width: 50%;
    }
    .divCatalogo{
        margin-top: 70px;
    }
}
</style>