<template>
  <div class="flex items-center justify-between p-5">
    <div class="flex items-center gap-5">
      <h1 class="text-5xl font-semibold text-green-500">
        Thermo<span class="bg-green-500 text-white px-2 py-0.5 ml-1 rounded-xl"
          >Pay</span
        >
      </h1>
      <h2 class="text-2xl">مدیریت مالی {{ userData.name }}</h2>
    </div>
    <div class="text-2xl flex gap-5">
      <router-link to="/" class="transition duration-300">
        <i class="fa-solid fa-home" v-tippy="'صفحه اصلی'"></i>
      </router-link>
      <router-link to="/costs-page" class="transition duration-300">
        <i class="fa-solid fa-cash-register" v-tippy="'هزینه ها'"></i>
      </router-link>
      <router-link to="/income-page" class="transition duration-300">
        <i class="fa-solid fa-dollar" v-tippy="'درامد'"></i>
      </router-link>
      <!-- <router-link to="/report-page" class="transition duration-300">
        <i class="fa-solid fa-chart-simple" v-tippy="'گزارش مالی'"></i>
      </router-link> -->
      <router-link to="/edit-user" class="transition duration-300">
        <i class="fa-solid fa-user" v-tippy="'اطلاعات کاربری'"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import { Tippy } from 'vue-tippy'

export default {
  components: [Tippy],
  setup () {
    let userData = inject('userData')
    return { userData }
  }
}
</script>

<style>
.router-link-active {
  color: var(--primary);
}
</style>
