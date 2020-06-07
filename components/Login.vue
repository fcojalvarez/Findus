<template>
    <div class="container">
        <div class="formLog">
            <div class="border borderFormLogin">

                <el-form class="demo-dynamic">
                    <span class="title">Email:</span>
                    <el-form-item prop="email">
                        <el-input placeholder="Introduzca su email" v-model="email"></el-input>
                    </el-form-item>
                    <span class="title">Contraseña:</span>
                    <el-form-item prop="password">
                        <el-input placeholder="Introduzca su contraseña" v-model="password" show-password></el-input>
                    </el-form-item>
                    <el-button @click.prevent="login">Iniciar sesión</el-button>
                </el-form>
                
            </div>
            <h3 class="notLogin">¿No está registrado? <span @click.prevent="showregisterLogin" class="createAccount">Crear cuenta</span></h3>
        </div>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
    name: 'Login',
    data(){
        return{
            email: "",
            name: "",
            surname: "",
            password: "",
            dataUsers: "",
            isAuth: false
        }
    },
    mounted() {
        this.$store.dispatch('checkAuth') 
    },
    methods:{  
        async login(){
            let loginData = {
                email: this.email,
                password: this.password
            }

            const validatedEmail = this.validatedEmail(loginData.email)

            if( loginData.email !== '' && loginData.password !== ''){
                if(!validatedEmail){ 
                    alert('Introduzca un email correcto, por favor.')
                    return
                }

                try {
                    let response = await this.$axios.post('auth/login', loginData)
                    window.localStorage.setItem('token', response.data.token)

                    this.$store.dispatch('checkAuth') 
                    this.limpiarFormulario(); 
        
                } catch (err) {
                    alert('Mostrar error en notificación: Email o contraseña incorrectos.')
                    return
                }
            }
        },
        validatedEmail(email) {     
            const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

            if (emailRegex.test(email)) {
                return true
            } else {
                return false
            }
        },
        limpiarFormulario(){
            this.name = ""
            this.surname = ""
            this.email = "",
            this.password = ""
        },
        showregisterLogin(){
            this.$router.push('/register')
            this.limpiarFormulario();
        }
    }
}
</script>