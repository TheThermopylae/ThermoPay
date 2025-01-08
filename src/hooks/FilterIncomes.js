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
    return userIncomes.value[userIncomes.value.length -1]
  })

  return [userIncomes, lastYearIncome]
}
