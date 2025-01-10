  <template>
    <Bar
      :key="chartKey"
      class="text-white"
      :data="chartData"
      :options="chartOptions"
      v-if="years.length > 0"
    />
    <p class="text-center" v-else>
      اطلاعات موجود نیست! در صفحه ی درآمد ها، سال درآمدی خود را وارد کنید
    </p>
  </template>

  <script>
  import { computed, inject, ref, watch } from 'vue'
  import { Bar } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'

  import FilterIncomes from '../hooks/FilterIncomes'

  ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)

  import ToDarkMode from '../hooks/ToDarkMode'

  export default {
    name: 'BarChart',
    components: { Bar },
    setup () {
      const userData = inject('userData')

      const [userIncomes] = FilterIncomes()

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

      const chartKey = ToDarkMode()

      return {
        chartData,
        chartOptions,
        userData,
        years,
        chartKey
      }
    }
  }
  </script>
