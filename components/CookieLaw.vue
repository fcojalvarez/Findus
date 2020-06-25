<template>
  <cookie-law theme="dark-lime" buttonText="Acepto" class="footer">
    <div slot="message" class="cookieDiv">
      <p class="textCookie">
              Este sitio web utiliza cookies  para garantizar que obtenga la mejor experiencia, para más información haga <nuxt-link class="clickHere" :to="'legal'">click aquí.</nuxt-link>
      </p>
    </div>
  </cookie-law> 
</template>

<script>
import CookieLaw from 'vue-cookie-law'

export default {
    components:{
      CookieLaw
    }
}
</script>

<style>
.footer{
  height: 120px;
  padding: 15px
}
.Cookie__content{
  margin: 0;
}
.Cookie__button{
  background: var(--color-primary)!important;
  color: #333!important;
}
.Cookie__buttons{
  margin: 0!important;
}
.btnCookie{
  cursor: pointer;
  color: #333;
  font-weight: bold;
  font-size: 0.8em;
}
.clickHere{
  color: var(--color-primary);
  margin: 0 auto;
}
.textCookie{
  font-size: 0.8em;
}
@media (min-width: 435px){
  .footer{
    height: 100px;
  }
  .Cookie__buttons{
    margin: 5px!important;
  }
}
@media (min-width: 762px){
  .footer{
    height: 80px;
  }
}
@media (min-width: 1000px){
  .footer{
    height: 50px;
  }
}
</style>