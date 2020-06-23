import jwt_decode from 'jwt-decode'

export const state = () => ({
    comments: [],
    isAuth: false,
    currentUser: '',
    smartphoneID: '',
    isFindRandomDevice: true,
    devicesFavorites: []
})

export const actions = {
    async loadComments(context, smartphoneID) {
        try {
            const response = await this.$axios.get(`${smartphoneID}/comments`),
                commentsDB = response.data;
            const result = commentsDB.filter(comment => comment.smartphoneID === smartphoneID)
            context.commit('addComments', result)
            return result
        } catch (err) {}
    },
    checkAuth(context) {
        const token = window.localStorage.getItem('token')
        const resultToken = token != null
        let user


        if (token !== null) {
            const tokenDecoded = jwt_decode(token)
            user = tokenDecoded
        }

        const result = {
            currentUser: user,
            isAuth: resultToken
        }

        context.commit('checkAuthMutation', result)
    },
    logout(context, result) {
        window.localStorage.removeItem("token")
        this.$router.push('/')
        context.commit('checkAuthMutation', result)
    },
    setIDDevice(context, ID) {
        context.commit('setIDDeviceMutation', ID)
    },
    async getDevicesFavorites(context) {
        try {
            const token = window.localStorage.getItem('token')
            let userID
            let devicesFavorites

            if (token === undefined) {
                return
            } else {
                const tokenDecoded = jwt_decode(token)
                userID = tokenDecoded.id
            }

            devicesFavorites = await this.$axios.get(`users/${userID}/getDevicesFavorites`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            context.commit('setDevicesFavorites', devicesFavorites.data)
        } catch (err) {}
    }
}

export const mutations = {
    addComments(state, payload) {
        state.comments = payload
    },
    checkAuthMutation(state, result) {
        state.isAuth = result.isAuth
        state.currentUser = result.currentUser || ''
    },
    logoutMutation(state, result) {
        state.isAuth = result
    },
    setIDDeviceMutation(state, ID) {
        state.smartphoneID = ID
    },
    hideRandomDevices(state) {
        state.isFindRandomDevice = false
    },
    setDevicesFavorites(state, devices) {
        state.devicesFavorites = devices
    }
}

export const getters = {
    getComments(state) {
        return state.comments
    },
    getDeviceID(state) {
        return state.smartphoneID
    }
}