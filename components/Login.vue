<template>
    <div>

        <div class="formLog" v-show="showLogin">
            <div class="border borderFormLogin">
                <span class="title">Email:</span>
                <el-input placeholder="Introduzca su email" v-model="email"></el-input>

                <span class="title">Contraseña:</span>
                <el-input placeholder="Introduzca su contraseña" v-model="password" show-password></el-input>

                <el-button @click.prevent="">Iniciar sesión</el-button>
            </div>
            <h3 class="notLogin">¿No está registrado? <span @click.prevent="showregisterLogin" class="createAccount">Crear cuenta</span></h3>
        </div>

        <div class="formRegister" v-show="showRegister">
            <div class="border borderFormRegister">
                <span class="title">Nombre:</span>
                <el-input placeholder="Introduzca su nombre" v-model="name"></el-input>

                <span class="title">Apellidos:</span>
                <el-input placeholder="Introduzca sus apellidos" v-model="surname"></el-input>

                <span class="title">Email:</span>
                <el-input placeholder="Introduzca su email" v-model="email"></el-input>

                <span class="title">Contraseña:</span>
                <el-input placeholder="Introduzca su contraseña" v-model="password" show-password></el-input>

                <el-button @click.prevent="createUser">Crear cuenta</el-button>
            </div>
            <h3 class="notLogin">¿Tienes cuenta? <span @click.prevent="showFormLogin" class="createAccount">Inicia sesión</span></h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return{
            email: "",
            name: "",
            surname: "",
            password: "",
            showLogin: true,
            showRegister: false,
            dataUsers: ""
        }
    },
    mounted() {
        this.checkAuth();
    },
    methods:{
        checkAuth(){
            this.isAuth = window.localStorage.getItem("token")!= null
        },
        async createUser(){
            let newUser = {
                name: this.name,
                surname: this.surname,
                email: this.email,
                password: this.password,
                profile: 'user'
            }

            try {
                let userCreated = await this.$axios.$post('users', newUser)
                /* this.$http.post('http://localhost:8080/users', newUser) */
                this.limpiarFormulario();
            } catch (err) {
                console.log(err)
            }
        },
        async login(){
            let loginData = {
                email: this.email,
                password: this.password
            }

            try {
                let response = await this.$axios.post('login', loginData)
                window.localStorage.setItem('token', response.data.token)

                this.checkAuth()
            } catch (err) {
                console.log(`
                    Se ha producido un error. <br>
                    message: ${err}
                `)
            }
        },
        limpiarFormulario(){
            this.name = ""
            this.surname = ""
            this.email = "",
            this.password = ""
        },
        showFormLogin(){
            this.showLogin = !this.showLogin
            this.showRegister = !this.showRegister
            this.limpiarFormulario();
        },
        showregisterLogin(){
            this.showLogin = !this.showLogin
            this.showRegister = !this.showRegister
            this.limpiarFormulario();
        }
    }
}
</script>

<style>
.border{
    border: 2px solid var(--color-primary);
    -webkit-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    -moz-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    margin-top:80px;
    border-radius: 5px;
}
.borderFormRegister{
    padding: 50px 80px;
}
.borderFormLogin{
    padding: 40px;
}
.createAccount{
    font-size: 12px;
    border-bottom: 1px solid var(--color-primary);
    color: #333;
    cursor: pointer;
}
.notLogin{
    font-size: 10px;
    margin-top: 10px;
    color: var(--color-bg);
    text-align: center;
}
.formLog{
    margin-top: 10px;
    width: 60%;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
}
.formRegister{
    margin-top: 10px;
    width: 60%;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
}
.title{
    font-size: 14px;
}
el-input{
    width: 70%;
    margin-bottom: 50px;
}
el-button{
    display:block;
    padding-top: 40px;
}
@media (min-width: 850px) {
    .formLog{
        width: 50%;
        padding: 50px;
    }
    .borderLogin{
        padding: 50px 30px;
    }
}
</style>