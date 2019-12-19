<template lang="pug">
  .home 
    h1 {{ title.toUpperCase() }} | Company Inc.
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

    pokemon-list(
      v-bind="pokemonListAttrs"
    )

</template>

<script>
// @ is an alias to /src
import PokemonList from "@/components/PokemonList.vue"
import TextInput from "@/components/TextInput.vue"

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
      pokemons
    }
  },
  created() {
    // setTimeout(() => this.updateTitle('Título Ninja 2'), 3000)
  },
  computed: {
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