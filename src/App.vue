<template>
  <Transition>
    <LoadingScreen v-if="showLoadingScreen"></LoadingScreen>
  </Transition>
  <TheHeader></TheHeader>
  <router-view v-slot="{ Component }">
    <transition name="scale" mode="out-in">
      <component :is="Component" class="component" />
    </transition>
  </router-view>
</template>
<script>
import { onMounted, provide, ref } from 'vue'
import LoadingScreen from './components/LoadingScreen.vue'
import ShowAlert from './hooks/ShowAlert'
import TheHeader from './components/TheHeader.vue'

export default {
  components: {
    LoadingScreen,
    TheHeader
  },
  setup () {
    let userData = ref('')
    let costs = ref([])
    let incomes = ref([])

    let apiAdress =
      'https://thermopay-174f7-default-rtdb.firebaseio.com/user/-OFgZAxJZ2Rq8XIdLOB8.json'

    let showLoadingScreen = ref(true)

    const showAlert = ShowAlert()

    function getUserData () {
      fetch(apiAdress)
        .then(res => res.json())
        .then(data => {
          userData.value = data
          showAlert(
            `خوش آمدید ${userData.value.name} عزیز`,
            'success',
            '#22C55E'
          )
        })
        .catch(() => {
          showAlert('عدم برقراری ارتباط با سرور!', 'error', 'rgb(255,0,0)')
        })
        .finally(() => (showLoadingScreen.value = false))
    }

    function getCosts () {
      fetch('https://thermopay-174f7-default-rtdb.firebaseio.com/costs.json')
        .then(res => res.json())
        .then(data => {
          let filterCosts = Object.entries(data).filter(
            cost => cost[0] != 'default'
          )
          costs.value = filterCosts
        })
    }

    function getIncomes () {
      fetch('https://thermopay-174f7-default-rtdb.firebaseio.com/incomes.json')
        .then(res => res.json())
        .then(data => {
          let filterIncomes = Object.entries(data).filter(
            income => income[0] != 'default'
          )
          incomes.value = filterIncomes
        })
    }

    onMounted(() => {
      getUserData()
      getCosts()
      getIncomes()
    })

    provide('userData', userData)
    provide('costs', costs)
    provide('getCosts', getCosts)
    provide('getIncomes', getIncomes)
    provide('incomes', incomes)

    return {
      showLoadingScreen
    }
  }
}
</script>

<style>
body {
  overflow: hidden;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.scale-enter-from {
  transform: scale(0.9);
  opacity: 0;
}

.scale-leave-to {
  transform: scale(1.1);
  opacity: 0;
}

.scale-enter-to,
.scale-leave-from {
  transform: scale(1);
  opacity: 1;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  appearance: textfield;
}
</style>
