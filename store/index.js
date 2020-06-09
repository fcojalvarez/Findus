import jwt_decode from 'jwt-decode'

export const state = () => ({
    comments: [],
    isAuth: false,
    currentUser: '',
    smartphoneID: '',
    devices: []
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
    },
    setIDDevice(context, ID) {
        /* let ID = this.$route.params.slug */
        context.commit('setIDDeviceMutation', ID)
    },
    async getDevices(context) {
        try {
            let response = await this.$axios.get("https://fonoapi.freshpixl.com/v1/getlatest?token=5eb7a3f53695d523ceb4eca3cbba7cba7fa45f43c035140a&limit=3"),
                result = response.data;
            console.log(result)

            context.commit('getDevicesMutation', result)
        } catch (err) {
            console.log(err)
        }
        /* 
                let getDevices = await this.$axios.get("https://fonoapi.freshpixl.com/v1/getlatest?token=5eb7a3f53695d523ceb4eca3cbba7cba7fa45f43c035140a&limit=1")

                let devices = getDevices.data

                context.commit('getDevicesMutation', devices) */
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
    },
    setIDDeviceMutation(state, ID) {
        state.smartphoneID = ID
    },
    getDevicesMutation(state, devices) {
        state.devices = devices
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