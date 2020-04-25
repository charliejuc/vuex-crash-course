import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './user'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        title: 'Soy un super título de vuex'        
    },
    getters: {
        title: state => state.title,
    },
    modules: {
        user: userStore
    }
})