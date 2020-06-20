<template>
    <div class="divContentComments">
        <h3 class="titleDivComment">Comentarios</h3>
        <h3 class="notComments" v-show="comments.length === 0">No hay comentarios, sé el primero en comentar.</h3>
        <div class="divComment" v-for="comment in comments" :key=comment._id>
            <h4 class="userComment">{{comment.userCreate}} </h4>
            
            <span class="bodyComment">{{comment.body}}</span>
            <div class="footerComment">
                <span class="creationDate">Fecha de creación: {{comment.creationDate}}</span>
                <div class="divVote">
                    <i @click.prevent="addVoteComment(comment._id)" class="fas fa-heart voteIcon"></i>
                    <span class="voteNumber">{{comment.votes}}</span> </div>
                </div>
            <hr class="separador">
            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data(){
        return{
            deviceID: this.$route.params.id
        }
    },
    computed: {
        comments () {
            return this.$store.state.comments
        },
        currentUser() {
            return this.$store.state.currentUser
        }
    },
    mounted () {
        this.$store.dispatch('loadComments', this.$route.params.id) 
    },
    methods:{
         async addVoteComment(commentID) {
            try {
                const token = window.localStorage.getItem('token');
                let commentSelect = await this.$axios.get(`idpruebas/comments/${commentID}`);
                let commentData = commentSelect.data

                if(commentData.usersVotes.includes(this.currentUser.id)){
                    this.$message({
                        showClose: true,
                        message: 'Sólo puede votar una vez por comentario.',
                        type: 'error'
                    });
                    return
                } 
                commentData.usersVotes.push(this.currentUser.id)
                commentData.votes = commentData.votes +1

                let commentEdit = await this.$axios.put(`idpruebas/comments/${commentID}`, commentData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                this.$store.dispatch('loadComments', this.deviceID)

            } catch (err) {
            }

        }
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
    width: 80%;
        min-height: 200px;
    margin: 5px auto;
}
.titleDivComment{
    font-size: 15px;
    margin-bottom: 15px;
}
.divComment{
    margin-top:15px 0;
} 

.userComment{
    font-size: 0.8em;
    color: #333;
}
.bodyComment{
    font-size: 0.9em;
    display: block;
    margin: 10px 0;
}
.separador{
    margin: 10px 0;
    border: none;
}
.footerComment{
    display: flex;
    justify-content: space-between;
    height: 20px;
}
.creationDate{
    font-size: 0.5em;
    margin: auto 0;
}
.divVote{
    display: flex;
    justify-content: space-around;
    width: 5%;
    margin-right: 5%;
}
.voteIcon{
    color: var(--color-primary);
    cursor: pointer;
    margin-right: 10px;
}
.voteNumber{
    font-size: 0.9em;
}
.onlyOneTimes{
    text-align: center;
    background: rgb(248, 182, 182);
    color: rgb(155, 19, 19);
    border: 1px solid rgb(155, 19, 19);
    border-radius: 10px;
    width: 40%;
    padding: 5px;
    display: block;
    margin: 10px 0 10px auto;
    font-size: 0.8em;
}
</style>