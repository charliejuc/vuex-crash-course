<template lang="pug">
  .home 
    h1 {{ title }} | Company Inc.
    input(
      type="text"
      v-model="newTitle"
    )
    button(
      @click="updateTitle(newTitle)"
    ) Write Title
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return {
      title: 'Vue Crash Course',
      newTitle: ''
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
