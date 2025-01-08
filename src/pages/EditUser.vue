<template>
  <div class="p-5">
    <div class="grid grid-cols-2 gap-5">
      <div>
        <label for="fullname" class="block mb-2 text-xl">
          نام و نام خانوادگی :
        </label>
        <input
          class="outline-none w-full rounded-full p-2 border border-primary"
          type="text"
          id="fullname"
          placeholder="نام و نام خانوادگی خود را وارد کنید..."
          v-model="data.name"
        />
      </div>
      <div>
        <label for="age" class="block mb-2 text-xl"> سن : </label>
        <input
          class="outline-none w-full rounded-full p-2 border border-primary"
          type="number"
          id="age"
          placeholder=" سن خود را وارد کنید..."
          v-model="data.age"
        />
      </div>
    </div>
    <button
      v-if="!loading"
      class="btn btn-primary mt-5 w-full text-lg text-white"
      @click="editUserFunc"
    >
      ویرایش مشخصات
    </button>
    <button v-else class="btn btn-primary mt-5 w-full text-lg text-white">
      <LoadingSpinner class="w-7 h-7"></LoadingSpinner>
    </button>
  </div>
</template>

<script>
import { inject, reactive, ref, watch } from 'vue'
import ShowAlert from '../hooks/ShowAlert'
import LoadingSpinner from '../components/LoadingSpinner.vue'

export default {
  components: { LoadingSpinner },
  setup () {
    let userData = inject('userData')
    let getUserData = inject('getUserData')

    let data = reactive({
      name: userData.value.name,
      age: userData.value.age
    })

    watch(userData, () => {
      data.name = userData.value.name
      data.age = userData.value.age
    })

    const showAlert = ShowAlert()

    let loading = ref(false)

    function editUserFunc () {
      if (!data.name || !data.age)
        showAlert('لطفا فیلد هارا پر کنید!', 'info', 'rgb(68, 68, 240)')
      else {
        loading.value = true
        fetch(
          'https://thermopay-174f7-default-rtdb.firebaseio.com/user/-OFgZAxJZ2Rq8XIdLOB8.json',
          {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              name: data.name.trim(),
              age: data.age
            })
          }
        )
          .then(() => {
            showAlert('اطلاعات شما با موفقیت ویرایش شد!', 'success', '#22C55E')
            getUserData('اطلاعات شما با موفقیت ویرایش شد :)')
          })
          .catch(() => showAlert('عدم برقراری ارتباط با سرور', 'error', 'red'))
          .finally(() => (loading.value = false))
      }
    }
    return {
      data,
      editUserFunc,
      loading
    }
  }
}
</script>
