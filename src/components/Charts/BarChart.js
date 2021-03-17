import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Dish",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#F5F5DC"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero : true
            }}]},
            responsive: true,
            maintainAspectRatio: false
      }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        var menu = {
          "Prawn Omelette" : 0,
          "Dry Beef Hor Fun" : 0,
          "Sambal KangKung" : 0,
          "Pork Fried Rice" : 0,
          "Mapo Tofu" : 0,
          "Cereal Prawn" : 0
        }
        querySnapShot.forEach(doc => {
          doc.data().order.items.forEach( x =>{
            var temp = menu[x.name]
            menu[x.name] = temp + x.Qty
          })
        })
        Object.keys(menu).forEach( x =>{
          this.datacollection.labels.push(x)
        })
        Object.values(menu).forEach( x=> {
          this.datacollection.datasets[0].data.push(x)
        })
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  }
}