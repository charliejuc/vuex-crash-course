<template lang="pug">
    .pokemon-list
        h3 Pokemon List
        ul
            template(
                v-if="Array.isArray(pokemons)"
            )
                li(
                    v-for="pokemon of pokemons"
                ) 
                    template
                        span {{ pokemon.name }} 
                        input(type="number", v-model.number="pokemon.attack")
                        input(type="number", v-model.number="pokemon.defense")

            li(
                v-else
            )
                template
                    span There are no pokemons
            
        h3 Daño total: {{ totalDamage }}
</template>

<script>
    /* Understanding v-if with v-for and because can't use v-else.
        //BAD IDEA
        div(
            v-if="isEmptyList(list)"
            v-for="element of list"
        )
            span element.name

        div(
            v-else
        )
            span There are no elements

        // CODE EXAMPLE ABOUT ABOVE

        for ( let element of list ) {
            if ( isEmptyList(list) ) {
                paintElements()
            }
        }
        else ???

        //GOOD IDEA
        template(
            v-if="isEmptyList(list)"
        )
            div(            
                v-for="element of list"
            )
                span element.name

        div(
            v-else
        )
            span There are no elements

        // CODE EXAMPLE ABOUT ABOVE

        if ( isEmptyList(list) ) {
            for ( let element of list ) {
                paintElements()
            }
        } else {
            paintThereAreNoElements()
        }
    */

    export default {
        name: 'PokemonList',
        props: [
            'pokemons'
        ],
        computed: {
            totalDamage() {
                return Array.isArray(this.pokemons)
                        ? this.pokemons
                            .reduce((acc, curr) => ({
                                attack: acc.attack + curr.attack
                            })).attack
                        : 0
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>