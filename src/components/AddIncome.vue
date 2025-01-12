<template>
  <div class="lg:flex justify-between gap-5 items-end">
    <div v-if="lastYearIncome" class="text-2xl leading-10">
      <h2>
        درآمد شما در امسال :
        <span class="text-green-500"
          >${{ lastYearIncome[1].value.toLocaleString() }}</span
        >
      </h2>
      <h2>
        میانگین درامد شما :
        <span class="text-green-500"
          >${{ Math.round(avgIncomes).toLocaleString() }}</span
        >
      </h2>
    </div>
    <div class="lg:flex flex-grow gap-5">
      <input
        type="number"
        id="new-year-income"
        class="border border-primary w-full rounded-full px-4 outline-none p-2.5 my-3 lg:m-0"
        placeholder="سال درآمد شما"
        v-model="incomeData.year"
      />
      <input
        type="number"
        id="new-value-income"
        class="border border-primary w-full rounded-full px-4 outline-none p-3 lg:py-0 mb-3 lg:m-0"
        placeholder="مقدار درآمد شما"
        v-model="incomeData.value"
      />
    </div>
    <div>
      <button @click="addIncome" class="btn btn-primary w-28" v-if="!loading">
        اضافه کردن
      </button>
      <button class="btn btn-primary w-28" v-else>
        <LoadingSpinner class="w-7 h-7"></LoadingSpinner>
      </button>
    </div>
    <button @click="$emit('showRemoveAllIncomesModal')" class="btn bg-red-500 hover:bg-red-600 text-white">
      حذف تمامی درآمد ها
    </button>
  </div>
</template>

<script setup>
import { computed, inject, reactive, watch } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import IncomeValidate from '../hooks/IncomeValidate'
import FilterIncomes from '../hooks/FilterIncomes'

let userData = inject('userData')

let incomeData = reactive({
  for: userData.value.name,
  year: '',
  value: ''
})

watch(userData, () => {
  incomeData.for = userData.value.name
})

let [checkValidate, loading] = IncomeValidate()

function addIncome () {
  checkValidate(
    `https://thermopay-174f7-default-rtdb.firebaseio.com/incomes.json`,
    incomeData,
    'POST',
    {
      for: incomeData.for,
      year: incomeData.year,
      value: Number(incomeData.value)
    },
    'درآمد شما با موفقیت اضافه شد!',
    'عدم برقراری ارتباط با سرور'
  )
}

const [userIncomes, lastYearIncome] = FilterIncomes()

let avgIncomes = computed(() => {
  let sum = 0
  userIncomes.value.forEach(income => (sum += income[1].value))
  return sum / userIncomes.value.length
})
</script>
