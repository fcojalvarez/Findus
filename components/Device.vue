<template>
    <div class="divDevice">
        <div class="devices">
            <div class="divCenter">
              <nuxt-link :to="'/devices/'+selectDevice._id" target="_blank">
                <img class="imageDevice" :src="selectDevice.image" alt="Imagen dispositivo">
              </nuxt-link>
            </div>
            <span class="block brandDevice fontDeviceCenter">{{selectDevice.Brand}}</span>
            <span class="block margin modelDevice fontDeviceCenter">{{selectDevice.DeviceName}}</span>
            <span v-for="os in selectDevice.os" class="block margin modelDevice fontDeviceCenter" :key="os">
              {{os.split(';')[0]}}
            </span>
            <el-button v-show="isAuth && currentPage !== 'userPage'" class="btnFavorite btnAddFavourite" @click.prevent="addDeviceFavorite">Añadir a favoritos</el-button>

            <el-button v-show="isAuth && currentPage === 'userPage'" class="btnFavorite btnDelFavourite" @click.prevent="delDeviceFavorite">Eliminar favorito</el-button>
            <br>
            <i class="fas fa-microchip iconTitle"></i><span class="titleDevice">Pantalla</span>
            <span v-for="(display, index) in selectDevice.display" class="block fontDevice margin" :key="display">
              {{display}} 
              <span v-if="selectDevice.display[index] === selectDevice.display[1]"> Pulgadas</span>
              <span v-if="selectDevice.display[index] === selectDevice.display[2]"> Ratio de pantalla</span>
            </span>
            <br>
            <i class="fas fa-camera iconTitle"></i><span class="titleDevice">Cámara trasera</span>
            <span v-for="(frontCam, index) in selectDevice.camera" class="block fontDevice margin" :key="frontCam + index">
              {{frontCam}}
            </span>
            <br>
            <i class="fas fa-microchip iconTitle"></i><span class="titleDevice">Procesador</span>
            <span class="block fontDevice margin">{{selectDevice.cpu}}</span>
            <br>
            <i class="fas fa-memory iconTitle"></i><span class="titleDevice">Almacenamiento</span>
            <span v-for="(item, index) in selectDevice.rom" class="block margin fontDevice" :key="item + index">
              {{selectDevice.rom[index]}} GB
            </span>
            <i class="fas fa-memory iconTitle"></i><span class="titleDevice">Memoria RAM</span>
            <span v-for="(item, index) in selectDevice.rom" class="block margin fontDevice" :key="index">
              {{selectDevice.rom[index]}} GB
            </span>
            <br>
            <i class="fas fa-battery-full iconTitle"></i><span class="titleDevice">Bateria</span>
            <span class="block margin fontDevice">{{selectDevice.battery}}</span>
            <br>
            <i class="fas fa-plus-circle iconTitle"></i><span class="titleDevice">Caracterísitcas adionales</span>
            <span v-for="(features, index) in selectDevice.features" class="block margin fontDevice" :key="index">
              {{features}}
            </span>
            <br>
            <i class="fas fa-euro-sign iconTitle"></i><span class="titleDevice">Precio</span>
            <span class="block margin fontDevice">{{selectDevice.price}} €</span>
            <br>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default {
    name: 'Device',
    props: ['id'],
    
    data(){
      return{
        selectDevice: '',
        currentPage: this.$route.name
      }
    },
    computed:{
      isAuth(){
        return this.$store.state.isAuth
      }
    },
    methods:{
        async getSelectDevice(deviceID){
          let findDevice = await this.$axios.get(`/devices/${deviceID}`)

          this.selectDevice = findDevice.data
        },
        async addDeviceFavorite(){
          try {
            const token = window.localStorage.getItem('token')
            let resultToken = token != null
            let userID

            if (token !== null) {
                let tokenDecoded = jwt_decode(token)
                userID = tokenDecoded.id
            }

            let devicesFavorites = this.selectDevice.devicesFavorites

            let addFavorite = await this.$axios.post(`users/${userID}/addDevicesFavorites`, { deviceID : this.selectDevice._id }, {
                      headers: { Authorization: `Bearer ${token}` }
                })

            this.$message({
              message: 'Se ha añadido a sus dispositivos favoritos correctamente.',
              type: 'success',
              duration: 2000
            });

          } catch (err) {
                this.$message({
                    message: 'Ha ocurrido un error.',
                    type: 'error',
                    duration: 2000
                });
          }
        },
        async delDeviceFavorite(){
          try {
            const token = window.localStorage.getItem('token')
            let resultToken = token != null
            let userID

            if (token !== null) {
                let tokenDecoded = jwt_decode(token)
                userID = tokenDecoded.id
            }

            let devicesFavorites = this.selectDevice.devicesFavorites

            let delFavorite = await this.$axios.post(`users/${userID}/delDevicesFavorites`,
                    { deviceID : this.selectDevice._id },
                     { headers: { Authorization: `Bearer ${token}`} })

            this.$message({
              showClose: true,
              message: 'Se ha eliminado correctamente.',
              type: 'success'
            });

            this.$store.dispatch('getDevicesFavorites')
          } catch (err) {
            console.log(err)

          }
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
  margin: auto;
  display: block;
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
  color: var(--color-bg);
  font-size: 1.3em;
  margin-right: 15px;
  width: 20px;
}
.devices img {
  width: 200px;
  height: 300px;
}
.btnFavorite{
  display: block;
  margin: 10px auto;
  background: var(--color-primary);
  padding: 10px 20px;
  font-size: 0.9em;
}
.btnAddFavourite{
  background: var(--color-primary);
}
.btnAddFavourite:hover{
  background: var(--color-bg);
    color: #fff;
}
.btnDelFavourite{
  background: rgb(226, 58, 58);
  color: #fff;
}
.btnDelFavourite:hover{
  background: var(--color-bg);
  color: #fff;
}
@media (min-width: 600px) {
  .container {
    background-size:40%;
    min-height: 90vh;
  }
  .divDevice{
    width:40%;
    margin: 0 auto;
  }
  .containerDevices{
    display: flex;
    width: 80%;
    margin:20px auto;
  }
  .backgroundForm{
    background-size: 35%;
  }
}
</style>

