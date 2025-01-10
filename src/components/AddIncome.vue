<template>
  <div class="lg:flex justify-between gap-5">
    <h2 class="text-2xl">درآمد شما در سال های گذشته:</h2>
    <div class="lg:flex flex-grow gap-5">
      <input
        type="number"
        id="new-year-income"
        class="border border-primary w-full rounded-full px-4 outline-none p-3 lg:py-0 my-3 lg:m-0"
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
    <button @click="addIncome" class="btn btn-primary w-28" v-if="!loading">
      اضافه کردن
    </button>
    <button @click="addIncome" class="btn btn-primary w-28" v-else>
      <LoadingSpinner class="w-7 h-7"></LoadingSpinner>
    </button>
  </div>
</template>

<script>
import { inject, reactive, ref, watch } from 'vue'
import ShowAlert from '../hooks/ShowAlert'
import LoadingSpinner from './LoadingSpinner.vue'
import IncomeValidate from '../hooks/IncomeValidate'

export default {
  components: { LoadingSpinner },
  setup () {
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
        { for : incomeData.for,
          year : incomeData.year,
          value : Number(incomeData.value)
         },
        'درآمد شما با موفقیت اضافه شد!',
        'عدم برقراری ارتباط با سرور'
      )
    }
    return { addIncome, incomeData, loading }
  }
}
</script>
