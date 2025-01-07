<template>
  <Bar :data="chartData" :options="chartOptions" v-if="userData" />
</template>

<script>
import { computed, inject } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  setup () {
    const userData = inject('userData')
    const incomes = inject('incomes')

    const userIncomes = computed(() => {
      let findIncomes = incomes.value.filter(
        income => income[1].for == userData.value.name
      )

      return findIncomes.slice().sort((a, b) => a[1].year - b[1].year)
    })

    let years = computed(() => {
      let yearsArray = []
      for (let item of userIncomes.value) {
        yearsArray.push(item[1].year)
      }

      return yearsArray
    })

    let incomeValue = computed(() => {
      let incomesArray = []
      for (let item of userIncomes.value) {
        incomesArray.push(item[1].value)
      }
      return incomesArray
    })

    const chartData = computed(() => ({
      labels: years.value,
      datasets: [
        {
          backgroundColor: [
            '#f87979',
            '#79f879',
            '#7979f8',
            '#f8e479',
            '#79e4f8',
            '#f879e4',
            '#e4f879'
          ],
          data: incomeValue.value
        }
      ]
    }))

    const chartOptions = computed(() => ({
      plugins: {
        legend: {
          display: false
        }
      },
      responsive: true
    }))

    return {
      chartData,
      chartOptions,
      userData
    }
  }
}
</script>
