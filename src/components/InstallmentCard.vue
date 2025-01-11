<template>
  <div class="bg-white dark:bg-gray-700 border border-primary p-2 rounded-xl">
    <div class="flex justify-between text-xl">
      <h4>{{ data[1].title }}</h4>
      <h4>{{ data[1].selectCategory }}</h4>
    </div>
    <div class="flex justify-between items-end">
      <div class="flex gap-3 mt-3">
        <h4>{{ data[1].count }} ق</h4>
        <h4 class="text-green-500">{{ data[1].price.toLocaleString() }}$</h4>
      </div>
      <span
        >{{ data[1].day }} / {{ data[1].month + 1 }} / {{ data[1].year }}</span
      >
      <div>
        <i
          class="fa-solid fa-trash ml-5 cursor-pointer transition-all duration-300 hover:text-red-500"
          v-tippy="'حذف یادآوری'"
          @click="$emit('showDeleteInstallment')"
        ></i>
        <i
          class="fa-solid fa-pen cursor-pointer transition-all duration-300 hover:text-green-500"
          v-tippy="'ویرایش یادآوری'"
          @click="$emit('showEditInstallment')"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { Tippy } from 'vue-tippy'
export default {
  components: {
    Tippy
  },
  props: ['data'],
  setup () {
    return {}
  }
}
</script>
