<template>
    <div class="header fixedTop">
        <nuxt-link to="/" class="divLogo">
        <img class="logo" src="@/static/Findus_light_larg.png" alt="Imagen logo findus">
        </nuxt-link>
      <nav class="divNav">
        <span class="login"><nuxt-link class="link" to="/">Inicio</nuxt-link></span>
        <span class="login"><nuxt-link class="link" to="/contact">Contacto</nuxt-link></span>
        <span class="login" v-show="!isAuth"><nuxt-link class="link" to="/login">Iniciar sesión</nuxt-link></span>
        <span class="login" v-show="isAuth"><a href="#" class="link" @click.prevent="logOut">Cerrar sesión</a></span>
      </nav>
      <div class="userSpace" v-show="isAuth">
        <span class="login logOut">
          <nuxt-link class="user" to="/userPage">
            <span class="userName">{{currentUser.name}} <img class="userAvatar" :src="currentUser.image" alt="Avatar usuario"></span>
          </nuxt-link>
        </span>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      activeIndex: '1',
    }
  },
  computed: {
      widthDislay(){
        return window.innerWidth
      },
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
    },
    openNavBar(){
      isOpenNav
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
  max-height: 70px;
  max-width: 105px;
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
.logOut{
      color: var(--color-primary);
}
.user{
  color: var(--color-primary)
}
.userName{
  border-bottom: 1px solid var(--color-primary);
  padding: 5px;
}
.userAvatar{
  max-width: 20px;
  border-radius: 15px;
  padding: 0;
  margin: 0;
}
.menumobile{
    display: none;
  }
@media (min-width: 600px) {
  .fixedTop{
    position: fixed;
    left:0;
    top:0;
    width: 100vw;
    z-index: 200;
    height: 50px;
  }
  .header{
    display: flex;
    justify-content: space-around;
  }
  .divLogo{
    width: 25%;
  }
  .divLogo img{
    margin-right: auto;
    margin-left: 20px;
  }
  .divNav{
    width: 65%;
    display: flex;
  }
  nuxt-link:focus{
    background: red;
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
    font-size: 0.9em;
  }
  .userSpace{
    margin-right: 20px;
  }
}
@media (min-width: 750px) {
  .divLogo{
    width: 40%;
  }

  .divNav{
    width: 55%;
  }
}
@media (min-width: 950px) {
  .divLogo{
    width: 55%;
  }
  .divLogo img{
    margin-left: 50px;
  }
  .divNav{
    width: 40%;
  }
  .logOut{
    margin-right: 100px;
  }
}
</style>