<template>
    <div class="divDevice">
        <div class="devices">
            <nuxt-link :to="'/devices/'+selectDevice._id">
                <img class="imageDevice" :src="selectDevice.image" alt="Imagen dispositivo">
            </nuxt-link>
            <span class="block brandDevice fontDeviceCenter">{{selectDevice.Brand}}</span>
            <span class="block margin modelDevice fontDeviceCenter">{{selectDevice.DeviceName}}</span>
            <br>
            <i class="fas fa-mobile-alt iconTitle"></i><span class="titleDevice">Pantalla</span>
            <span class="block margin fontDevice">{{selectDevice.size}} Pulgadas</span>
            <br>
            <!-- <i class="fas fa-camera iconTitle"></i><span class="titleDevice">Cámara delantera</span>
            <span class="block fontDevice">{{selectDevice.single}}</span>
            <span class="block margin fontDevice">{{device}}</span>
            <i class="fas fa-camera dnone iconTitle"></i><span class="titleDevice">Cámara trasera</span>
            <span class="block margin fontDevice">{{device}}</span> -->
            <br>
            <i class="fas fa-microchip iconTitle"></i><span class="titleDevice">Procesador</span>
            <span class="block fontDevice margin">{{selectDevice.chipset}}</span>
            <br>
            <i class="fas fa-memory iconTitle"></i><span class="titleDevice">Almacenamiento</span>
            <span class="block margin fontDevice">{{selectDevice.internal}}</span>
            <br>
            <i class="fas fa-battery-full iconTitle"></i><span class="titleDevice">Bateria</span>
            <span class="block margin fontDevice">{{selectDevice.battery_c}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Device',
    props: ['id'],
    computed:{
        selectDevice() {
            let result = this.getSelectDevice(this.id)
            return result
        }
    },
    methods:{
        getSelectDevice(idDevice){
            let deviceList = this.$store.state.devices;
            let findDevice = deviceList.find(device => device._id === idDevice);

            return findDevice
        }
    }
}
</script>

<style>
.devices{
  padding: 15px;
  width: 350px;
  background: #fff;
  text-align: left;
  margin-right: auto;
  margin-left: auto;
}
.imageDevice{
  width: 200px;
  height: 200px;
}
.fontDevice{
  color: #777;
  font-size: 1em;
  margin-left: 35px
}
.fontDeviceCenter{
  color: #777;
  font-size: 1em;
  text-align: center;
}
.titleDevice{
  font-size: 1em;
  color: #111;
  vertical-align: 1px;
}
.brandDevice{
  font-size: 1.2em;
  font-weight: bold;
  color: var(--color-bg)
}
.modelDevice{
  font-size: 1em;
}
.iconTitle{
  color: var(--color-primary);
  font-size: 1.3em;
  margin-right: 15px;
  width: 20px;
}

@media (min-width: 600px) {
  .container {
    background-size:40%;
    min-height: 90vh;
  }
  .divDevice{
    width:80%;
    margin: 0 auto;
  }
  .containerDevices{
    display: flex;
    width: 70%;
    margin:20px auto;
  }
  .imageDevice{
    margin-left: 19%;
  }
  .backgroundForm{
    background-size: 35%;
  }
}
</style>

