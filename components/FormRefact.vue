<template>
    <div class="container">
      <div>
        <form v-for="(form, i) in forms" :key="i">
          <h3 class="subtitle">{{titleForm[i]}}</h3>
          <el-radio-group v-model="resultData.sistemaOperativo"> <!-- Necesito que se bindee al dato correcto -->

            <el-radio-button v-for="(label, index) in labels[i]" :label="labels[i][index]" :key="index"></el-radio-button>
            </el-radio-group> 

          <br>
          <el-button class="btnPrim" type="primary" @click.prevent="useOk">Siguiente</el-button>
        </form>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labels: [
        ['Android', 'IOS', 'Cualquiera'],
        ["Menos de 5'", "Entre 5' y 6'", "Más de 6'"],
        ['Poco', 'Normal', 'Mucho'],
        ['Menos de 8GB', 'Más de 8GB'],
        ['64GB', '128GB', 'Más de 128GB'],
        [''],
        [''],
      ],
      forms: ['form1','form2','form3','form4','form5','form6','form7'],
      titleForm: ['¿Qué sistema operativo deseas?', '¿Tamaño de la pantalla?', '¿Cuánto le importan las cámaras?', '¿Cuánta memoria RAM?', '¿Cuánto almacenamiento interno?', '¿Rango de precio?' , '¿Le interesa alguna característica más?'],
      seleccion: {
        form1: '',
        form2: 'false',
        form3: 'false',
        form4: 'false',
        form5: 'false',
        form6: 'false',
        form7: 'false'
      },
      resultData: {
        sistemaOperativo: '',
        pantalla: '',
        camaraFrontal: '',
        camaraTrasera: '',
        almacenamiento: '',
        precio: [100,1000],
        more: [],
      },
      features: ['Sensor de huella', 'Desbloqueo facial', 'Carga inalámbrica', 'Carga rápida', 'Radio FM', 'Dual SIM', 'Jack 3.5mm', 'Actualizaciones']
    };
  }
}
</script>

<style>
.container {
    font-family: Georgia, 'Times New Roman', Times, serif;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.btnPrim{
  margin: 20px;
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
</style>