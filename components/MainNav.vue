<template>
    <div class="header">
        <nuxt-link to="/" class="divLogo">
        <img class="logo" src="@/static/Findus_light_larg.png" alt="Imagen logo findus">
        </nuxt-link>
      <div class="divNav">
        <span class="login"><nuxt-link class="link" to="/">Home</nuxt-link></span>
        <span class="login" v-show="!isAuth"><nuxt-link class="link" to="/login">Login</nuxt-link></span>
        <span class="login" v-show="isAuth"><a href="#" class="link" @click.prevent="logOut">Logout</a></span>
      </div>
      <div class="userSpace" v-show="isAuth">
        <span class="login logOut">
          Hola {{currentUser}} <i class="fas fa-user iconUser"></i></span>
      </div>
    </div>
</template>

<script>
export default {
  computed: {
      isAuth () {
        return this.$store.state.isAuth
      },
      currentUser() {
        return this.$store.state.currentUser
      }
  },
  methods:{
    logOut(){
      this.$store.dispatch('logout', this.isAuth)
    } 
  }
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
.iconUser{
  color: var(--color-primary);
  margin-left: 5px;
}
@media (min-width: 600px) {
  .header{
    display: flex;
    justify-content: space-around;
  }
  .divLogo{
    width: 70%;
  }
  .divLogo img{
    margin-right: auto;
    margin-left: 100px;
  }
  .divNav{
    width: 25%;
    display: flex;
  }
  .login{
    padding-bottom: 0;
    padding-top: 15px;
    display: flex;
    justify-content: space-around;
  }
  .link:hover {
    color:var(--color-primary);
  }
  .logOut{
    margin-right: 20px;
  }
  .userSpace{
    margin-right: 20px;
  }
}

</style>