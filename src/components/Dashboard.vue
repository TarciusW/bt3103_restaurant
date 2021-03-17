<template>
    <div>
        <nav>
            <ul class = "orderBoxes">
                <li class = "boxes"><router-link to="/" exact>Home</router-link> </li>
                <li class = "boxes"><router-link to="/orders" exact>Orders</router-link> </li>
                <li class = "boxes"><router-link to="/dashboard" exact>Dashboard</router-link> </li>
            </ul>
        </nav>
    <BC> </BC>
    <CallAPI> </CallAPI>
    </div>
</template>

<script>
import BarChart from './Charts/BarChart.vue'
import CallAPI from './Charts/CallAPI.vue'

export default {
    components :{
        BC : BarChart,
        CallAPI
    }
}
</script>

<style>

</style>