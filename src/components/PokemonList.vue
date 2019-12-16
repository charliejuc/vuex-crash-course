<template lang="pug">
    .pokemon-list
        h3 Pokemon List
        ul
            template(
                v-if="Array.isArray(pokemons)"
            )
                li(
                    v-for="pokemon, index of pokemons"
                    :key="index"
                ) 
                    template
                        span {{ pokemon.name }} de {{ trainers[pokemon.trainerId].name }} 
                        input(type="number" v-model.number="pokemon.attack")
                        input(type="number" v-model.number="pokemon.defense")

            li(
                v-else
            )
                template
                    span There are no pokemons
        
        template(
            v-for="trainer, index of trainers"            
        )
            h3(
                :key="index"
            ) 
                | Daño total del equipo de {{ trainer.name }}: {{ trainer.totalDamage }}
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
        data() {
            const trainers = this.initialTrainers
                                .map(trainer => Object.assign({
                                    totalDamage: 0
                                }, trainer))

            return {
                trainers
            }
        },
        props: {
            // trainers: Array,
            initialTrainers: Array,
            pokemons: Array
        },
        computed: {
            totalDamage() {
                console.log('Runs totalDamage')

                return Array.isArray(this.pokemons)
                        ? this.pokemons
                            .reduce((acc, curr) => ({
                                attack: acc.attack + curr.attack
                            })).attack
                        : 0
            }
        },
        watch: {
            totalDamage: {
                handler: 'setTrainersTotalDamage',
                /*
                    with immediate 'setTrainersTotalDamage' function is triggered just before
                    'created' vue lifecycle function.
                */
                immediate: true
            }
        },
        methods: {
            setTrainerTotalDamage(trainer, index) {
                console.log('Runs setTrainerTotalDamage')
                const pokemons = this.pokemons
                                    .filter(
                                        pokemon => pokemon.trainerId === index
                                    )

                trainer.totalDamage = Array.isArray(pokemons)
                                                ? pokemons
                                                    .reduce((acc, curr) => ({
                                                        attack: acc.attack + curr.attack
                                                    })).attack
                                                : 0
            },
            setTrainersTotalDamage() {
                this.trainers
                    .forEach(this.setTrainerTotalDamage)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>