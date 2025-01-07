<template>
  <div class="flex justify-between mt-5 items-end gap-5">
    <div>
      <h2 class="text-xl mt-3">
        درامد سالانه شما :
        <span class="text-green-500"
          >${{ lastYearIncome[1].value.toLocaleString() }}</span
        >
      </h2>
      <h2 class="text-xl mt-3">
        درامد ماهانه شما :
        <span class="text-green-500"
          >${{ Math.round(lastYearIncome[1].value / 12).toLocaleString() }}</span
        >
      </h2>
    </div>
    <input
      @keyup="searchCost"
      type="search"
      id="search-cost"
      class="border border-primary rounded-full flex-grow p-2.5 outline-none"
      placeholder="جست و جوی هزینه..."
    />
    <button class="btn btn-primary" @click="$emit('openAddCostModal')">
      افزودن هزینه
    </button>
  </div>
</template>

<script>
import { inject, ref } from 'vue'
import FindLastYearIncome from '../hooks/FilterIncomes'
export default {
  setup (_, { emit }) {
    let userData = inject('userData')

    const [, lastYearIncome] = FindLastYearIncome()

    let searchValue = ref('')

    function searchCost (e) {
      searchValue.value = e.target.value
      if (e.key === 'Enter' || !e.target.value) {
        emit('searchCostAccept', searchValue)
      }
    }

    return { lastYearIncome, userData, searchCost }
  }
}
</script>
