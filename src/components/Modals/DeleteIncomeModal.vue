<template>
  <div class="w-full h-full fixed top-0 right-0 z-10">
    <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
    <div
      class="z-10 w-11/12 lg:w-2/5 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-200 dark:bg-gray-800 rounded-md p-3"
    >
      <div class="text-2xl">
        <p>حدف کردن درآمد</p>
      </div>
      <p class="my-3">آیا میخواهید این مورد را حذف کنید؟</p>
      <div class="grid grid-cols-2 gap-5">
        <button
          @click="deleteIncome"
          class="btn btn-primary text-white rounded-full w-full"
          v-if="!loading"
        >
          حذف کردن
        </button>
        <button class="btn btn-primary text-white rounded-full w-full" v-else>
          <LoadingSpinner class="w-7 h-7"></LoadingSpinner>
        </button>
        <button
          class="btn bg-red-500 hover:bg-red-600 text-white rounded-full w-full"
          @click="$emit('closeModal')"
        >
          خیر
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'
import LoadingSpinner from '../LoadingSpinner.vue'
import ShowAlert from '../../hooks/ShowAlert'

let loading = ref(false)
let getIncomes = inject('getIncomes')

let emit = defineEmits(['closeModal'])
let props = defineProps(['income'])

const showAlert = ShowAlert()

function deleteIncome () {
  loading.value = true
  fetch(
    `https://thermopay-174f7-default-rtdb.firebaseio.com/incomes/${props.income[0]}.json`,
    {
      method: 'DELETE'
    }
  )
    .then(() => {
      showAlert('درآمد شما با موفقیت حذف شد!', 'success', '#22C55E')
      getIncomes()
    })
    .finally(() => {
      loading.value = false
      emit('closeModal')
    })
}
</script>
