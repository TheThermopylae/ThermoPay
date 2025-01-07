import { inject, computed } from 'vue'

export default function FilterIncomes () {
  let userData = inject('userData')
  let incomes = inject('incomes')

  let userIncomes = computed(() => {
    let findIncomes = incomes.value.filter(
      income => income[1].for == userData.value.name
    )
    return findIncomes.slice().sort((a, b) => a[1].year - b[1].year)
  })

  let lastYearIncome = computed(() => {
    let date = new Date().getFullYear()

    let lastYear = userIncomes.value.find(income => income[1].year == date)
    return lastYear
  })
  return [userIncomes, lastYearIncome]
}