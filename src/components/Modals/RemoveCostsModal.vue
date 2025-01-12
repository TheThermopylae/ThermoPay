<template>
  <div class="w-full h-screen fixed top-0 right-0 z-10">
    <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
    <div
      class="z-10 w-11/12 lg:w-2/5 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-200 dark:bg-gray-800 rounded-md p-3"
    >
      <div class="text-2xl">
        <p>حذف کردن تمامی مورد های هزینه ای</p>
      </div>
      <p class="my-3">آیا میخواهید تمامی مورد ها را حذف کنید؟</p>
      <div class="grid grid-cols-2 gap-5">
        <button
          class="btn btn-primary text-white rounded-full w-full"
          v-if="!loading"
          @click="removeCostsFunc"
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
import { inject } from 'vue'
import LoadingSpinner from '../LoadingSpinner.vue'
import RemoveAllItems from '../../hooks/RemoveAllItems'

let costs = inject('costs')
let getCosts = inject('getCosts')

const emit = defineEmits(['closeModal'])

const [loading, removeFunc] = RemoveAllItems()

function removeCostsFunc () {
  removeFunc(
    costs,
    'https://thermopay-174f7-default-rtdb.firebaseio.com/costs',
    getCosts,
    'تمامی هزینه های شما با موفقیت حذف شدند!',
    emit
  )
}
</script>
