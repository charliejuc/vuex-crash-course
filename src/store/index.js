import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        title: 'Soy un super título de vuex'
    },
    getters: {
        title: state => state.title
    }
})