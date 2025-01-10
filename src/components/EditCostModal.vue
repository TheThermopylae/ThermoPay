<template>
  <div class="w-full h-full fixed top-0 z-20">
    <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
    <div
      class="z-10 w-11/12 lg:w-2/5 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-200 dark:bg-gray-800  rounded-md p-3 pt-1"
    >
      <span class="text-2xl cursor-pointer" @click="$emit('closeModal')"
        >x</span
      >
      <div class="text-2xl mt-2">
        <p>ویرایش مورد هزینه ای</p>
      </div>
      <div class="my-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <label
            for="cost-title"
            class="text-lg after:content-['*'] after:text-red-500"
            >عنوان هزینه</label
          >
          <input
            type="text"
            id="cost-title"
            class="outline-none border border-primary w-full rounded-full p-2 mt-2"
            placeholder="عنوان هزینه را وارد کنید..."
            v-model="data.costTitle"
          />
        </div>
        <div>
          <label
            for="cost-cat"
            class="text-lg after:content-['*'] after:text-red-500"
            >دسته بندی هزینه</label
          >
          <select
            id="cost-cat"
            class="border border-primary w-full rounded-full p-2 mt-2 outline-none bg-white dark:bg-gray-700"
            v-model="data.selectCategory"
          >
            <option value="" disabled>دسته بندی را انتخاب کنید</option>
            <option v-for="item in categories" :value="item">{{ item }}</option>
          </select>
        </div>
      </div>
      <div>
        <label for="cost-price">هزینه ی مقدار</label>
        <input
          type="number"
          id="cost-price"
          class="outline-none border border-primary w-full rounded-full p-2 mt-2"
          placeholder="هزینه را وارد کنید..."
          v-model="data.price"
        />
      </div>
      <button
        class="btn btn-primary text-white rounded-full w-full mt-5"
        @click="editCost"
        v-if="!loading"
      >
        ویرایش کردن
      </button>
      <button
        class="btn btn-primary text-white rounded-full w-full mt-5"
        v-else
      >
        <LoadingSpinner class="w-7 h-7"></LoadingSpinner>
      </button>
    </div>
  </div>
</template>

<script>
import { inject, reactive, ref } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import ShowAlert from '../hooks/ShowAlert'

export default {
  components: { LoadingSpinner },
  props: ['cost'],
  setup (props, { emit }) {
    let data = reactive({
      costTitle: props.cost[1].costTitle,
      price: props.cost[1].price,
      selectCategory: props.cost[1].selectCategory
    })

    let getCosts = inject('getCosts')

    let categories = ['اینترنت', 'رفت و آمد', 'تفریح', 'ماشین', 'خانه', 'دیگر']

    let loading = ref(false)

    const showAlert = ShowAlert()

    const editCost = () => {
      if (!data.costTitle || !data.selectCategory)
        showAlert('لطفا فیلد های مورد نیاز را پر کنید!', 'error', 'red')
      else {
        loading.value = true
        fetch(
          `https://thermopay-174f7-default-rtdb.firebaseio.com/costs/${props.cost[0]}.json`,
          {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              costTitle: data.costTitle,
              price: data.price,
              selectCategory: data.selectCategory
            })
          }
        )
          .then(() => {
            showAlert('تغییرات شما با موفقیت ثبت شد!', 'success', '#22C55E')
            getCosts()
          })
          .catch(() => showAlert('عدم برقراری ارتباط با سرور', 'error', 'red'))
          .finally(() => {
            loading.value = false
            emit('closeModal')
          })
      }
    }

    return { loading, data, categories, editCost }
  }
}
</script>
