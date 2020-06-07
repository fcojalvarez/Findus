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
    computed: {
        comments () {
            return this.$store.state.comments
        },
        
    },
    mounted () {
        this.$store.dispatch('loadComments', this.$route.params.slug) 
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
@media (min-width: 850px) {

}
</style>