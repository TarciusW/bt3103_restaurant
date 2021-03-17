<template>
<div>
    <ul>
        <li v-for= "i in this.datapacket" :key="i">
            {{i.name}} {{i.Qty}}
            <br>
            <input type="number" placeholder=0 min="0"> 
        </li>
        
        <button v-on:click="updateOrder"> Update Order </button>
    </ul>
</div>
    
</template>

<script>
import database from "../firebase.js"

export default {
    data(){
        return {
            datapacket: [],
            rawnum: [],
            in: [],
            copy: []
        }
    },
    props: {
        id: String
    },
    methods:{
        fetchItems(){
            database.collection('orders').doc(this.id).get().then(snapshot => {
                var i;
                for(i = 0; i < snapshot.data().order.items.length; i++) {
                    this.datapacket.push(snapshot.data().order.items[i])
                }
            });
        },
        updateOrder: function() {
      this.rawnum = document.getElementsByTagName("input");
      var i;
      for( i of this.rawinputs) {
        this.in.push(i.value);
      }

      this.copy = this.datapacket;
      var j;
      for (j=0; j < this.copy.length; j++) {
        if (this.in[j]!=this.copy[j].quantity) {
          this.copy[j].quantity = this.in[j];
        }
      }
        database.collection("orders").doc(this.id).update({
            [`list1.list2`]: this.copy
        })
      this.$router.push({path: "/orders"});
    }
  },
    created: function(){
        this.fetchItems();
    }
}
</script>

<style>
ul{
    list-style-type: none;
}

</style>