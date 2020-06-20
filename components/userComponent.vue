<template>
    <div class="containerUser">
        <div class="divUser border">
            <div class="divDataUser">
                <img class="userImage" :src="currentUser.image" alt="Imagen de usuario">
                <div class="dataUser">
                    <h3 class="titleUser">Nombre</h3><span class="spanUserData">{{currentUser.name}}</span>
                    <h3 class="titleUser">Apellidos:</h3><span class="spanUserData">{{currentUser.surname}}</span>
                    <h3 class="titleUser">email:</h3><span class="spanUserData">{{currentUser.email}}</span>
                </div>
            </div>

            <el-row :glutter="10" class="divButtons">
                <el-col :xs="22" :sm="11">
                    <el-button round class="btnUserPage marginL0" @click.prevent="showFormEdit">Modificar datos</el-button>
                </el-col>
                <el-col :xs="22" :sm="11">
                    <el-button round class="btnUserPage marginL0" @click.prevent="changePassword">Cambiar contraseña</el-button>
                </el-col>
                <el-col :xs="22" :sm="11">
                    <el-button round class="btnUserPage marginL0 btnDeleteUser" id="" @click.prevent="warningDeleteUser">Eliminar cuenta</el-button>
                </el-col>
             </el-row>

            <el-form v-show="isFormModData" :label-position="labelPosition" label-width="100px" class="formModData">
                <h3 class="titleForm">Modificar datos personales:</h3>
                <el-form-item label="Nombre">
                    <el-input v-model="currentUser.name"></el-input>
                </el-form-item>
                <el-form-item label="Apellidos">
                    <el-input v-model="currentUser.surname"></el-input>
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="currentUser.email"></el-input>
                </el-form-item>
                <el-form-item label="Imagen">
                    <el-input v-model="currentUser.image"></el-input>
                    <span class="spanUserData msgAlert">Para modificar la imagen de usuario deberá insertar una url.</span>
                </el-form-item>
                <el-button round type="primary" class="btnEditData" @click.prevent="changePersonalInfo">Modificar</el-button>
            </el-form>

            <div v-show="isDeletedAccount" class="warningDeleteUser">
                <span>¿Está seguro que quiere eliminar su cuenta?</span>
                <br>
                <el-button round class="btnDeleteUser deleteUser" @click="deleteUserAccount">Confirmar</el-button>
                <el-button round type="success notDeleteUser" plain @click="showWarningDelete">Cancelar</el-button>
            </div>

             <el-row :glutter="10" class="divButtons">
                <el-col :xs="22" :sm="11">
                    <el-button round class="btnUserPage marginL0" @click.prevent="showComments">Comentarios realizados</el-button>
                </el-col>
                <el-col :xs="22" :sm="11">
                    <el-button round class="btnUserPage marginL0" @click.prevent="showDevicesFavourites">Móviles favoritos</el-button>
                </el-col>
                <el-col :xs="22" :sm="11">
                </el-col>
             </el-row>

            <div class="comments" v-show="isShowComments">
                 <h3 class="notComments" v-show="commentsUser.length === 0">No ha comentado en ningún dispositivo.</h3>
                <div class="" v-if="commentsUser.length > 0">
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
            isShowComments: false,
            isShowDevicesFavourites: false,
            commentsUser: '',
            isDeletedAccount: false
        }
    },
    computed:{
        devicesFavouriteUsers(){
            return this.$store.state.devicesFavorites
        },
        isAuth () {
            return this.$store.state.isAuth
        }
    },
    methods: {
        async loadUserPage (){
            try{
                let token = window.localStorage.getItem('token');
                let tokenDecoded = jwt_decode(token);
                let userID = tokenDecoded.id

                let userDB = await this.$axios.get(`users/${userID}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                this.currentUser = userDB.data
            } catch (err) {
                this.currentUser = {
                    image: 'https://us.123rf.com/450wm/thesomeday123/thesomeday1231709/thesomeday123170900021/85622928-icono-de-perfil-de-avatar-predeterminado-marcador-de-posici%C3%B3n-de-foto-gris-vectores-de-ilustraciones.jpg?ver=6'
                }
            }
            
        },
        showFormEdit (){
            this.isFormModData = !this.isFormModData
            this.isShowComments = false
            this.isShowDevicesFavourites = false
            this.isDeletedAccount = false
        },
        changePersonalInfo (){
            try {
                let token = window.localStorage.getItem('token')
                let dataEdited = this.$axios.put(`users/${this.currentUser._id}`, this.currentUser , {
                    headers: { Authorization: `Bearer ${token}` }
                })

                this.$message({
                    showClose: true,
                    message: 'Los datos se han modificado correctamente.',
                    type: 'success'
                });

                this.isFormModData = false
            } catch (err) {
                this.$message({
                    showClose: true,
                    message: 'Ups, ha ocurrido un problema. Por favor, inténtelo más tarde',
                    type: 'error'
                });
            }
            
        },
        async changePassword (email){
            try{
                let resetPassword = await this.$axios.post('auth/resetPassword', { email: this.currentUser.email })
                this.$message({
                    showClose: true,
                    message: 'La petición se ha realizado correctamente, recibirá un email con las instrucciones.',
                    type: 'success'
                }) 
            } catch (err) {
                this.$message({
                    showClose: true,
                    message: 'Ha ocurrido un problema. Por favor, inténtelo de nuevo más tarde.',
                    type: 'error'
                })
            }
            
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
            this.isFormModData = false
            this.isShowDevicesFavourites = false
            this.isDeletedAccount = false
        },
        showDevicesFavourites(){
            this.isFormModData = false
            this.isShowComments = false
            this.isDeletedAccount = false
            this.isShowDevicesFavourites = !this.isShowDevicesFavourites
        },
        showWarningDelete(){
            this.isDeletedAccount = false
        },
        async deleteUserAccount(){
            try{
                let token = window.localStorage.getItem('token');
                let deletedUser = await this.$axios.delete(`users/${this.currentUser._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                this.$message({
                    showClose: true,
                    message: 'El usuario se ha eliminado correctamente.',
                    type: 'success'
                });

                this.$store.dispatch('logout', this.isAuth)
            } catch (err) {
            }
        },
        warningDeleteUser() {
            this.$message({
                showClose: true,
                message: 'Esta acción no se puede revertir, por favor confirme para eliminar su cuenta.',
                type: 'warning'
            });
            this.isDeletedAccount = !this.isDeletedAccount
            this.isFormModData = false
            this.isShowComments = false
            this.isShowDevicesFavourites = false
      },
    },
    mounted(){
        this.loadUserPage()
        this.getCommentsUser()
        this.$store.dispatch('getDevicesFavorites') 
    }
}
</script>

<style>
.el-button+.el-button{
    margin:0 auto;
}
.userImage{
    border-radius: 20px;
    width: 200px;
    margin-left: 30px;
    border: 1px solid var(--color-bg)
}
.divUser{
    padding: 20px;
    width: 90%;
    margin: 20px auto;
}
.msgAlert{
    color: rgb(206, 16, 16)!important;
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
    background: rgb(255, 250, 174);
    color: var(--color-bg);
}
.btnEditData{
    background: rgb(255, 250, 174);
    color: var(--color-bg);
    margin-left:auto;
    display: block;
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
.marginL0{
    margin-left: 0!important;
}
.separador{
    height: 10px;
}
.linkShowComment{
    margin-left: auto;
    display: block;
}
.btnDeleteUser{
    background: rgb(247, 197, 197);
    color: rgb(172, 23, 23);
}
.btnDeleteUser:hover{
    background: rgb(172, 23, 23);
    color: rgb(247, 197, 197);
}
.fontRed{
    color: red;
    font-weight: 400;
}
.textDeletedAccount{
    font-weight: 300;
}
.warningDeleteUser{
    margin: 15px auto 0 auto;
    text-align: center;
}
.deleteUser{
    border: none;
    background: #fff;
    font-size: 1em;
    color: red;
}
.deleteUser:hover{
    background: #fff;
    color: rgb(165, 23, 23);
}
.notDeleteUser{
    background: #fff!important;
    border: none;
    font-size: 1em;
    color: rgb(40, 126, 40);
}
.notDeleteUser:hover{
    color: rgb(7, 126, 7)!important
}
@media (min-width: 640px) {
    .divDataUser{
        display: flex;
    }
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
        margin: 120px auto 0 auto
    }
}
@media (min-width: 800px) {
    .divUser{
        background: rgb(243, 243, 243);
        padding: 30px;
        border-radius: 15px;
        max-width: 650px;
    }
    .formModData , .divUser{
        width: 70%;
        margin: 20px auto;
        background: #fff;
    }
    .formModData{
        width: 100%;
        padding: 30px;
    }
}
</style>