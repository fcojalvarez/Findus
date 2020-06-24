<template>
  <div>
    <MainNav></MainNav>
    <nuxt />
    <Footer></Footer>
  </div>
</template>

<script>
import MainNav from '@/components/MainNav'
import Footer from '@/components/Footer'

export default {
    components:{
      MainNav,
      Footer
    },
    props: ['buttonText'],
    mounted() {
      this.$store.dispatch('checkAuth')
      this.$store.dispatch('getDevicesList')
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400&display=swap');

:root {
  --color-primary: #FFEC6B;
  --color-secondary: #3F5CFE;
  --color-bg: #545c64;
  --font: 'Montserrat', sans-serif
}
.block{
  display: block;
}
.margin{
  margin-bottom: 10px;
}
html {
  font-family: var(--font);
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
