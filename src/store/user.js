'use strict'

export default {
    namespaced: true,
    state: {
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
        username: state => state.username
    }
}