import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        title: 'Soy un super título de vuex',
        username: ''
    },
    actions: {
        async GET_USERNAME({ commit }, pk) {
            const res = await fetch(`http://localhost:3000/username/${pk}`)
            const { username } = await res.json()

            commit('SET_USERNAME', username)
        }
    },
    mutations: {
        SET_USERNAME(state, username) {
            state.username = username
        }
    },
    getters: {
        title: state => state.title,
        username: state => state.username
    }
})