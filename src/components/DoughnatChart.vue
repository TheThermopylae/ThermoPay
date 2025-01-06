<template>
  <Doughnut :data="data" :options="options"></Doughnut>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { ref, computed, inject } from 'vue'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  components: {
    Doughnut
  },
  setup () {
    let userData = inject('userData')
    let costs = inject('costs')

    let userCosts = computed(() =>
      costs.value.filter(cots => cots[1].for == userData.value.name)
    )

    let categories = ['اینترنت', 'رفت و آمد', 'تفریح', 'ماشین', 'خانه', 'دیگر']

    let internetCosts = computed(() => {
      let allCosts = userCosts.value.filter(
        cost => cost[1].selectCategory == 'اینترنت' && cost[1].isPurchased
      )
      let sum = 0

      allCosts.forEach(cost => (sum += cost[1].price))

      return sum
    })

    let travel = computed(() => {
      let allCosts = userCosts.value.filter(
        cost => cost[1].selectCategory == 'رفت و آمد' && cost[1].isPurchased
      )
      let sum = 0

      allCosts.forEach(cost => (sum += cost[1].price))

      return sum
    })

    let fun = computed(() => {
      let allCosts = userCosts.value.filter(
        cost => cost[1].selectCategory == 'تفریح' && cost[1].isPurchased
      )
      let sum = 0

      allCosts.forEach(cost => (sum += cost[1].price))

      return sum
    })

    let car = computed(() => {
      let allCosts = userCosts.value.filter(
        cost => cost[1].selectCategory == 'ماشین' && cost[1].isPurchased
      )
      let sum = 0

      allCosts.forEach(cost => (sum += cost[1].price))

      return sum
    })

    let house = computed(() => {
      let allCosts = userCosts.value.filter(
        cost => cost[1].selectCategory == 'خانه' && cost[1].isPurchased
      )
      let sum = 0

      allCosts.forEach(cost => (sum += cost[1].price))

      return sum
    })

    let other = computed(() => {
      let allCosts = userCosts.value.filter(
        cost => cost[1].selectCategory == 'دیگر' && cost[1].isPurchased
      )
      let sum = 0

      allCosts.forEach(cost => (sum += cost[1].price))

      return sum
    })

    let data = ref({
      labels: categories,
      datasets: [
        {
          backgroundColor: [
            '#f87979',
            '#79f879',
            '#7979f8',
            '#f8e479',
            '#79e4f8',
            '#f879e4',
          ],
          data: [internetCosts, travel, fun, car, house, other]
        }
      ]
    })

    const options = computed(() => ({
      responsive: true
    }))

    return { data, options }
  }
}
</script>