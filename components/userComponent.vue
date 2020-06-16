<template>
    <div class="containerUser">
        <div class="divUser border">
            <div class="dataUser">
                <h3 class="titleUser">Nombre y apellidos:</h3><span class="spanUserData">{{currentUser.name}} {{currentUser.surname}}</span>
                <h3 class="titleUser">email:</h3><span class="spanUserData">{{currentUser.email}}</span>
            </div>

            <div class="divButtons">
                <div>
                    <el-button class="btnUserPage" @click.prevent="showFormEdit">Modificar datos</el-button>
                    <el-button class="btnUserPage" @click.prevent="changePassword" id="btnchangePass">Cambiar contraseña</el-button>
                </div>
                <div>
                    <el-button class="btnUserPage" @click.prevent="showDevicesFavourites">Móviles favoritos</el-button>
                    <el-button class="btnUserPage" @click.prevent="showComments" id="btnShowComment">Comentarios realizados</el-button>
                </div>
            </div>

            <el-form v-show="isFormModData" :label-position="labelPosition" label-width="100px" class="formModData">
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

            <div v-show="isChangePass">
                <span class="changePss">Petición aceptada. <br> <br>
                Recibirá un email con las instrucciones para modificar su contraseña.</span>
            </div>
            
            <div class="comments" v-show="isShowComments">
                 <h3 class="notComments" v-show="commentsUser.length === 0">No ha comentado en ningún dispositivo.</h3>
                <div>
                    <h3 class="comments">Comentarios:</h3>
                    <div class="divComment" v-for="comment in commentsUser" :key=comment._id>
                        <h4 class="userComment">{{comment.userCreate}} </h4>
                        <span class="bodyComment">{{comment.body}}</span>
                        <div class="footerComment">
                            <span class="creationDate">Fecha de creación: {{comment.creationDate}}</span>
                        </div>
                        <nuxt-link :to="'/devices/'+comment.smartphoneID">
                            <el-button class="linkShowComment"  size="mini" type="info" round>Ver comentario</el-button>
                        </nuxt-link>
                        <hr class="separador">
                    </div>
                </div>
            </div>

            <div class="comments" v-show="isShowDevicesFavourites">
                 <h3 class="notComments" v-show="devicesFavouriteUsers.length === 0">No ha añadido ningún dispositivo como favorito.</h3>
                <div v-for="devices in devicesFavouriteUsers" :key="devices._id">
                    <Device :id="devices._id"></Device>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
import Comments from '@/components/Comments'
import Device from '@/components/Device'

export default {
    components:{
        Comments,
        Device
    },
    data(){
        return{
            labelPosition: 'left',
            currentUser: '',
            isFormModData: false,
            isChangePass: false,
            isShowComments: false,
            isShowDevicesFavourites: '',
            commentsUser: ''
        }
    },
    computed:{
        devicesFavouriteUsers(){
            return this.$store.state.devicesFavorites
        }
    },
    methods: {
        async loadUserPage (){
            let token = window.localStorage.getItem('token');
            let tokenDecoded = jwt_decode(token);

            let userDB = await this.$axios.get(`users/${tokenDecoded.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

            this.currentUser = userDB.data

        },
        showFormEdit (){
            this.isFormModData = !this.isFormModData
        },
        changePersonalInfo (){
            let token = window.localStorage.getItem('token')
            let modifiedData = this.$axios.put(`users/${this.currentUser._id}`, this.currentUser , {
                    headers: { Authorization: `Bearer ${token}` }
                })
             this.formModData = false
        },
        changePassword (){
            this.isChangePass = true;
            setTimeout(() => {
                this.isChangePass = false
            }, 3000);
        },
        async getCommentsUser(){
            let token = window.localStorage.getItem('token');
            let tokenDecoded = jwt_decode(token);
            let userID = tokenDecoded.id

            let commentsList = await this.$axios.get('comments')
            let response = commentsList.data

            let result = response.filter( comment => comment.userCreateID === userID )
         
            this.commentsUser = result 
        },
        showComments(){
            this.isShowComments = !this.isShowComments
        },
        showDevicesFavourites(){
            this.isShowDevicesFavourites = !this.isShowDevicesFavourites
        }
    },
    mounted(){
        this.loadUserPage()
        this.getCommentsUser()
        this.$store.dispatch('getDevicesFavorites') 
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
    margin: 50px auto 0 auto;
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
.comments{
    margin: 30px auto;
}
.border{
    border: 2px solid var(--color-primary);
    -webkit-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    -moz-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);   
    border-radius: 5px;
}
.dataUser{
    margin-left: 30px;
}
#btnShowComment{
    margin-left: 0;
}
.separador{
height: 10px;
}
.linkShowComment{
    margin-left: auto;
    display: block;
}
@media (min-width: 640px) {
    #btnchangePass{
        width: 100%;
    }
    .btnUserPage{
        width: 100%;
    }
    .divButtons{
        margin-top:30px;
        display: flex;
        justify-content: space-evenly;
    }
    .containerUser{
        margin: 150px auto 0
    }
}
@media (min-width: 800px) {
    .divUser{
        background: rgb(243, 243, 243);
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