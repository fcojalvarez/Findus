<template>

    <div class="header">
      <div class="divLogo">
        <img src="@/static/Findus_light_larg.png" alt="Imagen logo findus">
      </div>
      <div class="divLogin">
        <Login class="login"></Login>
      </div>
    </div>

</template>

<script>
import Login from '@/components/Login'
export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    components:{
      Login
    }
}
</script>

<style>
.header{
    background: var(--color-bg);
    height: 100%;
}
.header img{
  width: 105px;
}
.divLogo{
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}
.login{
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  width: 100%;
  height: 100%;
}
@media (min-width: 600px) {
  .header{
    display: flex;
    justify-content: space-around;
  }
  .divLogo{
    width: 60%;
  }
  .divLogo img{
    margin-right: auto;
    margin-left: 100px;
  }
  .divLogin{
    width: 38%;
  }
  .login{
    padding-bottom: 0;
    padding-top: 10px;
  }
}

</style>