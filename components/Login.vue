<template>
    <div class="container">
        <div class="formLog">
            <div class="border borderFormLogin">

                <el-form class="demo-dynamic" v-show="!isResetPassword">
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

                <el-form class="demo-dynamic" v-show="isResetPassword">
                    <span class="title">Restablecer contraseña:</span>
                    <el-form-item prop="email">
                        <el-input placeholder="Introduzca su email" v-model="email"></el-input>
                    </el-form-item>
                    <el-button @click.prevent="changePassword">Restablecer</el-button>
                </el-form>
                
            </div>
            <h3 class="notLogin"  v-show="!isResetPassword">¿No está registrado? <span @click.prevent="showregisterLogin" class="createAccount">Crear cuenta</span></h3>
            <h3 class="forgottenPassword"  v-show="!isResetPassword">¿Ha olvidado su contraseña? <br> <span @click.prevent="showResetPassword" class="changePassword">Cambiar contraseña</span></h3>

            <h3 class="notLogin" v-show="isResetPassword">¿Está registrado? <span @click="showFormLogin" class="createAccount">Iniciar sesión</span></h3>
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
            isAuth: false,
            isResetPassword: false
        }
    },
    mounted() {
        this.$store.dispatch('checkAuth') 
    },
    methods:{  
        async login(){
            const loginData = {
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
                    const response = await this.$axios.post('auth/login', loginData)
                    window.localStorage.setItem('token', response.data.token)

                    this.$store.dispatch('checkAuth')
                    this.limpiarFormulario(); 
                    this.$router.push('/')
                
                } catch (err) {
                    alert('Mostrar error en notificación: Email o contraseña incorrectos.')
                    return
                }
            }
        },
        async changePassword(){
            try {
                const validatedEmail = this.validatedEmail(this.email)
                if( this.email === '' ) {
                    this.$message({
                        showClose: true,
                        message: 'El campo email es obligatorio.',
                        type: 'error'
                    }) 
                    return
                } else if ( !validatedEmail) {
                    this.$message({
                        showClose: true,
                        message: 'Introduzca un email válido.',
                        type: 'error'
                    }) 
                    return
                }
                const resetPassword = await this.$axios.post('auth/resetPassword', { email: this.email })
                this.$message({
                    showClose: true,
                    message: 'La petición se ha realizado correctamente, recibirá un email con las instrucciones.',
                    type: 'success'
                })
                this.limpiarFormulario()
                this.showFormLogin()
            } catch (err) {
                this.$message({
                    showClose: true,
                    message: 'El email introducido no existe en nuestra base de datos.',
                    type: 'error'
                })
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
        },
        showResetPassword(){
            this.isResetPassword = true
        },
        showFormLogin(){
            this.isResetPassword = false
        }
    }
}
</script>