<template lang="pug">
    .pokemon-list
        h3 Pokemon List
        ul(
            v-bind="$attrs"
        )
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

    // function Integer(number) {
    //     this.number = Math.floor(number)
    //     this.toString = function () {
    //         return `${this.number}`
    //     }
    // }

    // console.log(`${new Integer(3.2)}`)

    function getOnly(obj, keys) {
        const newObj = {}

        for( let key of keys ) {
            try {
                newObj[key] = obj[key]
            } catch (e) {
                if ( ! (e instanceof TypeError) ) { // error explained in sheet.js
                    throw e
                }

                newObj[key] = undefined
            }
        }

        return newObj
    }

    const compKeys = [
        '$el',
        'trainers',
        'initialTrainers',
        'totalDamage'
    ]
    const getOnlyForComp = obj => getOnly(obj, compKeys)

    export default {
        inheritAttrs: false,
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
            initialTrainers: Array,
            pokemons: Array
        },
        beforeCreate() {
            console.log('beforeCreate', getOnlyForComp(this))

            // socket.on('myEvento', () => {
            //     console.log('Do something...')
            // })
        },
        created() {
            console.log('created', getOnlyForComp(this))
        },
        beforeMount() {
            console.log('beforeMount', getOnlyForComp(this))
        },
        mounted() {
            console.log('mounted', getOnlyForComp(this))
        },
        beforeUpdate() {
            console.log('beforeUpdate')
        },
        updated() {
            console.log('updated')
        },
        beforeDestroy() {
            console.log('beforeDestroy', this)

            // socket.off('myEvento', () => {
            //     console.log('Do something...')
            // })
        },
        destroyed() {
            console.log('destroyed', this)
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