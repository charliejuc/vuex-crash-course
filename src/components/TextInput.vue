<template lang="pug">
    label
        slot(
            name="label"
            :labelTitle="labelTitle"
            ) {{ label }}
        //- style and class attrs works differently
        input(
            type="text"
            @input="$emit('input', $event.target.value)"
            @keyup="keyup"
            :value="value"
            v-bind="$attrs"
            )
</template>

<script>

    export default {
        inheritAttrs: false,
        name: 'TextInput',
        data() {
            return {
                labelTitle: 'L<mark>title</mark>'
            }
        },
        props: {
            label: String,
            value: String
        },
        methods: {
            keyup(event) {
                this.$emit('keyup', event)            
            }
        }
    }
</script>

<style lang="scss" scoped>
    .is-danger > input {
        color: red;
    }

    input {
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        border-radius: .5rem;
    }
</style>