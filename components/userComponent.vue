<template>
    <div class="containerUser">
        <div class="divUser">
            <div>
                <h3 class="titleUser">Nombre y apellidos:</h3><span class="spanUserData">{{currentUser.name}} {{currentUser.surname}}</span>
            </div>
            <div>
                <h3 class="titleUser">email:</h3><span class="spanUserData">{{currentUser.email}}</span>
            </div>
            <br>
            <div class="divButtons">
                <el-button class="btnUserPage" @click.prevent="showFormEdit">Modificar datos</el-button>
                <el-button class="btnUserPage" @click.prevent="changePassword" id="btnchangePass">Cambiar contraseña</el-button>
            </div>

            <el-form v-show="formModData" :label-position="labelPosition" label-width="100px" class="formModData">
                <h3 class="titleForm">Modificar datos personales:</h3>
                <el-form-item label="Nombre">
                    <el-input v-model="currentUser.name"></el-input>
                </el-form-item>
                <el-form-item label="Apellidos">
                    <el-input v-model="currentUser.surname"></el-input>
                </el-form-item>
                <el-form-item label="email">
                    <el-input v-model="currentUser.email"></el-input>
                </el-form-item>
                <el-button type="primary" @click.prevent="changePersonalInfo">Modificar</el-button>
            </el-form>
            <div v-show="changePass">
                <span class="changePss">Petición aceptada. <br> <br>
                Recibirá un email con las instrucciones para modificar su contraseña.</span>
            </div>
        </div>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
    data(){
        return{
            labelPosition: 'left',
            currentUser: '',
            formModData: false,
            changePass: false
        }
    },
    methods: {
        async loadUserPage (){
            let token = window.localStorage.getItem('token'),
                tokenDecoded = jwt_decode(token);

            let userDB = await this.$axios.get(`users/${tokenDecoded.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

            this.currentUser = userDB.data

        },
        showFormEdit (){
            this.formModData = !this.formModData
        },
        changePersonalInfo (){
            let token = window.localStorage.getItem('token')
            let modifiedData = this.$axios.put(`users/${this.currentUser._id}`, this.currentUser , {
                    headers: { Authorization: `Bearer ${token}` }
                })
             this.formModData = false
        },
        changePassword (){
            this.changePass = true;
            console.log('Envío de email para cambiar la contraseña')
            setTimeout(() => {
                this.changePass = false
            }, 3000);
        }
    },
    mounted(){
        this.loadUserPage()
    }
}
</script>

<style>
.divUser{
    padding: 20px;
    width: 90%;
    margin: 20px auto;
}
.containerUser{
    height: 100vh;
    margin: 0 auto;
}
.divButtons{
    margin-top:30px;
}
.titleUser{
    font-weight: 400;
    margin: 10px 0;
}
.formModData{
    margin-top: 30px;
    border-radius: 10px;
    padding: 20px;
}
.changePss{
    display: block;
    margin-top: 30px;
    padding: 20px;
    font-weight: 100;
}
#btnchangePass, .btnUserPage{
    margin: 10px 0 0 0;
    display: block;
    width: 100%;
}
.titleForm{
    color: #777;
    margin-bottom: 10px;
}
.spanUserData{
    color: #333;
    font-size: 0.9em;
}
@media (min-width: 640px) {
    #btnchangePass{
        display: inline-block;
    }
    .btnUserPage{
        width: none;
    }
    .divButtons{
        margin-top:30px;
        width: 40%;
    }
}
@media (min-width: 800px) {
    .divUser{
        background: rgb(243, 243, 243);
        border: 1px solid rgb(219, 217, 217);
        padding: 30px;
        border-radius: 15px;
    }
    .formModData , .divUser{
        width: 60%;
        margin: 20px auto;
        background: #fff;
    }
    .formModData{
        width: 100%;
        padding: 30px;
    }
}
</style>