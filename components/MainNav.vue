<template>

    <div class="header">
        <nuxt-link to="/" class="divLogo">
        <img class="logo" src="@/static/Findus_light_larg.png" alt="Imagen logo findus">
        </nuxt-link>
      <div class="divLogin">
        <span class="login"><nuxt-link class="link" to="/">Home</nuxt-link></span>
        <span class="login"><nuxt-link class="link" to="/login">Login</nuxt-link></span>
        <span class="login"><nuxt-link class="link" to="/comments">Comments</nuxt-link></span>
      </div>
    </div>
    
</template>

<script>

export default {

}
</script>

<style>
.header{
    background: var(--color-bg);
    height: 100%;
    border-bottom: 1px solid #555;
}
.logo{
  width: 105px;
}
.divLogo{
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}
.login{
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  width: 100%;
  height: 100%;
}
a{
  color: #fff;
  text-decoration: none;
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
    display: flex;
  }
  .login{
    padding-bottom: 0;
    padding-top: 15px;
  }
  .link:hover {
    color:var(--color-primary);
  }
}

</style>