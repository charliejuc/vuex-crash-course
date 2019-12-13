<template lang="pug">
  .home 
    h1 {{ title.toUpperCase() }} | Company Inc.
    //- p {{ description.slice(0, 30) + '...' }}
    p {{ shortDescription }}

    .inputs
      .input
        input(
          type="text"
          @keyup="updateTitle(newTitle)"
          v-model="newTitle"
        )
      .input
        textarea(
          v-model="description"
        )
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
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  },
  created() {
    // setTimeout(() => this.updateTitle('Título Ninja 2'), 3000)
  },
  computed: {
    shortDescription() {
      return this.ellipsize(this.description)
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