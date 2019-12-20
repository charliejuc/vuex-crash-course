<template lang="pug">
    .base-layout
        h1 Este es el BaseLayout
        slot
        //- slot(name="default")
        h2 Este es el final del BaseLayout
</template>

<script>
    export default {
        name: 'BaseLayout',
        //data() {
        //	return {
        //		value: null
        //	}
        //},
        //props: {
        //	foo: {
        //		type: String,
        //		required: true
        //	}
        //},
        //computed: {
        //},
        //watch: {
        //},
        //mounted() {
        //},
        //methods: {
        //}
    }
</script>

<style lang="scss" scoped>
    h1 {
        color: red;
    }
</style>

<style lang="scss">
    h1 {
        color: red;
    }
</style>