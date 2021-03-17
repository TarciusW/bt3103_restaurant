<template>
    <div>
      <h1> Menu </h1>
      <ul v-for="item in selected" :key="item"> 
          <li> {{item[0]}} x {{item[1]}} </li>
      </ul>

      <button v-on:click="shower(); sendOrder();"> Find Total </button>
      <div v-show="bool"> Subtotal: ${{findTotal()}} </div> <br>
      <div v-show="bool"> Grand Total: ${{grandTotal}} </div>

    </div>
</template>



<script>
import database from "../firebase.js"

export default {
    props: {
        selected: {
               type: Array
        }
    },
    data(){
        return{
            subTotal:0,
            grandTotal: 0,
            bool: false,
            sending : []
        }
    },
    methods: {
        findTotal: function(){
            var subtot = 0;
            for (let i = 0; i < this.selected.length; i++) {
                subtot += this.selected[i][1] * this.selected[i][2];
            }
            this.subTotal = subtot
            return subtot
        },
        shower: function(){
            this.bool=true
        },
        sendOrder: function(){
            var orderList = {
                items : [
                    {name: "Prawn Omelette",
                    Qty: 0},
                    {name: "Dry Beef Hor Fun",
                    Qty: 0},
                    {name: "Sambal KangKung",
                    Qty:0},
                    {name: "Pork Fried Rice",
                    Qty: 0},
                    {name: "Mapo Tofu",
                    Qty: 0},
                    {name: "Cereal Prawn",
                    Qty: 0}                    
                ]
            };

            this.selected.forEach( x => {
                var i;
                for (i=0 ; i < orderList.items.length; i++){
                    if (orderList.items[i].name === x[0]){
                        orderList.items[i].Qty = x[1];
                        break;
                    }
                }
            });

            database.collection('orders').add({
                order : orderList
            }).then( () => location.reload())
        },
    },
    watch: {
        subTotal: function(){
            this.grandTotal = (this.subTotal * 1.07).toFixed(2)
        }
    }
}
</script>




<style>
ul {
    font-size: 25px;
    align-content: initial;
}
</style>