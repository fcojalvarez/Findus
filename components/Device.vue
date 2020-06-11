<template>
    <div class="divDevice">
        <div class="devices">
           <nuxt-link :to="'/devices/'+selectDevice._id">
                <img class="imageDevice" :src="selectDevice.image" alt="Imagen dispositivo">
            </nuxt-link>
            <span class="block brandDevice fontDeviceCenter">{{selectDevice.Brand}}</span>
            <span class="block margin modelDevice fontDeviceCenter">{{selectDevice.DeviceName}}</span>
            <br>
            <span v-for="os in selectDevice.os" class="block margin modelDevice fontDeviceCenter" :key="os">
              {{os.split(';')[0]}}
            </span>
            <br>
            <i class="fas fa-microchip iconTitle"></i><span class="titleDevice">Pantalla</span>
            <span v-for="(display, index) in selectDevice.display" class="block fontDevice margin" :key="display">
              {{display}} 
              <span v-if="selectDevice.display[index] === selectDevice.display[1]"> Pulgadas</span>
              <span v-if="selectDevice.display[index] === selectDevice.display[2]"> Ratio de pantalla</span>
            </span>
            <br>
            <i class="fas fa-microchip iconTitle"></i><span class="titleDevice">Cámara trasera</span>
            <span v-for="frontCam in selectDevice.camera" class="block fontDevice margin" :key="frontCam">
              {{frontCam}}
            </span>
            <br>
            <i class="fas fa-microchip iconTitle"></i><span class="titleDevice">Procesador</span>
            <span class="block fontDevice margin">{{selectDevice.cpu}}</span>
            <br>
            <i class="fas fa-memory iconTitle"></i><span class="titleDevice">Almacenamiento</span>
            <span v-for="(item, index) in selectDevice.storage" class="block margin fontDevice" :key="item">
              {{selectDevice.storage[index]}}
            </span>
            <br>
            <i class="fas fa-battery-full iconTitle"></i><span class="titleDevice">Bateria</span>
            <span class="block margin fontDevice">{{selectDevice.battery}}</span>
            <br>
            <i class="fas fa-battery-full iconTitle"></i><span class="titleDevice">Sensores</span>
            <span v-for="features in selectDevice.sensors" class="block margin fontDevice" :key="features">
              {{features}}
            </span>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Device',
    props: ['id'],
    data(){
      return{
        selectDevice: ''
      }
    },
    methods:{
        async getSelectDevice(deviceID){
          let findDevice = await this.$axios.get(`/devices/${deviceID}`)

          this.selectDevice = findDevice.data
        }
    },
    mounted(){
      this.getSelectDevice(this.id)
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
.devices img {
  width: 200px;
  height: 300px;

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

