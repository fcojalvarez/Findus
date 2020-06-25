<template>
    <div class="containerRegister">
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
                <span class="title" :class="{ errorRepeat : errorRepeatEmail }">Repetir email:</span>
                <el-form-item>
                    <el-input placeholder="Introduzca su email" v-model="repeatEmail"></el-input>
                </el-form-item>
                <span class="title">Contraseña:</span>
                <el-form-item>
                    <el-input placeholder="Introduzca su contraseña" v-model="password" show-password></el-input>
                </el-form-item>
                 <span class="title" :class="{ errorRepeat : errorRepeatPassword }">Repetir contraseña:</span>
                <el-form-item>
                    <el-input placeholder="Introduzca su contraseña" v-model="repeatPassword" show-password></el-input>
                </el-form-item>
                <el-checkbox v-model="acceptPolicy" name="type">He leído y acepto la <nuxt-link class="linkToLegal" :to="'/legal'"><br v-if="widthDisplay < 480">Política de privacidad</nuxt-link></el-checkbox>
                <br>
                <br>
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
            email: '',
            name: '',
            surname: '',
            password: '',
            dataUsers: '',
            repeatEmail: '',
            repeatPassword: '',
            acceptPolicy: false,
        }
    },
    computed:{
        errorRepeatEmail(){
            return this.repeatEmail !== this.email
        },
        errorRepeatPassword(){
            return this.repeatPassword !== this.password
        },
        widthDisplay(){
            return window.innerWidth
        }
    },
    mounted() {
        this.$store.dispatch('checkAuth') 
    },
    methods:{
        async createUser(){
            const newUser = {
                name: this.name,
                surname: this.surname,
                email: this.email,
                password: this.password,
                profile: 'user',
                image: 'https://us.123rf.com/450wm/thesomeday123/thesomeday1231709/thesomeday123170900021/85622928-icono-de-perfil-de-avatar-predeterminado-marcador-de-posici%C3%B3n-de-foto-gris-vectores-de-ilustraciones.jpg?ver=6'
            }

            const validatedEmail = this.validatedEmail(newUser.email)
            if (newUser.name === '' || newUser.surname === '' || newUser.password === '' || newUser.email === ''){
                this.$message({
                    message: 'Todos los campos son obligatorios.',
                    type: 'error',
                    duration: 2000
                });
                return
            } else if (!validatedEmail) {
                this.$message({
                    message: 'Introduzca un email válido.',
                    type: 'error',
                    duration: 2000
                });
                return
            }

            if(this.acceptPolicy === false){
                this.$message({ message: 'Debe leer y aceptar la política de privacidad.',
                    type: 'error',
                    duration: 2000
                });
                return
            }

            if( this.repeatEmail !== this.email){
                this.$message({ message: 'El email introducido no coincide.',
                    type: 'error',
                    duration: 2000
                });
                return
            } else if ( this.password !== this.repeatPassword ){
                 this.$message({ message: 'La contraseña introducida no coincide.',
                    type: 'error',
                    duration: 2000
                });
                return
            }
            
            try {
                const userCreated = await this.$axios.$post('users', newUser)
                this.limpiarFormulario();
                this.$message({
                    message: 'El usuario ha sido creado correctamente.',
                    type: 'success',
                    duration: 2000
                });
                setTimeout(() => {
                this.showFormLogin(); 
                }, 1500);
            } catch (err) {
                this.$message({
                    message: 'La contraseña debe tener mínimo 6 caracteres.',
                    type: 'error',
                    duration: 2000
                });
            };
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
            this.password = "",
            this.repeatEmail = "",
            this.repeatPassword = ""
        },
        showFormLogin(){
            this.$router.push('/login')
            this.limpiarFormulario();
        }
    }
}
</script>

<style>
.linkToLegal{
    color: var(--color-primary);
    font-weight: bold;
    text-shadow: 1px 1px #555;
}
.border{
    border: 2px solid var(--color-primary);
    -webkit-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    -moz-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);   
    border-radius: 5px;
}
.formRegister{
    margin-top: 5px;
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    text-align: left;
}
span .title{
    color:red;
}
.title{
    font-size: 14px;
}
.borderFormRegister{
    padding: 30px 20px;
}
.createAccount, .changePassword{
    font-size: 12px;
    border-bottom: 1px solid var(--color-primary);
    color: #333;
    cursor: pointer;
}
.changePassword{
    font-size: 10px;
    margin-top: 10px;
}
.formRegister{
    margin-top: 5px;
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    text-align: left;
}
.errorRepeat{
    color: rgb(212, 17, 17);
}
.containerRegister{
    margin: 20px auto;
}
el-input{
    width: 70%;
    margin-bottom: 50px;
}
el-button{
    display:block;
    padding-top: 40px;
}
@media (min-width: 600px) {
    .formRegister{
        width: 350px;
    }
}
@media (min-width: 850px) {
    .borderFormRegister{
        padding: 30px 50px;
    }
    .formRegister{
        width: 500px;
        margin: 0 auto;
    }
    .containerRegister{
        margin: 30px auto;
    }
}
</style>