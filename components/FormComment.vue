<template>
    <el-form class="divFormComment">
        
        <span class="title">¿Qué te parece esta recomendación?</span>
        <el-form-item>
            <el-input placeholder="Título" v-model="titleComment"></el-input>
            <el-input
            type="textarea"
            :rows="5"
            placeholder="¿Qué quieres contarnos?"
            v-model="bodyComment">
            </el-input>
        </el-form-item>
        <el-button @click.prevent="createComment" class="btnSend" type="primary">Enviar</el-button>
    
    </el-form>
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
        async createComment(){
            try {
                const token = window.localStorage.getItem('token')

                let newComment = {
                    title: this.titleComment,
                    body: this.bodyComment,
                    votes: 0
                }

                if(newComment.title && newComment.body){
                    let sendComment = await this.$axios.post('comments', newComment, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                    })
                    this.cleanForm()
                    this.$router.push('/comments')
                }
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
    padding: 20px;
    margin-top:30px;
    -webkit-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    -moz-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
}
.btnSend{
    text-align: center;
}
@media (min-width: 600px) {
    .divFormComment{
        width: 50%;
        padding: 30px
    }
}
@media (min-width: 850px) {
    .divFormComment{
        width: 50%;
    }
}
</style>