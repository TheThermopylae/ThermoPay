<template>
  <Teleport to="title">ThermoPay</Teleport>
  <Transition>
    <LoadingScreen v-if="showLoadingScreen"></LoadingScreen>
  </Transition>
  <div class="bg-gray-100 dark:bg-gray-800 dark:text-white min-h-screen transition-all">
    <TheHeader
      @onDarkMode="darkmode = true"
      @offDarkMode="darkmode = false"
    ></TheHeader>
    <router-view
      v-slot="{ Component }"
      class="pl-7"
      @click.middle="sexWithJafarMother"
    >
      <transition name="fade" mode="out-in">
        <component :is="Component" class="component" />
      </transition>
    </router-view>
  </div>
</template>
<script>
import { onMounted, provide, ref, watch } from 'vue'
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
    let installments = ref([])

    let showLoadingScreen = ref(true)

    const showAlert = ShowAlert()

    function getUserData (text) {
      fetch(
        'https://thermopay-174f7-default-rtdb.firebaseio.com/user/-OFgZAxJZ2Rq8XIdLOB8.json'
      )
        .then(res => res.json())
        .then(data => {
          if (!userData.value) {
            userData.value = data
            showAlert(
              `خوش آمدید ${userData.value.name} عزیز`,
              'success',
              '#22C55E'
            )
          } else {
            userData.value = data
            showAlert(text, 'success', '#22C55E')
          }
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

    function getInstallments () {
      fetch(
        'https://thermopay-174f7-default-rtdb.firebaseio.com/installments.json'
      )
        .then(res => res.json())
        .then(data => {
          let filterInstallments = Object.entries(data).filter(
            installment => installment[0] != 'default'
          )
          installments.value = filterInstallments
        })
    }

    function showReminders () {
      let day = new Date().getDate()

      let filterInstallments = installments.value.filter(
        installment => installment[1].day == day
      )

      if (filterInstallments.length > 1) {
        let installmentsArray = []
        filterInstallments.forEach(installment =>
          installmentsArray.push(installment[1].title)
        )
        showAlert(
          `شما امروز باید قسط های ${installmentsArray.join(
            ','
          )} را پرداخت کنید`,
          'info',
          'rgb(68, 68, 240)',
          '#fff',
          'یاد آوری'
        )
      } else if (filterInstallments.length === 1) {
        showAlert(
          `شما امروز باید قسط ${filterInstallments[0][1].title} را پرداخت کنید`,
          'info',
          'rgb(68, 68, 240)',
          '#fff',
          'یاد آوری'
        )
      }
    }

    watch(installments, () => {
      setTimeout(() => {
        showReminders()
      }, 4000)
    })

    let darkmode = ref(false)

    watch(darkmode, () => {
      if (darkmode.value) {
        document.querySelector('html').classList.add('dark')
        localStorage.setItem('darkmode', true)
      } else {
        document.querySelector('html').classList.remove('dark')
        localStorage.setItem('darkmode', false)
      }
    })

    function checkDarkModeOn () {
      if (localStorage.getItem('darkmode') == true)
        document.querySelector('html').classList.add('dark')
      else document.querySelector('html').classList.remove('dark')

      darkmode.value = JSON.parse(localStorage.getItem('darkmode'))
    }

    onMounted(() => {
      getUserData(`خوش آمدید ${userData.value.name} عزیز`)
      getCosts()
      getIncomes()
      checkDarkModeOn()
      getInstallments()
    })

    provide('userData', userData)
    provide('getUserData', getUserData)
    provide('costs', costs)
    provide('getCosts', getCosts)
    provide('getIncomes', getIncomes)
    provide('incomes', incomes)
    provide('installments', installments)
    provide('getInstallments', getInstallments)
    provide('darkmode', darkmode)

    function sexWithJafarMother () {
      alert('کصمادرت جفر')
    }

    return {
      showLoadingScreen,
      darkmode,
      sexWithJafarMother
    }
  }
}
</script>

<style>
body {
  overflow-x: hidden;
  width: 100vw;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* Fade Animation for Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
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
