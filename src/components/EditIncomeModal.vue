<template>
  <div class="w-full h-full fixed top-0 z-10">
    <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
    <div
      class="z-10 w-2/5 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-200 rounded-md p-3 pt-1"
    >
      <span class="text-2xl cursor-pointer" @click="$emit('closeModal')"
        >x</span
      >
      <div class="text-2xl mt-2">
        <p>ویرایش مشخصات درآمد</p>
      </div>
      <div class="my-5 grid grid-cols-2 gap-5">
        <div>
          <label
            for="income-year"
            class="text-lg after:content-['*'] after:text-red-500"
            >سال درآمد</label
          >
          <input
            type="number"
            id="income-year"
            class="outline-none border border-primary w-full rounded-full p-2 mt-2"
            placeholder="عنوان هزینه را وارد کنید..."
            v-model="data.year"
          />
        </div>
        <div>
          <label
            for="income-value"
            class="text-lg after:content-['*'] after:text-red-500"
            >سال درآمد</label
          >
          <input
            type="number"
            id="income-value"
            class="outline-none border border-primary w-full rounded-full p-2 mt-2"
            placeholder="عنوان هزینه را وارد کنید..."
            v-model="data.value"
          />
        </div>
      </div>
      <button
        @click="updateIncomeFunc"
        class="btn btn-primary text-white rounded-full w-full mt-5"
        v-if="!loading"
      >
        ویرایش کردن
      </button>
      <button
        class="btn btn-primary text-white rounded-full w-full mt-5"
        v-else
      >
        <LoadingSpinner class="w-7 h-7"></LoadingSpinner>
      </button>
    </div>
  </div>
</template>

<script>
import { inject, reactive, ref } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import ShowAlert from '../hooks/ShowAlert'
export default {
  components: {
    LoadingSpinner
  },
  props: ['income'],
  setup (props, { emit }) {
    let loading = ref(false)
    let getIncomes = inject('getIncomes')

    let data = reactive({
      year: props.income[1].year,
      value: props.income[1].value
    })

    const showAlert = ShowAlert()

    function updateIncomeFunc () {
      if (!data.year || !data.value)
        showAlert('تمامی فیلد هارا پر کنید!', 'info', 'rgb(68, 68, 240)')
      else {
        loading.value = true
        fetch(
          `https://thermopay-174f7-default-rtdb.firebaseio.com/incomes/${props.income[0]}.json`,
          {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({ year: data.year, value: data.value })
          }
        )
          .then(() => {
            showAlert('بروزرسانی با موفقیت انجام شد!', 'success', '#22C55E')
            getIncomes()
          })
          .catch(() => showAlert('عدم برقراری ارتباط با سرور!', 'error', 'red'))
          .finally(() => {
            loading.value = false
            emit('closeModal')
          })
      }
    }
    return { loading, updateIncomeFunc, data }
  }
}
</script>
