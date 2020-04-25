<template lang="pug">
  .home 
    h1 Hola {{ username }}
    h1 {{ vuexTitle }}
    h1 {{ title.toUpperCase() }} | Company Inc.
    base-layout
      //- p {{ description.slice(0, 30) + '...' }}
      p {{ shortDescription }}

      .inputs
        .input
          text-input(          
            @keyup.down="increaseTitleMarginTop"
            @keyup.up="decreaseTitleMarginTop"
            @keyup="updateTitle(newTitle)"
            v-model="newTitle"
            label="Título"
            :class="inputClasses"
          )
        .input
          textarea(
            v-model="description"
          )
        .input
          text-input(
            v-model="newPokemon"
            @keyup.enter="createPokemon"
            label="Nombre Pokemon"
            placeholder="Pikachu"
          )
            template(
              slot="label"
              slot-scope="{ labelTitle }"
              )
              h2(
                v-html="`Label ${labelTitle.toUpperCase()}`"
              )
              h3 Label subtitle
        .input
          label
            span(
              v-show="showPokemonList"
            ) Ocultar Lista de Pokemons
            span(
              v-show="!showPokemonList"
            ) Mostrar Lista de Pokemons
            input(
              type="checkbox"
              v-model="showPokemonList"
            )

      pokemon-list(
        v-show="showPokemonList"
        v-bind="pokemonListAttrs"
      )

</template>

<script>
// @ is an alias to /src
import { mapGetters, createNamespacedHelpers } from 'vuex'
import BaseLayout from "@/layouts/BaseLayout.vue"
import PokemonList from "@/components/PokemonList.vue"
import TextInput from "@/components/TextInput.vue"

const {
  mapGetters: userMapGetter,
  mapActions: userMapActions
} = createNamespacedHelpers('user')

const descriptionMaxChars = 60

export default {
  name: 'Home',
  data() {
    const title = 'Vue Crash Course'
    const trainers = [
      {
        name: 'Ash Ketchup',
        birthPlace: 'Tomato Village'
      },
      {
        name: 'Leon',
        birthPlace: 'Raccoon City'
      }
    ]
    const pokemons = [
      {
        name: 'Totodile',
        attack: 22,
        defense: 18,
        trainerId: 0
      },
      {
        name: 'Pikachu',
        attack: 17,
        defense: 23,
        trainerId: 1
      }
    ]

    return {
      title,
      newTitle: title,
      newPokemon: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      pokemonListAttrs: {
        initialTrainers: trainers,
        pokemons
      },
      trainers,
      pokemons,
      showPokemonList: true
    }
  },
  mounted() {
    let i = 1
    setInterval(() => {
      this.GET_USERNAME(i % 3 + 1)
      ++i
     }, 1000)
  },
  computed: {
    ...mapGetters({
      vuexTitle: 'title'
    }),
    ...userMapGetter([
      'username'
    ]),
    shortDescription() {
      return this.ellipsize(this.description)
    },
    inputClasses() {
      return {
        'is-danger': this.title.length > 30
      }
    }
  },
  methods: {
    ...userMapActions([
      'GET_USERNAME'
    ]),
    // inputClasses() {
    //   return {
    //     'is-danger': this.title.length > 30
    //   }
    // },
    updateTitle(title) {
      this.title = title
    },
    ellipsize(text) {
      if ( typeof(text) !== 'string' || text.length <= descriptionMaxChars ) {
        return text
      }

      return `${text.slice(0, descriptionMaxChars)}...`
    },
    modifyTitleMarginTop(modifierCb) {
      const title = this.$el.querySelector('h1')
      const oldMarginTop = getComputedStyle(title).marginTop
      const newMarginTop = modifierCb(Number(oldMarginTop.slice(0, -2)))

      title.style.marginTop = `${newMarginTop}px`
    },
    increaseTitleMarginTop() {
      this.modifyTitleMarginTop(oldMarginTop => oldMarginTop + 40)
    },
    decreaseTitleMarginTop() {
      this.modifyTitleMarginTop(oldMarginTop => oldMarginTop - 40)
    },
    createPokemon() {
      if ( ! this.newPokemon ) {
        return
      }

      const pokemon = {
        name: this.newPokemon,
        attack: Math.floor(Math.random() * 40) + 1,
        defense: Math.floor(Math.random() * 40) + 1,
        trainerId: Math.floor(Math.random() * this.trainers.length)
      }

      this.pokemons.push(pokemon)
      // this.pokemons[0] = pokemon
      // this.$set(this.pokemons, 0, pokemon)

      this.newPokemon = ''
    }
  },
  components: {
    BaseLayout,
    PokemonList,
    TextInput
  }
}
</script>

<style lang="scss">
  .home {
    width: 850px;
    margin: 0 auto;
  }

  .inputs {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .input {
    box-sizing: border-box;
    margin-top: 20px;
    padding: 0 10px;
    width: inherit;

    textarea {
      box-sizing: border-box;
      border-radius: .5rem;
      padding: 10px;
      width: 100%;

      max-height: 500px;
      min-height: 200px;

      max-width: 100%;
      min-width: 100%;
    }
  }

</style>

<style lang="scss" scoped>
  // div /deep/ h1 {
  //   color: blue;
  // }

  // div ::v-deep h1 {
  //   color: red;
  // }

  // div >>> h1 {
  //   color: red;
  // }
</style>