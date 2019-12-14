<template lang="pug">
  .home 
    h1 {{ title.toUpperCase() }} | Company Inc.
    //- p {{ description.slice(0, 30) + '...' }}
    p {{ shortDescription }}

    .inputs
      .input
        input(
          type="text"
          @keyup.down="increaseTitleMarginTop"
          @keyup.up="decreaseTitleMarginTop"
          @keyup="updateTitle(newTitle)"
          v-model="newTitle"
        )
      .input
        textarea(
          v-model="description"
        )
      .input
        input(
          type="text"
          v-model="newPokemon"
          @keyup.enter="createPokemon"
        )
    
    ul
      li(
        v-for="pokemon of pokemons"
      ) 
        div
          span {{ pokemon.name }} 
          input(type="number", v-model.number="pokemon.attack")
          input(type="number", v-model.number="pokemon.defense")
    
    //- h3 Daño total: {{ pokemons.reduce((acc, curr) => ({ attack: acc.attack + curr.attack })).attack }}
    h3 Daño total: {{ totalDamage }}
      
    //- button(
    //-   @click="updateTitle(newTitle)"
    //- ) Write Title
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
const descriptionMaxChars = 60

export default {
  name: 'Home',
  data() {
    const title = 'Vue Crash Course'
    return {
      title,
      newTitle: title,
      newPokemon: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      pokemons: [
        {
          name: 'Totodile',
          attack: 22,
          defense: 18
        },
        {
          name: 'Pikachu',
          attack: 17,
          defense: 23
        }
      ]
    }
  },
  created() {
    // setTimeout(() => this.updateTitle('Título Ninja 2'), 3000)
  },
  computed: {
    shortDescription() {
      return this.ellipsize(this.description)
    },
    totalDamage() {
      return this.pokemons
              .reduce((acc, curr) => ({
                attack: acc.attack + curr.attack
              })).attack
    }
  },
  methods: {
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
        defense: Math.floor(Math.random() * 40) + 1
      }

      this.pokemons.push(pokemon)
      // this.pokemons[0] = pokemon
      // this.$set(this.pokemons, 0, pokemon)

      this.newPokemon = ''
    }
  }
  // components: {
  //   HelloWorld
  // }
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

    textarea, input {
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
      border-radius: .5rem;
    }

    textarea {
      max-height: 500px;
      min-height: 200px;

      max-width: 100%;
      min-width: 100%;
    }
  }

</style>