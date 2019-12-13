<template lang="pug">
  .home 
    h1 {{ title }} | Company Inc.
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return {
      title: 'Vue Crash Course'
    }
  },
  created() {
    setTimeout(() => {
      this.title = 'Título Ninja'
    }, 3000)
  }
  // components: {
  //   HelloWorld
  // }
}
</script>
