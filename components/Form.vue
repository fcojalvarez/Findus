<template>
    <div class="container" :class="{ backgroundForm: !seleccion.resultado }">
    <div :class="{ containerAllWithResult: seleccion.isFound, containerAll: !seleccion.isFound }">
      <form v-show="seleccion.form1">
        <h3 class="subtitle">¿Qué sistema operativo prefieres?</h3>
        <el-radio-group v-model="infoData.so">
          <el-radio-button label="Indiferente"></el-radio-button>
          <el-radio-button label="Android"></el-radio-button>
          <el-radio-button label="iOS"></el-radio-button>
        </el-radio-group>
        <br>
        <el-button class="btnPrim" type="primary" @click.prevent="useOk">Siguiente</el-button>
      </form>
      <form v-if="seleccion.form2">
        <h3 class="subtitle">¿Tamaño de la pantalla?</h3>
        <el-radio-group v-model="infoData.display">
          <el-radio-button label="Indiferente"></el-radio-button>
          <el-radio-button label="Menos de 6'"></el-radio-button>
          <el-radio-button label="Más de 6'"></el-radio-button>
        </el-radio-group>
        <br>
        <el-button class="btnPrim" type="primary" @click.prevent="pantallaOk">Siguiente</el-button>
      </form>
      <form v-if="seleccion.form3">
        <h3 class="subtitle">¿Cuánta memoria RAM?</h3>
        <el-radio-group v-model="infoData.ram">
          <el-radio-button label="Indiferente"></el-radio-button>
          <el-radio-button label="Menos de 8GB"></el-radio-button>
          <el-radio-button label="Más de 8GB"></el-radio-button>
        </el-radio-group>
        <br>
        <el-button class="btnPrim" type="primary" @click.prevent="ramOk">Siguiente</el-button>
      </form>
      <form v-if="seleccion.form4">
        <h3 class="subtitle">¿Cuánto almacenamiento interno?</h3>
        <el-radio-group v-model="infoData.rom">
          <el-radio-button label="Indiferente"></el-radio-button>
          <el-radio-button label="Menos de 128GB"></el-radio-button>
          <el-radio-button label="Más de 128GB"></el-radio-button>
        </el-radio-group>
        <br>
        <el-button class="btnPrim" type="primary" @click.prevent="almacenamientoOk">Siguiente</el-button>
      </form>
      <form v-if="seleccion.form5">
        <h3 class="subtitle">¿Cuál es tu presupuesto máximo?</h3>
        <div class="block">
            <span class="textDesc">{{infoData.price}}€</span>
            <el-slider
            v-model="infoData.price"
            :max="1500">
            </el-slider>
        </div>
        <br>
        <el-button class="btnPrim" type="primary" @click.prevent="precioOk">Siguiente</el-button>
      </form>
      <form v-if="seleccion.form6">
        <h3 class="subtitle">¿Le interesa alguna característica más?</h3>
        <div>
            <el-checkbox-group v-model="infoData.features">
            <el-checkbox style="margin-top: 20px" v-for="item in features" :label="item" border :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <br>
        <el-button class="btnPrim" type="primary" @click.prevent="moreOk">Siguiente</el-button>
      </form>

      <el-progress v-show="pointAct > 0 && pointAct < 100" class="progressBar" color="yellow" :percentage="pointAct"></el-progress>
      <h3 class="subtitle" v-if="seleccion.isFound">Te recomendamos estos dispositivos</h3>
      <h3 class="subtitle" v-if="seleccion.notFound">Parece que según sus necesidades aún no tenemos nada para usted.<br>Lo sentimos.</h3>
      <div class="continarDeviceRecomend" v-show="seleccion.isFound">
        <Device v-for="device in devicesRecomend" :id="device._id" :key="device._id"></Device>
      </div>
     
    </div>
     
  </div>
</template>

<script>
import Device from '@/components/Device'

const featuresOptions = ['Sensor de huella', 'Desbloqueo facial', 'Carga inalámbrica', 'Carga rápida', 'Radio FM', 'Dual SIM', 'Jack 3.5mm']
export default {
  name: 'Form',
  components:{
    Device
  },
  data () {
    return {
      seleccion: {
            form1: true,
            form2: false,
            form3: false,
            form4: false,
            form5: false,
            form6: false,
            resultado: false,
            isFound: false,
            notFound: false
        },
      infoData: {
        so: 'Indiferente',
        display: 'Indiferente',
        ram: 'Indiferente',
        rom: 'Indiferente',
        price: 650,
        features: [],
      },
      features: featuresOptions,
      devicesRecomend: '',
      pointAct: 0
    };
  },
  methods: {
    useOk(){
      this.seleccion.form1 = false;
      this.seleccion.form2 = true;
      this.pointAct += 15
    },
    pantallaOk(){
      this.seleccion.form2 = false;
      this.seleccion.form3 = true;
      this.pointAct += 15
    },
    ramOk(){
      this.seleccion.form3 = false;
      this.seleccion.form4 = true;
      this.pointAct += 20
    },
    almacenamientoOk(){
      this.seleccion.form4 = false;
      this.seleccion.form5 = true;
      this.pointAct += 15
    },
    precioOk(){
      this.seleccion.form5 = false;
      this.seleccion.form6 = true;
      this.pointAct += 15
    },
    moreOk(){
      this.seleccion.form6 = false;
      this.seleccion.isFound = true
      this.pointAct += 20
      this.getDevicedRecomend(this.infoData)
    },
    async getDevicedRecomend(result){
      try {
      
        let deviceFiltered = await this.$axios.post(`devicesFilter`, result);
        this.devicesRecomend = deviceFiltered.data

        if (this.devicesRecomend.length > 0) {
          this.seleccion.isFound = true
          this.$store.commit('hideRandomDevices')    
        } else {
          this.seleccion.notFound = true
        }
      } catch (err) {
        console.log(err)
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
  min-height: 70vh;
  display: block;
  text-align: center;
}
form{
  width:90%;
  margin: 0 auto;
}
.containerAll{
  padding-top: 50%;
}
.btnPrim{
  border: 1px solid var(--color-bg);
  margin: 20px;
  color: var(--color-bg);
  background: rgba(68, 68, 68, 0);
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
.containerAllWithResult{
  padding-top:5%!important;
}
@media (min-width: 600px) {
  .container {
    background-size:40%;
    min-height: 90vh;
  }
  .backgroundForm{
    background-size: 35%;
  }
  .continarDeviceRecomend{
    display: flex;
  }
  .devices{
    width:90%;
    justify-content: space-evenly;
  }
  .containerAll{
  padding-top: 20%;
}
} 
</style>