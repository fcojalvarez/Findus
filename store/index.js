import jwt_decode from 'jwt-decode'

export const state = () => ({
    comments: [],
    isAuth: false,
    currentUser: ''
})

export const actions = {
    async loadComments(context, smartphoneID) {
        try {
            let response = await this.$axios.get(`${smartphoneID}/comments`),
                commentsDB = response.data;

            let result = commentsDB.filter(comment => comment.smartphoneID === smartphoneID)

            context.commit('addComments', result)
            return result
        } catch (err) {
            console.log(err)
        }
    },
    async addVoteComment(context, id) {

        try {
            const token = window.localStorage.getItem('token');
            let commentSelect = await this.$axios.get(`${this.smartphoneID}/comments/${id}`);
            let addVote = { votes: commentSelect.data.votes + 1 };
            let prueba = {...commentSelect.data, ...addVote };

            let commentEdit = await this.$axios.put(`${this.smartphoneID}/comments/${id}`, prueba, {
                headers: { Authorization: `Bearer ${token}` }
            });
            this.loadComments()

        } catch (err) {
            console.log(err)
        }
    },
    checkAuth(context) {
        const token = window.localStorage.getItem('token')
        let resultToken = token != null
        let user


        if (token !== null) {
            let tokenDecoded = jwt_decode(token)
            user = tokenDecoded.name
        }

        let result = {
            currentUser: user,
            isAuth: resultToken
        }

        context.commit('checkAuthMutation', result)
    },
    logout(context, result) {
        window.localStorage.removeItem("token")
        context.commit('checkAuthMutation', result)
    }
}

export const mutations = {
    addComments(state, payload) {
        state.comments = payload
    },
    checkAuthMutation(state, result) {
        state.isAuth = result.isAuth
        state.currentUser = result.currentUser
    },
    logoutMutation(state, result) {
        state.isAuth = result
    }
}

export const getters = {
    getComments(state) {
        return state.comments
    }
}