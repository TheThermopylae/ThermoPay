<template>
  <div class="border border-primary p-3 rounded-xl">
    <div class="flex justify-between">
      <h4>{{ income[1].year }} :</h4>
      <h4 class="text-primary">{{ income[1].value.toLocaleString() }}$</h4>
    </div>
    <div class="flex justify-end mt-2">
      <i
        class="fa-solid fa-pen cursor-pointer ml-3 hover:text-green-500 transition-all"
        v-tippy="'ویرایش درآمد'"
        @click="$emit('openEditIncomeModal')"
      ></i>
      <i
        class="fa-solid fa-trash cursor-pointer hover:text-red-500 transition-all"
        v-tippy="'حذف درآمد'"
        @click="$emit('openRemoveIncomeModal')"
      ></i
      >
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Tippy } from 'vue-tippy'

export default {
  props: ['income', 'data'],
  components: [Tippy],
  setup (props, { emit }) {
    return {}
  }
}
</script>
