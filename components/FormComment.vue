<template>
    <el-form class="divFormComment">
        
        <span class="title">Cuéntanos, ¿Qué te parece esta recomendación?</span>
        <el-form-item>
            <el-input
            type="textarea"
            :rows="5"
            placeholder="Tus comentarios ayudarán a los demás usuarios."
            v-model="bodyComment">
            </el-input>
        </el-form-item>
        <el-button @click.prevent="createComment" class="btnSend" type="primary">Comentar</el-button>
    </el-form>
</template>

<script>
import jwt_decode from 'jwt-decode'
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

export default {
    data() {
        return{   
            bodyComment: '' ,
            deviceID: this.$route.params.id
        }
    },
    mounted(){
        this.$store.dispatch('loadComments', this.$route.params.id) 
    },
    methods:{
        cleanForm() {
            this.bodyComment = ''
        },
        async createComment(){
            try {
                const token = window.localStorage.getItem('token')
                const userID = jwt_decode(token).id
                const user = await this.$axios.get(`/users/${userID}`, {headers: {Authorization: `Bearer ${token}`}})
                let userDB = user.data

                const newComment = {
                    image: userDB.image,
                    body: this.bodyComment,
                    userCreate: userDB.name,
                    userCreateID: userDB._id,
                    smartphoneID: this.deviceID,
                    creationDate: moment().format('llll'),
                    usersVotes: [],
                    votes: 0
                }

                const sendComment = await this.$axios.post(`${this.deviceID}/comments`, newComment,
                 { headers: { Authorization: `Bearer ${token}`} });

                this.$store.dispatch('loadComments', this.deviceID)
                this.cleanForm()
            } catch (err) {
                console.log(err)
                this.$message({
                    showClose: true,
                    message: 'Sólo los usuarios registrados pueden comentar. Regístrese, es gratis.',
                    type: 'error'
                });
            }
        }
    }
}
</script>

<style>
.title{
    margin-bottom:10px;
    display: block;
}
.divFormComment{
    width: 80%;
    margin: 40px auto 10px auto;
}
.btnSend{
    text-align: center;
    width: 100%;
}
@media (min-width: 600px) {
    .btnSend{
        width: 20%;
        margin-left: 80%;
    }
}
</style>