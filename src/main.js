import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import PokemonList from "@/components/PokemonList.vue";

// Vue.component('PokemonList', PokemonList)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
