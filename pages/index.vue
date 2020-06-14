<template>
  <div>
    <Form class="formHome"></Form>
    <DevicesAleatory></DevicesAleatory>
  </div>
</template>

<script>
import Form from '@/components/Form'
import DevicesAleatory from '@/components/DevicesAleatory'

export default {
  components:{
    Form,
    DevicesAleatory
  }
}
</script>

<style>
.formHome{
  height: 78vh;
}
</style>