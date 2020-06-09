<template>
    <div class="container">
        <div class="formRegister">

            <el-form class="border borderFormRegister">
                <span class="title">Nombre:</span>
                <el-form-item>
                    <el-input placeholder="Introduzca su nombre" v-model="name"></el-input>
                </el-form-item>
                <span class="title">Apellidos:</span>
                <el-form-item>
                    <el-input placeholder="Introduzca sus apellidos" v-model="surname"></el-input>
                </el-form-item>
                <span class="title">Email:</span>
                <el-form-item>
                    <el-input placeholder="Introduzca su email" v-model="email"></el-input>
                </el-form-item>
                <span class="title">Contraseña:</span>
                <el-form-item>
                    <el-input placeholder="Introduzca su contraseña" v-model="password" show-password></el-input>
                </el-form-item>
                <el-button @click.prevent="createUser">Crear cuenta</el-button>
            </el-form>
            <h3 class="notLogin">¿Está registrado? <span @click.prevent="showFormLogin" class="createAccount">Iniciar sesión</span></h3>
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
            dataUsers: ""
        }
    },
    mounted() {
        this.$store.dispatch('checkAuth') 
    },
    methods:{
        async createUser(){
            let newUser = {
                name: this.name,
                surname: this.surname,
                email: this.email,
                password: this.password,
                profile: 'user'
            }

            const validatedEmail = this.validatedEmail(newUser.email)
            
            if(newUser.name && newUser.surname && newUser.email && newUser.password && validatedEmail){
                try {
                let userCreated = await this.$axios.$post('users', newUser)
                this.limpiarFormulario();
                } catch (err) {
                    console.log(err)
                };
                this.showFormLogin();
                 return
            }
            alert('Por favor, rellene el formulario correctamente.')
            return
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
        showFormLogin(){
            this.$router.push('/login')
            this.limpiarFormulario();
        }
    }
}
</script>
