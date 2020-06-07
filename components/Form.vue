<template>
    <div class="container backgroundForm">
    <div>
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
            max="1500">
            </el-slider>
        </div>
        <br>
        <el-button class="btnPrim" type="primary" @click.prevent="precioOk">Siguiente</el-button>
      </form>
      <form v-if="!seleccion.form7">
        <h3 class="subtitle">¿Le interesa alguna característica más?</h3>
        <div>
            <el-checkbox-group v-model="infoData.more">
            <el-checkbox-button v-for="item in features" :label="item" :key="item">{{item}}</el-checkbox-button>
            </el-checkbox-group>
        </div>
        <br>
        <el-button class="btnPrim" type="primary" @click.prevent="moreOk">Siguiente</el-button>
      </form>
      <div v-show="!seleccion.resultado">
        <h4>Tu elección ha sido:</h4>
        <ul>
          <li>Sistema operativo: {{infoData.sistemaOperativo}}</li>
          <br>
          <li>Pantalla: {{infoData.pantalla}}</li>
          <br>
              <ul>Cámaras:
                  <li>Frontal: {{infoData.camaraFrontal}}</li>
                  <li>Trasera: {{infoData.camaraTrasera}}</li>
              </ul>
              <br>
          <li>Almacenamiento: {{infoData.almacenamiento}}</li>
          <br>
          <li>Presupuesto máximo: {{infoData.precio}}€</li>
          <br>
          <li>Más características: {{infoData.more}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const featuresOptions = ['Sensor de huella', 'Desbloqueo facial', 'Carga inalámbrica', 'Carga rápida', 'Radio FM', 'Dual SIM', 'Jack 3.5mm', 'Actualizaciones']
export default {
  components: {
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
      features: featuresOptions
    };
  },
  methods: {
    useOk(){
      this.seleccion.form1 = true;
      this.seleccion.form2 = false;
    },
    pantallaOk(){
      this.seleccion.form2 = true;
      this.seleccion.form3 = false;
    },
    camarasOk(){
      this.seleccion.form3 = true;
      this.seleccion.form4 = false;
    },
    ramOk(){
      this.seleccion.form4 = true;
      this.seleccion.form5 = false;
    },
    almacenamientoOk(){
      this.seleccion.form5 = true;
      this.seleccion.form6 = false;
    },
    precioOk(){
      this.seleccion.form6 = true;
      this.seleccion.form7 = false;
    },
    moreOk(){
      this.seleccion.form7 = true;
      this.seleccion.resultado = false
      console.log(this.infoData)
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
  background-size:50%;
}
.container {
  font-family: Georgia, 'Times New Roman', Times, serif;
  margin: 0 auto;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.btnPrim{
  border: 1px solid var(--color-bg);
  margin: 20px;
  color: var(--color-bg);
  background: rgba(68, 68, 68, 0);
}
.btnPrim:hover{
  background:var(--color-bg);
  color: #fff;
  border: 1px solid var(--color-bg);
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
@media (max-width: 600px) {
  .container {
    background-size:90%;
  }
}
</style>