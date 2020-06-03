<template>
    <div class="divFormComment">
        <div>¿Quieres publicar algo?</div>
        <el-input placeholder="Título" v-model="titleComment"></el-input>
        <el-input
        type="textarea"
        :rows="5"
        placeholder="¿Qué quieres contarnos?"
        v-model="bodyComment">
        </el-input>
        <el-button @click.prevent="sendComment" class="btnSend" type="primary">Enviar</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return{   
            titleComment: '',
            bodyComment: ''
        }
    },
    methods:{
        cleanForm() {
            this.titleComment = '',
            this.bodyComment = ''
        },
        async sendComment(){
            try {
                const token = window.localStorage.getItem('token')
                console.log(token)

                let newComment = {
                    title: this.titleComment,
                    body: this.bodyComment,
                    votes: 0
                }

                let sendComment = await this.$axios.post('comments', newComment, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                this.cleanForm()
                this.$router.push('/')
                this.$router.push('/comments')
                // NECESITO RECARGAR COMPONENTE. ToDo: Buscar forma correcta.
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style>
.divFormComment{
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    border: 2px solid var(--color-primary);
    border-radius: 10px;
    padding: 30px 15px;
    margin-top:30px;
    -webkit-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    -moz-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
}
.btnSend{
    margin-top: 20px;
    text-align: center;
}
.btnSend:hover{
    margin-top: 20px;
}
@media (min-width: 600px) {
    .divFormComment{
        width: 50%;
    }
}
@media (min-width: 850px) {
    .divFormComment{
        width: 50%;
    }
}
</style>