<template>
  <div class="w-full h-full fixed right-0 top-0 z-10">
    <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
    <div
      class="z-10 w-11/12 lg:w-2/5 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-200 dark:bg-gray-800 rounded-md p-3"
    >
      <div class="text-2xl">
        <p>حدف کردن یادآوری</p>
      </div>
      <p class="my-3">آیا میخواهید این مورد را حذف کنید؟</p>
      <div class="grid grid-cols-2 gap-5">
        <button
          class="btn btn-primary text-white rounded-full w-full"
          v-if="!loading"
          @click="deleteInstallmentReminder"
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

<script>
import { inject, ref } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import ShowAlert from '../hooks/ShowAlert'
export default {
  components: { LoadingSpinner },
  props: ['installment'],
  setup (props, { emit }) {
    let loading = ref(false)
    let getInstallments = inject('getInstallments')

    const showAlert = ShowAlert()

    function deleteInstallmentReminder () {
        loading.value = true
      fetch(
        `https://thermopay-174f7-default-rtdb.firebaseio.com/installments/${props.installment[0]}.json`,
        {
          method: 'DELETE'
        }
      )
        .then(() => {
          showAlert('یادآوری شما حذف شذ!', 'success', '#22C55E')
          getInstallments()
        })
        .catch(() => showAlert('عدم برقراری ارتباط با سرور', 'error', 'red'))
        .finally(() => {
          loading.value = false
          emit('closeModal')
        })
    }

    return { loading, deleteInstallmentReminder }
  }
}
</script>
