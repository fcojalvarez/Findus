<template>
    <div class="container" :class="{ backgroundForm: !seleccion[6][1] }">
      <div :class="{ containerAllWithResult: seleccion[7][1], mainForm: seleccion[6][1] === false }">
        <form v-for="(form, i) in forms" :key="i" v-show="seleccion[i][1]">
          <h3 class="subtitle">{{titleForm[i]}}</h3>

          <el-radio-group v-model="infoData[form]" v-show="form !== 'price' && form !== 'features'">
            <el-radio-button v-for="(label, index) in labels[i]" :label="labels[i][index]" :key="label+index"></el-radio-button>
          </el-radio-group>

          <div class="block" v-show="form === 'price'">
              <span class="textDesc">{{infoData.price}}€</span>
              <el-slider
                class="sliderPrice"
                v-model="infoData.price"
                :show-tooltip="false"
                :max="1500">
              </el-slider>
              <el-input-number v-model="infoData.price" :max="1500"></el-input-number>
          </div>

          <div>
              <el-checkbox-group v-model="infoData.features" v-show="form === 'features'">
              <el-checkbox style="margin-top: 20px" v-for="item in features" :label="item" border :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>
          </div>
          <br>
          <el-button class="btnPrim" type="primary" @click.prevent="nextStep(forms[i])">Siguiente</el-button>
        </form>
        <p class="pointAct" v-show="pointAct !== 7">Paso {{pointAct}} de 7</p>
        </div>
        <h3 class="subtitle NotFound" v-show="seleccion[8][1]">Según sus necesidades, aún no tenemos nada para usted.
        <br>
        <br>
        Si lo desea, vuelva a realizar el cuestionario con diferentes opciones.</h3>
        <div>
          <h3 class="subtitle pt10" v-show="seleccion[7][1]">Te recomendamos estos dispositivos</h3>
          <div class="containerDeviceRecomend" v-show="seleccion[7][1]">
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
      forms: ['so','price','display','ram','rom','features'],
      titleForm: ['¿Qué sistema operativo prefiere?','¿Cuál es tu presupuesto máximo?', '¿Tamaño de la pantalla?', '¿Cuánta memoria RAM?', '¿Cuánto almacenamiento interno?', '¿Le interesa alguna característica más?'],
      labels: [
        ['Indiferente', 'Android', 'IOS'],
        [650],
        ['Indiferente', "Menos de 6'", "Más de 6'"],
        ['Indiferente', 'Menos de 8GB', 'Más de 8GB'],
        ['Indiferente', 'Menos de 128GB', 'Más de 128GB'],
        ['Sensor de huella', 'Desbloqueo facial', 'Carga inalámbrica', 'Carga rápida', 'Radio FM', 'Dual SIM', 'Jack 3.5mm'],
      ],
      features: ['Sensor de huella', 'Desbloqueo facial', 'Carga inalámbrica', 'Carga rápida', 'Radio FM', 'Dual SIM', 'Jack 3.5mm'],
      seleccion: Object.entries({
        showSo : true,
        showDisplay : false,
        showRam : false,
        showRom : false,
        showPrice : false,
        showFeatures : false,
        result : false,
        found : false,
        notFound : false,
      }),
      infoData: {
        so: 'Indiferente',
        display: 'Indiferente',
        ram: 'Indiferente',
        rom: 'Indiferente',
        price: 650,
        features: [],
      },
      devicesRecomend: '',
      pointAct: 1
    }
  },
  methods: {
    nextStep(step){
      if(step === 'so'){
        this.seleccion[0][1] = false;
        this.seleccion[1][1]  = true;
        this.pointAct ++
      }
      if(step === 'price'){
        this.seleccion[1][1]  = false;
        this.seleccion[2][1]  = true;
        this.pointAct ++
      }
      if(step === 'display'){
        this.seleccion[2][1]  = false;
        this.seleccion[3][1]  = true;
        this.pointAct ++
      }
      if(step === 'ram'){
        this.seleccion[3][1]  = false;
        this.seleccion[4][1]  = true;
        this.pointAct ++
      }
      if(step === 'rom'){
        this.seleccion[4][1]  = false;
        this.seleccion[5][1]  = true;
        this.pointAct ++
      }
      if(step === 'features'){
        this.seleccion[5][1]  = false;
        this.seleccion[6][1]  = true;
        this.pointAct ++
        this.getDevicedRecomend(this.infoData)
      }
    },
    async getDevicedRecomend(result){
      try {
        const deviceFiltered = await this.$axios.post('devicesFilter', result);
        this.devicesRecomend = deviceFiltered.data
        if(this.devicesRecomend.length === 0){
          this.seleccion[8][1] = true
          this.seleccion[7][1] = false
          return
        }
        this.seleccion[7][1] = true;
        
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
  min-height: 68vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.mainform{
  width:80%;
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
.NotFound{
  width: 80%;
  margin: 0 auto;
}
.inputPrice{
  width: 60px;
  display: block;
  margin: 0 auto;
  height: 50px;
}
.pointAct{
  margin-bottom: 70px;
  color: #555;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1em;
}
form{
  padding: 20px 10px;
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
    padding: 0 20px;
  }
  .devices{
    width:90%;
    justify-content: space-evenly;
  }
  .containerAllWithResult{
    margin-top:5%!important;
    display: block;
  }
  .inputPrice{
    display: none;
  }
}
</style>