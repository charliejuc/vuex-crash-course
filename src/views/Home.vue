<template lang="pug">
  .home 
    h1 {{ title.toUpperCase() }} | Company Inc.
    input(
      type="text"
      @keyup="updateTitle(newTitle)"
      v-model="newTitle"
    )
    //- button(
    //-   @click="updateTitle(newTitle)"
    //- ) Write Title
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    const title = 'Vue Crash Course'
    return {
      title,
      newTitle: title
    }
  },
  created() {
    // setTimeout(() => this.updateTitle('Título Ninja 2'), 3000)
  },
  methods: {
    updateTitle(title) {
      this.title = title
    }
  }
  // components: {
  //   HelloWorld
  // }
}
</script>
