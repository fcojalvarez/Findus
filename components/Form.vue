<template>
    <div class="container backgroundForm">
    <div class="containerAll">
      <form v-show="!seleccion.form1">
        <h3 class="subtitle">¿Qué sistema operativo prefieres?</h3>
        <el-radio-group v-model="infoData.sistemaOperativo">
          <el-radio-button label="Android"></el-radio-button>
          <el-radio-button label="IOS"></el-radio-button>
          <el-radio-button label="Cualquiera"></el-radio-button>
        </el-radio-group>
        <br>
        <el-button class="btnPrim" type="primary" @click.prevent="useOk">Siguiente</el-button>
      </form>
      <form v-if="!seleccion.form2">
        <h3 class="subtitle">¿Tamaño de la pantalla?</h3>
        <el-radio-group v-model="infoData.pantalla">
          <el-radio-button label="Menos de 5'"></el-radio-button>
          <el-radio-button label="Entre 5' y 6'"></el-radio-button>
          <el-radio-button label="Más de 6'"></el-radio-button>
        </el-radio-group>
        <br>
        <el-button class="btnPrim" type="primary" @click.prevent="pantallaOk">Siguiente</el-button>
      </form>
      <form v-if="!seleccion.form3">
        <h3 class="subtitle">¿Cuánto le importan las cámaras?</h3>
        <p class="subtitle textDesc">Cámara frontal</p>
        <el-radio-group v-model="infoData.camaraFrontal">
          <el-radio-button label="Poco"></el-radio-button>
          <el-radio-button label="Normal"></el-radio-button>
          <el-radio-button label="Mucho"></el-radio-button>
        </el-radio-group>
        <br>
        <p class="subtitle textDesc">Cámara trasera</p>
        <el-radio-group v-model="infoData.camaraTrasera">
          <el-radio-button label="Poco"></el-radio-button>
          <el-radio-button label="Normal"></el-radio-button>
          <el-radio-button label="Mucho"></el-radio-button>
        </el-radio-group>
        <br>
        <el-button class="btnPrim" type="primary" @click.prevent="camarasOk">Siguiente</el-button>
      </form>
      <form v-if="!seleccion.form4">
        <h3 class="subtitle">¿Cuánta memoria RAM?</h3>
        <el-radio-group v-model="infoData.memoriaRam">
          <el-radio-button label="Menos de 8GB"></el-radio-button>
          <el-radio-button label="Más de 8GB"></el-radio-button>
        </el-radio-group>
        <br>
        <el-button class="btnPrim" type="primary" @click.prevent="ramOk">Siguiente</el-button>
      </form>
      <form v-if="!seleccion.form5">
        <h3 class="subtitle">¿Cuánto almacenamiento interno?</h3>
        <el-radio-group v-model="infoData.almacenamiento">
          <el-radio-button label="64GB"></el-radio-button>
          <el-radio-button label="128GB"></el-radio-button>
          <el-radio-button label="Más de 128GB"></el-radio-button>
        </el-radio-group>
        <br>
        <el-button class="btnPrim" type="primary" @click.prevent="almacenamientoOk">Siguiente</el-button>
      </form>
      <form v-if="!seleccion.form6">
        <h3 class="subtitle">¿Cuál es tu presupuesto máximo?</h3>
        <div class="block">
            <span class="textDesc">{{infoData.precio}}€</span>
            <el-slider
            v-model="infoData.precio"
            :max="1500">
            </el-slider>
        </div>
        <br>
        <el-button class="btnPrim" type="primary" @click.prevent="precioOk">Siguiente</el-button>
      </form>
      <form v-if="!seleccion.form7">
        <h3 class="subtitle">¿Le interesa alguna característica más?</h3>
        <div>
            <el-checkbox-group v-model="infoData.more">
            <el-checkbox style="margin-top: 20px" v-for="item in features" :label="item" border :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <br>
        <el-button class="btnPrim" type="primary" @click.prevent="moreOk">Siguiente</el-button>
      </form>

      <el-progress v-show="pointAct > 0 && pointAct < 100" class="progressBar" color="yellow" :percentage="pointAct"></el-progress>

      <div v-for="device in devicesRecomend" :key="device._id" v-show="!seleccion.resultado">
          <Device :id="device._id"></Device>
      </div>
     
    </div>
     
  </div>
</template>

<script>
import Device from '@/components/Device'

const featuresOptions = ['Sensor de huella', 'Desbloqueo facial', 'Carga inalámbrica', 'Carga rápida', 'Radio FM', 'Dual SIM', 'Jack 3.5mm', 'Actualizaciones']
export default {
  name: 'Form',
  components:{
    Device
  },
  computed: {
    devices () {
        return this.$store.state.devices
    }
  },
  mounted(){
    this.$store.dispatch('getDevices')
  },
  data () {
    return {
      seleccion: {
            form1: '',
            form2: 'false',
            form3: 'false',
            form4: 'false',
            form5: 'false',
            form6: 'false',
            form7: 'false',
            resultado: 'false'
        },
      infoData: {
        sistemaOperativo: '',
        pantalla: '',
        camaraFrontal: '',
        camaraTrasera: '',
        almacenamiento: '',
        precio: 650,
        more: [],
      },
      features: featuresOptions,
      devicesRecomend: [],
      pointAct: 0
    };
  },
  methods: {
    useOk(){
      this.seleccion.form1 = true;
      this.seleccion.form2 = false;
      this.pointAct += 10
    },
    pantallaOk(){
      this.seleccion.form2 = true;
      this.seleccion.form3 = false;
      this.pointAct += 10
    },
    camarasOk(){
      this.seleccion.form3 = true;
      this.seleccion.form4 = false;
      this.pointAct += 25
    },
    ramOk(){
      this.seleccion.form4 = true;
      this.seleccion.form5 = false;
      this.pointAct += 10
    },
    almacenamientoOk(){
      this.seleccion.form5 = true;
      this.seleccion.form6 = false;
      this.pointAct += 10
    },
    precioOk(){
      this.seleccion.form6 = true;
      this.seleccion.form7 = false;
      this.pointAct += 10
    },
    moreOk(){
      this.seleccion.form7 = true;
      this.seleccion.resultado = false
      this.pointAct += 25
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
  padding-top: 15%;
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
  width: 70%;
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
@media (min-width: 600px) {
  .container {
    background-size:40%;
    min-height: 90vh;
  }
  .containerDevices{
    display: flex;
    width: 70%;
    margin:20px auto;
  }
  .backgroundForm{
    background-size: 35%;
  }
} 
</style>