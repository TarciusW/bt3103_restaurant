<template>
    <div id="app">
    <button v-on:click="counterDecrease"> - </button> {{count}} <button v-on:click="counterIncrease"> + </button>
    </div>
</template>


<script>
export default {
    props: {
        item: {
            type: Object
        }
    },
    data () {
        return {
            count: 0
        }
    },
    methods: {
        counterIncrease: function(){
            this.count++
            this.$emit('counter', this.item, this.count)

        },
        counterDecrease: function(){
            if (this.count >0){
                this.count--
                this.$emit('counter', this.item, this.count)
            }
        }
    }
}
</script>



<style>

</style>