<template>
  <div class="flex justify-between gap-5 items-center">
    <h2 class="text-2xl">درآمد شما در سال های گذشته:</h2>
    <div class="grid grid-cols-2 gap-2 flex-grow">
      <input
        type="text"
        id="new-year-income"
        class="border border-primary w-full rounded-full p-2 outline-none"
        placeholder="سال درآمد شما"
        v-model="incomeData.year"
      />
      <input
        type="text"
        id="new-value-income"
        class="border border-primary w-full rounded-full p-2 outline-none"
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
export default {
  components: { LoadingSpinner },
  setup () {
    let userData = inject('userData')
    let getIncomes = inject('getIncomes')

    let incomeData = reactive({
      for: userData.value.name,
      year: '',
      value: ''
    })

    watch(userData ,()=>{
        incomeData.for = userData.value.name
    })

    const showAlert = ShowAlert()

    let loading = ref(false)

    function addIncome () {
      if (!incomeData.year || !incomeData.value)
        showAlert('لطفا فیلد هارا پر کنید!', 'info', 'rgb(68, 68, 240)')
      else {
        loading.value = true
        fetch(
          `https://thermopay-174f7-default-rtdb.firebaseio.com/incomes.json`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(incomeData)
          }
        )
          .then(() => {
            showAlert(
              'مورد درآمدی شما با موفقیت اضافه شد!',
              'success',
              '#22C55E'
            )
            getIncomes()
          })
          .catch(() => showAlert('عدم برقراری ارتباط با سرور', 'error', 'red'))
          .finally(() => (loading.value = false))
      }
    }
    return { addIncome, incomeData, loading }
  }
}
</script>