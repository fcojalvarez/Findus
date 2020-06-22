<template>
    <div class="container" :class="{ backgroundForm: !seleccion[6] }">
      <div :class="{ containerAllWithResult: seleccion[7] , containerAll: !seleccion[7] }">
        <form v-for="(form, i) in forms" :key="i" v-show="seleccion[i]">
          <h3 class="subtitle">{{titleForm[i]}}</h3>

          <el-radio-group v-model="infoData[form]" v-show="form !== 'price' && form !== 'features'">
            <el-radio-button v-for="(label, index) in labels[i]" :label="labels[i][index]" :key="label+index"></el-radio-button>
          </el-radio-group>

          <div class="block" v-show="form === 'price'">
              <span class="textDesc">{{infoData.price}}€</span>
              <el-slider
              v-model="infoData.price"
              :max="1500">
              </el-slider>
          </div>

          <div>
              <el-checkbox-group v-model="infoData.features" v-show="form === 'features'">
              <el-checkbox style="margin-top: 20px" v-for="item in features" :label="item" border :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>
          </div>
          <br>
          <el-button class="btnPrim" type="primary" @click.prevent="nextStep(forms[i])">Siguiente</el-button>
        </form>

        <el-progress v-show="pointAct > 0 && pointAct < 100" class="progressBar" color="yellow" :percentage="pointAct"></el-progress>
        </div>
        <div>
          <h3 class="subtitle pt10" v-show="seleccion[7]">Te recomendamos estos dispositivos</h3>
          <h3 class="subtitle" v-show="seleccion[8]">Parece que según sus necesidades aún no tenemos nada para usted.<br>Lo sentimos.</h3>
          <div class="containerDeviceRecomend" v-show="seleccion[7]">
            <Device v-for="device in devicesRecomend" :id="device._id" :key="device._id"></Device>
          </div>
        </div>
  </div>
</template>

<script>
import Device from '@/components/Device'

export default {
  name: 'formHome',
  components:{
    Device
  },
  data () {
    return {
      forms: ['so','display','ram','rom','price','features'],
      titleForm: ['¿Qué sistema operativo prefiere?', '¿Tamaño de la pantalla?', '¿Cuánta memoria RAM?', '¿Cuánto almacenamiento interno?', '¿Cuál es tu presupuesto máximo?' , '¿Le interesa alguna característica más?'],
      labels: [
        ['Indiferente', 'Android', 'IOS'],
        ['Indiferente', "Menos de 6'", "Más de 6'"],
        ['Indiferente', 'Menos de 8GB', 'Más de 8GB'],
        ['Indiferente', 'Menos de 128GB', 'Más de 128GB'],
        [650],
        ['Sensor de huella', 'Desbloqueo facial', 'Carga inalámbrica', 'Carga rápida', 'Radio FM', 'Dual SIM', 'Jack 3.5mm'],
      ],
      features: ['Sensor de huella', 'Desbloqueo facial', 'Carga inalámbrica', 'Carga rápida', 'Radio FM', 'Dual SIM', 'Jack 3.5mm'],
      seleccion: [true,false,false,false,false,false,false,false,false],
      infoData: {
        so: 'Indiferente',
        display: 'Indiferente',
        ram: 'Indiferente',
        rom: 'Indiferente',
        price: 650,
        features: [],
      },
      devicesRecomend: '',
      pointAct: 0
    }
  },
  methods: {
    nextStep(step){
      if(step === 'so'){
        this.seleccion[0] = false;
        this.seleccion[1] = true;
        this.pointAct += 15
      }
      if(step === 'display'){
        this.seleccion[1] = false;
        this.seleccion[2] = true;

         this.pointAct += 15
      }
      if(step === 'ram'){
        this.seleccion[2] = false;
        this.seleccion[3] = true;

         this.pointAct += 20
      }
      if(step === 'rom'){
        this.seleccion[3] = false;
        this.seleccion[4] = true;
        this.pointAct += 15
      }
      if(step === 'price'){
        this.seleccion[4] = false;
        this.seleccion[5] = true;
        this.pointAct += 15
      }
      if(step === 'features'){
        this.seleccion[5] = false;
        this.seleccion[6] = true;
        this.pointAct += 20
        this.getDevicedRecomend(this.infoData)
      }
    },
    async getDevicedRecomend(result){
      try {
        let deviceFiltered = await this.$axios.post('devicesFilter', result);
        this.devicesRecomend = deviceFiltered.data
        if(this.devicesRecomend.length === 0){
          this.seleccion[8] = true
          return
        }
        this.seleccion[7] = true;
        this.$store.commit('hideRandomDevices')
      } catch (err) {
      }
    }
  }
}
</script>

<style>
ul li{
  list-style: none;
}
.backgroundForm{
  background-image: url("https://i.ibb.co/ts405y7/3892620.png");
  background-repeat: no-repeat;
  background-position: 100%;
  background-position-y: 100%;
  background-size: 50%;
} 
.container {
  font-family: Georgia, 'Times New Roman', Times, serif;
  margin: 0 auto;
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
form{
  width:90%;
  margin: 0 auto;
}
.btnPrim{
  border: 1px solid var(--color-bg);
  margin: 20px;
  color: var(--color-bg);
  background: #eee;
}
.dnone{
  color: rgba(170, 170, 170, 0)!important;
}
.btnPrim:hover{
  background:var(--color-bg);
  color: #fff;
  border: 1px solid var(--color-bg);
}
.el-slider__runway{
  width: 50%;
  margin: 30px auto;
}
.pt10{
  padding-top:5%;
}
.subtitle {
  font-weight: 300;
  font-size: 30px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.textDesc{
  font-size: 15px;
  margin-top: 10px;
  margin-bottom:5px;
  color: #444;
  padding-bottom: 0;
}
.progressBar{
  display: inline-block;
  width: 40%;
  margin: 0 auto;
}
.containerDeviceRecomend{
  margin-top: 50px;  
}
.containerAll{
  width: 100%;
}
@media (min-width: 800px) {
  .container {
    background-size:40%;
    min-height: 90vh;
  }
  .backgroundForm{
    background-size: 35%;
  }
  .containerDeviceRecomend{
    display: flex;
    margin-top: 0!important;
  }
  .devices{
    width:90%;
    justify-content: space-evenly;
  }
  .containerAllWithResult{
    background:red;
    margin-top:5%!important;
  }
}
</style>