import { inject, computed } from 'vue'

export default function FilterIncomes () {
  let incomes = inject('incomes')

  let userIncomes = computed(() => {
    return incomes.value.slice().sort((a, b) => a[1].year - b[1].year)
  })  

  let lastYearIncome = computed(() => {
    return userIncomes.value[userIncomes.value.length -1]
  })

  return [userIncomes, lastYearIncome]
}
