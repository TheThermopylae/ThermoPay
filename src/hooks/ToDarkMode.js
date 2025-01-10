import { ref, inject, watch } from 'vue'
import { Chart as ChartJs } from 'chart.js'

export default function ToDarkMode () {
  let chartKey = ref(0)

  let darkmode = inject('darkmode')

  watch(darkmode, () => {
    if (darkmode.value) ChartJs.defaults.color = '#fff'
    else ChartJs.defaults.color = '#000'

    chartKey.value++
  })

  ChartJs.defaults.color = darkmode.value ? "#fff" : "#000"

  return chartKey
}