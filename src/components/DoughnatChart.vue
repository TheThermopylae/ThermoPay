<template>
  <Doughnut :data="data" :options="options" v-if="userCosts.length > 0"></Doughnut>
  <p v-else>موردی موجود نیست! در صفحه ی هزینه ها، هزینه های خود را یادداشت کنید</p>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { computed, inject, nextTick } from 'vue'
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

    function calculate (category) {
      let allCosts = userCosts.value.filter(
        cost => cost[1].selectCategory == category && cost[1].isPurchased
      )

      let sum = 0

      allCosts.forEach(cost => (sum += cost[1].price))

      return sum
    }
    let data = computed(() => {
      nextTick(() => ({
        labels: categories,
        datasets: [
          {
            backgroundColor: [
              '#f87979',
              '#79f879',
              '#7979f8',
              '#f8e479',
              '#79e4f8',
              '#f879e4'
            ],
            data: [
              calculate('اینترنت'),
              calculate('رفت و آمد'),
              calculate('تفریح'),
              calculate('ماشین'),
              calculate('خانه'),
              calculate('دیگر')
            ]
          }
        ]
      }))

      return {
        labels: categories,
        datasets: [
          {
            backgroundColor: [
              '#f87979',
              '#79f879',
              '#7979f8',
              '#f8e479',
              '#79e4f8',
              '#f879e4'
            ],
            data: [
              calculate('اینترنت'),
              calculate('رفت و آمد'),
              calculate('تفریح'),
              calculate('ماشین'),
              calculate('خانه'),
              calculate('دیگر')
            ]
          }
        ]
      }
    })

    const options = computed(() => ({
      responsive: true
    }))

    return { data, options, userCosts }
  }
}
</script>
