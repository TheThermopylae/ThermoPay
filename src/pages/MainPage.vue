<template>
  <div class="p-5">
    <Teleport to="title"> | صفحه اصلی</Teleport>
    <div class="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-10">
      <div class="w-full h-full lg:mr-20">
        <h3 class="mb-2 text-xl text-center">
          درآمد شما در سال های گذشته بر حسب دلار
        </h3>
        <BarChart></BarChart>
      </div>
      <div class="m-auto h-full">
        <h3 class="mb-2 text-xl text-center">
          هزینه های شما در این ماه بر حسب دلار
        </h3>
        <DoughnatChart></DoughnatChart>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import { Tippy } from 'vue-tippy'
import BarChart from '../components/BarChart.vue'
import DoughnatChart from '../components/DoughnatChart.vue'

export default {
  components: { Tippy, BarChart, DoughnatChart },
  setup () {
    let userData = inject('userData')
    return { userData }
  }
}
</script>
