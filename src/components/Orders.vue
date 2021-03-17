<template>
<div>
    <div>
        <nav>
            <ul class = "orderBoxes">
                <li class = "boxes"><router-link to="/" exact>Home</router-link> </li>
                <li class = "boxes"> <router-link to="/orders" exact>Orders</router-link> </li>
                <li class = "boxes"><router-link to="/dashboard" exact>Dashboard</router-link> </li>
            </ul>
        </nav>
    </div>    

    <ul class = "orderBoxes">
        <li v-for = "(item) in orders" :key="item[0]" class = "boxes">
            <ul>
            <li v-for = "(i) in item[1]" :key= "i" id = "inside"> {{i.name}}: {{i.Qty}} </li>
            </ul>
            <button v-bind:id = item[0] v-on:click="deleteItem($event)"> Delete </button> 
            <button v-bind:id = item[0] v-on:click="route($event)"> Modify </button>
        </li>
    </ul>
</div>
</template>

<script>
import database from "../firebase.js"

export default {
    data(){
        return {
            orders: []
        }
    },
    methods: {
        fetchItems: function(){
            database.collection('orders').get().then(snapshot => {
                snapshot.docs.forEach(
                    doc => {
                        var temp = [];
                        doc.data().order.items.forEach(
                            x => {
                                temp.push(x);
                            }
                        )
                        this.orders.push([doc.id,temp]);
                    }
                );
            });
        },
        deleteItem(event){
            let doc_id = event.target.getAttribute("id");
            database.collection('orders').doc(doc_id).delete().then( () => location.reload());
        },
        route(event){
            let doc_id= event.target.getAttribute("id")
            this.$router.push({path: '/modify', name: 'modify', params: {id: doc_id} })
        }
    },
    created: function(){
        this.fetchItems();
    }
}
</script>



<style>
#inside {
  list-style-type: none;
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


button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>