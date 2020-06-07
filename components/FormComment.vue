<template>
    <el-form class="divFormComment">
        
        <span class="title">Cuéntanos que te parece esta recomendación</span>
        <el-form-item>
            <el-input
            type="textarea"
            :rows="5"
            placeholder="Comenta para ayudar a los demás usuarios."
            v-model="bodyComment">
            </el-input>
        </el-form-item>
        <el-button @click.prevent="createComment" class="btnSend" type="primary">Comentar</el-button>

    </el-form>
</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
    data() {
        return{   
            bodyComment: '',
            smartphoneID: 'pruebaidsmarphone'
        }
    },
    methods:{
        cleanForm() {
            this.bodyComment = ''
        },
        async createComment(){
            try {
                const token = window.localStorage.getItem('token')
                const user = jwt_decode(token).name

                let newComment = {
                    body: this.bodyComment,
                    userCreate: user,
                    smartphoneID: this.smartphoneID,
                    creationDate: new Date(),
                    votes: 0
                }

                if(newComment.body){
                    let sendComment = await this.$axios.post(`${this.smartphoneID}/comments`, newComment, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                    })
                    
                    this.$store.dispatch('loadComments', this.$route.params.slug)
                    this.cleanForm()
                }
                this.cleanForm()
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style>
.title{
    margin-bottom:10px;
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