<template>
  <div class="drawer p-3 mb-2 lg:mb-5">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <div class="navbar w-full">
        <div class="flex-none lg:hidden"></div>
        <div class="mx-2 w-full px-2 text-3xl flex-col lg:flex-row">
          <h1 class="text-4xl lg:m-0 lg:text-5xl font-semibold text-green-500">
            Thermo<span
              class="bg-green-500 text-white px-2 py-0.5 ml-1 rounded-xl dark:text-gray-800"
              >Pay</span
            >
          </h1>
          <div class="mt-3 w-full">
            <ul
              class="flex justify-between w-full text-2xl gap-3 items-center lg:hidden"
            >
              <router-link
                to="/"
                class="transition duration-300 dark:text-white"
              >
                <i class="fa-solid fa-home" v-tippy="'صفحه اصلی'"></i>
              </router-link>
              <router-link
                to="/costs-page"
                class="transition duration-300 dark:text-white"
              >
                <i class="fa-solid fa-cash-register" v-tippy="'هزینه ها'"></i>
              </router-link>
              <router-link
                to="/income-page"
                class="transition duration-300 dark:text-white"
              >
                <i class="fa-solid fa-dollar" v-tippy="'درامد'"></i>
              </router-link>
              <router-link
                to="/edit-user"
                class="transition duration-300 dark:text-white"
              >
                <i class="fa-solid fa-user" v-tippy="'اطلاعات کاربری'"></i>
              </router-link>
              <span>|</span>
              <i
                class="fa-solid fa-moon cursor-pointer w-5"
                v-tippy="'دارک مود'"
                v-if="!darkmode"
                @click="$emit('onDarkMode')"
              ></i>
              <i
                class="fa-solid fa-sun cursor-pointer w-5 text-white"
                v-tippy="'لایت مود'"
                v-else
                @click="$emit('offDarkMode')"
              ></i>
            </ul>
          </div>
        </div>
        <div class="hidden flex-none lg:block">
          <ul class="menu menu-horizontal text-2xl gap-3 items-center">
            <router-link to="/" class="transition duration-300 dark:text-white">
              <i class="fa-solid fa-home" v-tippy="'صفحه اصلی'"></i>
            </router-link>
            <router-link
              to="/costs-page"
              class="transition duration-300 dark:text-white"
            >
              <i class="fa-solid fa-cash-register" v-tippy="'هزینه ها'"></i>
            </router-link>
            <router-link
              to="/income-page"
              class="transition duration-300 dark:text-white"
            >
              <i class="fa-solid fa-dollar" v-tippy="'درامد'"></i>
            </router-link>
            <router-link
              to="/edit-user"
              class="transition duration-300 dark:text-white"
            >
              <i class="fa-solid fa-user" v-tippy="'اطلاعات کاربری'"></i>
            </router-link>
            <span>|</span>
            <i
              class="fa-solid fa-moon cursor-pointer w-5"
              v-tippy="'دارک مود'"
              v-if="!darkmode"
              @click="$emit('onDarkMode')"
            ></i>
            <i
              class="fa-solid fa-sun cursor-pointer w-5 text-white"
              v-tippy="'لایت مود'"
              v-else
              @click="$emit('offDarkMode')"
            ></i>
          </ul>
        </div>
      </div>
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

    let darkmode = inject('darkmode')

    return { userData, darkmode }
  }
}
</script>

<style>
.router-link-active {
  color: var(--primary) !important;
}
</style>