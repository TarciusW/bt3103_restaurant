<template>
<div>
    <div>
        <nav>
            <ul class = "orderBoxes" id = "seventy">
                <li class = "boxes"><router-link to="/" exact>Home</router-link> </li>
                <li class = "boxes"><router-link to="/orders" exact>Orders</router-link> </li>
                <li class = "boxes"><router-link to="/dashboard" exact>Dashboard</router-link> </li>
            </ul>
        </nav>
    </div>
    <ul id="itemsList" class = "ul1">
        <li v-for = "(item,index) in itemList" :key="index" id="boxes">
            <div id="itemName"> 
                {{item.name}} 
            </div>
            <img :src="item.imageURL"> 
            <div id="price">
                ${{item.price}}
            </div>
            <QtyCtr v-bind:item = "item" v-on:counter="onCounter"></QtyCtr>
        </li>
    </ul>
    <Basket v-bind:selected = "itemsSelected" id = "shoppingBasket"></Basket>
</div>
</template>





<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from "../firebase.js"

export default {
    data(){
        return {
            itemList: [],
            itemsSelected: []
        }
    },
    components:{
        QtyCtr : QuantityCounter,
        Basket
    },
    methods : {
        onCounter: function (item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
            } else {

                // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];

                // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                    if (item_name === item.name && count > 0){
                        this.itemsSelected.splice(i)
                        this.itemsSelected.push([item.name,count++,item.price])
                    }
                // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                    else if (item_name === item.name && count == 0){
                        this.itemsSelected.splice(i)
                    }
                // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                    else {
                        this.itemsSelected.push([item.name, count, item.price]);
                    }
                }
            }
        },
        fetchItems: function(){
            database.collection('menu').get().then(snapshot => {
                snapshot.docs.forEach(
                    doc => {
                        this.itemList.push(doc.data())
                    });
                });
        }
    },
    created: function() {
        this.fetchItems();
    }
}

</script>





<style>

#seventy {
    max-width: 70%;
}
.orderBoxes {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

.boxes {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
.ul1 {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
#boxes {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}

</style>