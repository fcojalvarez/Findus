<template>
    <div class="divDevice">
        <div class="devices">
            <button class="btnBackHome" v-if="currentPage === 'devices-id'" @click="goBack">Volver atrás</button>
            <div class="divCenter">
              <nuxt-link :to="'/devices/'+selectDevice._id">
                <img class="imageDevice" :src="selectDevice.image" alt="Imagen dispositivo">
              </nuxt-link>
            </div>
            <span class="block brandDevice fontDeviceCenter">{{selectDevice.Brand}}</span>
            <span class="block margin modelDevice fontDeviceCenter">{{selectDevice.DeviceName}}</span>
            <span v-for="os in selectDevice.os" class="block margin modelDevice fontDeviceCenter" :key="os">
              {{os.split(';')[0]}}
            </span>
            <el-button v-show="!isFavorite" class="btn btnAddFavourite" @click.prevent="addDeviceFavorite">Añadir a favoritos</el-button>
            <el-button v-show="showBtnRegister && !isAuth" class="btn btnRegister" @click.prevent="goToRegister">Regístrese</el-button>
            <el-button v-show="isAuth && isFavorite" class="btn btnDelFavourite" @click.prevent="delDeviceFavorite">Eliminar favorito</el-button>
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
            <span v-for="(item, index) in selectDevice.ram" class="block margin fontDevice" :key="index">
              {{selectDevice.ram[index]}} GB
            </span>
            <br>
            <i class="fas fa-battery-full iconTitle"></i><span class="titleDevice">Batería</span>
            <span class="block margin fontDevice">{{selectDevice.battery}}</span>
            <br>
            <i class="fas fa-plus-circle iconTitle"></i><span class="titleDevice">Caracterísitcas adicionales</span>
            <span v-for="(feature, index) in selectDevice.features" class="block margin fontDevice" :key="index">
              <span>{{feature}}</span>
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
        currentPage: this.$route.name,
        showBtnRegister: false
      }
    },
    computed:{
      isAuth(){
        return this.$store.state.isAuth
      },
      isFavorite(){
        const devicesFavoriteList = this.$store.state.devicesFavorites.map( device => device._id )
        return devicesFavoriteList.includes(this.selectDevice._id)
      }
    },
    methods:{
        async getSelectDevice(deviceID){
          const findDevice = await this.$axios.get(`/devices/${deviceID}`)
          this.selectDevice = findDevice.data
        },
        async addDeviceFavorite(){
          try {
            const token = window.localStorage.getItem('token')
            const resultToken = token != null
            let userID

            if (token !== null) {
                const tokenDecoded = jwt_decode(token)
                userID = tokenDecoded.id
            }

            if ( !this.isAuth ) {
              this.$message({ 
                showClose: true,
                message: 'Sólo los usuarios registrados pueden añadir a favoritos, regístrate.',
                type: 'error',
                duration: 3300
              });
            this.showBtnRegister = true
            return
            }
            const addFavorite = await this.$axios.post(`users/${userID}/addDevicesFavorites`, { deviceID : this.selectDevice._id }, {
                      headers: { Authorization: `Bearer ${token}` }
                })
            if(addFavorite.data === 'duplicate') {
              this.$message({ message: 'Ya ha añadido este dispositivo como favorito.', type: 'warning', duration: 2500 });
              return
            }
            this.$store.dispatch('getDevicesFavorites')
          } catch (err) {
            console.log(err)
          }
        },
        async delDeviceFavorite(){
          try {
            const token = window.localStorage.getItem('token')
            const resultToken = token != null
            let userID

            if (token !== null) {
                const tokenDecoded = jwt_decode(token)
                userID = tokenDecoded.id
            }

            let delFavorite = await this.$axios.post(`users/${userID}/delDevicesFavorites`,
                    { deviceID : this.selectDevice._id },
                     { headers: { Authorization: `Bearer ${token}`} })

            this.$store.dispatch('getDevicesFavorites')
          } catch (err) {
          }
        },
        goToRegister(){
          this.$router.push('/register')
        },
        goBack(){
          window.history.back()
        }
    },
    mounted(){
      this.getSelectDevice(this.id),
      this.$store.dispatch('getDevicesFavorites')
    }
}
</script>

<style>
.devices{
  padding: 40px;
  background: #fff;
  text-align: left;
  margin-right: auto;
  margin-left: auto;
  max-width: 300px;
}
.imageDevice{
  width: 200px;
  height: 200px;
  margin: 10px auto;
  display: block;
}
.fontDevice{
  color: #777;
  font-size: 1em;
  margin-left: 54px;
  margin-top: 5px;
}
.fontDeviceCenter{
  color: #777;
  font-size: 1em;
  text-align: center;
}
.btnBackHome{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 30px;
  font-size: 0.9em;
  margin: 10px 0 40px 0;
  color: #333;
  font-weight: bold;
  background: none;
  border: none;
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
.btn{
  width: 155px;
  display: block;
  margin: 10px auto!important;
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
.btnRegister{
  color: var(--color-primary);
  background: var(--color-bg);
}
.btnRegister:hover{
  color: var(--color-bg);
  background: var(--color-primary);
}
@media (min-width: 800px) {
  .container {
    background-size:40%;
    min-height: 90vh;
  }
  .divDevice{
    width:40%;
    margin: 10px auto 0;
  }
  .containerDevices{
    display: flex;
    margin:20px 0;
  }
  .backgroundForm{
    background-size: 35%;
  }
  .devices{
    padding: 10px;
  }
}
@media (min-width: 950px) {
  .containerDevices{
    margin:20px auto;
  }
}
</style>

