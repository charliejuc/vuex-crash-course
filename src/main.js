import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import PokemonList from "@/components/PokemonList.vue";

// Vue.component('PokemonList', PokemonList)

Vue.config.productionTip = false

// new Vue({
//   el: '#app',
//   router,
//   render: h => h(App)
// }).$mount()

new Vue({
  router,
  store,
  render: h => h(App),
  beforeMount() {
    console.log('global beforeMount', this.$el)
  },

  // between beforeMount and mounted all child components are mounted.

  mounted() {
    console.log('global mounted', this.$el)
  }
}).$mount('#app')