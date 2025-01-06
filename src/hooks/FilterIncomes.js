import { inject, computed } from 'vue'

export default function FilterIncomes () {
  let userData = inject('userData')
  let incomes = inject('incomes')

  let userIncomes = computed(() =>
    incomes.value.filter(income => income[1].for == userData.value.name)
  )

  let lastYearIncome = computed(() => {
    let values = []

    for (let item of userIncomes.value) {
      values.push(item[1].value)
    }
    return Math.max(...values)
  })
  return [userIncomes, lastYearIncome]
}