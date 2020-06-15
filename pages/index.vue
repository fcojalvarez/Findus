<template>
  <div>
    <Form class="formHome"></Form>
    <DevicesAleatory v-show="showDevicesAleatory"></DevicesAleatory>
  </div>
</template>

<script>
import Form from '@/components/Form'
import DevicesAleatory from '@/components/DevicesAleatory'

export default {
  components:{
    Form,
    DevicesAleatory
  },
  computed: {
    showDevicesAleatory(){
      return this.$store.state.isFindRandomDevice
    }
  }
}
</script>

<style>
.formHome{
  height: 78vh;
}
</style>