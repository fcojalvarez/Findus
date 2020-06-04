<template>
    <div>
        <h3 class="titleDivComment">Comentarios</h3>

        <div class="divContentComments">
            <h3 class="notComments" v-show="comments.length === 0">No hay comentarios, sé el primero en comentar.</h3>

            <div class="divComment" v-for="(comment, index) in comments" :key=index>
                <h4 class="titleComment">{{comment.title}} </h4>
                <hr class="separador">
                <span class="bodyComment">{{comment.body}}</span>
                <div class="voteDiv">
                    <i @click.prevent="addVoteComment(comment._id)" class="fas fa-heart voteIcon"></i>
                    <span class="voteNumber">{{comment.votes}}</span> 
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            comments: []
        }
    },
    methods:{
        async loadComments(){
            let response = await this.$axios.get('comments')
            let commentsDB = response.data
            this.comments = commentsDB
            return commentsDB
        },
        async addVoteComment(id){
            const token = window.localStorage.getItem('token')
            const commentSelect = await this.$axios.get(`comments/${id}`)

            let comment = {
                title: commentSelect.data.title,
                body: commentSelect.data.body,
                votes: commentSelect.data.votes +1
            }
    
            try {
                let commentEdit = await this.$axios.put(`comments/${id}`, comment, {
                    headers: { Authorization: `Bearer ${token}` }
                    })
                this.loadComments()
            } catch (err) {
                console.log(err)
            }
            
        }
    },
    mounted () {
        this.loadComments()
    }
}
</script>

<style>
.notComments{
    font-size: 0.8em;
    color: #999;
    margin-left: auto;
    margin-right: auto;
    padding-left: 25%;
    padding-right: 25%;
}
.divContentComments{
    width:100%;
    border-radius: 10px;
    margin: 10px auto;
}
.titleDivComment{
    margin: 0 0 0 100px;
    padding: 0;
}
.divComment{
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid var(--color-primary);
    border-radius: 10px;
    padding: 30px 20px;
    margin-top:30px;
    -webkit-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    -moz-box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
    box-shadow: 4px 3px 27px -13px rgba(99,99,99,1);
}
.separador{
    margin:10px;
    width: 96%;
}
.bodyComment{
    font-size: 0.9em;
    margin: 0 10px;
    display: block;
}
.titleComment{
    font-size: 1em;
    margin: 0 10px;
}
.voteIcon{
    color: var(--color-primary);
    margin-left: auto;
    cursor: pointer;
}
.voteDiv{
    margin: 10px 0 10px 90%;
}
.voteNumber{
    font-size: 0.9em;
}
@media (min-width: 850px) {
    .divContentComments{
    width:80%;
    min-height: 200px;
    border-radius: 10px;    margin: 40px auto;
    }
    .divComment{
    width: 75%;
    padding: 30px 15px;
    margin-top:30px;
    }
}
</style>