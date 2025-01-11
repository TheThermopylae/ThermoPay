<template>
  <div class="bg-white dark:bg-gray-700 border rounded-xl p-2 transition-all" :class="{'border-primary' : cost[1].isPurchased , 'border-red-500' : !cost[1].isPurchased}">
    <div class="flex justify-between text-xl">
      <h4 class="mb-1">{{ cost[1].costTitle }}</h4>
      <h4>{{ cost[1].selectCategory }}</h4>
    </div>
    <div class="flex justify-between items-center mt-2">
      <span class="text-primary" v-if="cost[1].price"
        >{{ cost[1].price.toLocaleString() }}$</span
      >
      <span v-else>هزینه نامشخص</span>
      <p> {{ cost[1].day }} / {{ cost[1].month + 1 }} / {{ cost[1].year }}</p>
      <div>
        <i
          class="fa-solid fa-trash cursor-pointer hover:text-red-500 transitin duration-300 w-4"
          v-tippy="'حذف هزینه'"
          @click="$emit('showDeleteModal')"
        ></i>
        <i
          class="fa-solid fa-pen cursor-pointer hover:text-primary transitin duration-300 w-4 mx-4"
          v-tippy="'ویرایش هزینه'"
          @click="$emit('showEditCostModal')"
        ></i>
        <i
          class="fa-solid fa-check cursor-pointer hover:text-primary transitin duration-300 w-4"
          v-tippy="'تغییر وضعیت'"
          @click="purchasedCost"
          v-if="!loading"
        ></i>
        <LoadingSpinner v-else class="w-4 h-4"></LoadingSpinner>
      </div>
    </div>
  </div>
</template>

<script>
import { Tippy } from 'vue-tippy'
import { inject, ref } from 'vue'
import ShowAlert from '../hooks/ShowAlert'
import LoadingSpinner from './LoadingSpinner.vue'

export default {
  props: ['cost'],
  components: { Tippy, LoadingSpinner },
  setup (props) {
    let isPurchased = ref(props.cost[1].isPurchased)
    let loading = ref(false)
    let getCosts = inject('getCosts')

    const showAlert = ShowAlert()

    function purchasedCost () {
      loading.value = true
      isPurchased.value = !isPurchased.value
      fetch(
        `https://thermopay-174f7-default-rtdb.firebaseio.com/costs/${props.cost[0]}.json`,
        {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ isPurchased: isPurchased.value })
        }
      )
        .then(() => {
          if (isPurchased.value == true)
            showAlert('مورد شما پرداخت شد!', 'success', '#22C55E')
          else showAlert('مورد پرداختی شما لغو شد!', 'success', '#22C55E')

          getCosts()
        })
        .catch(() => showAlert('عدم برقراری ارتباط با سرور', 'error', 'red'))
        .finally(() => {
          loading.value = false
        })
    }
    return { purchasedCost, loading }
  }
}
</script>
