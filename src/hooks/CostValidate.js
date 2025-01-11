import { inject, ref } from 'vue'
import ShowAlert from './ShowAlert'

export default function CostValidate (data, emit, url, method, body) {
  let loading = ref(false)
  let getCosts = inject('getCosts')
  const showAlert = ShowAlert()

  function validate () {
    if (!data.costTitle || !data.selectCategory) return false
    else return true
  }

  function checkValidate () {
    if (!validate()) {
      showAlert(
        'لطفا عنوان هزینه را وارد و دسته بندی را انتخاب کنید',
        'error',
        'red'
      )
    } else {
      loading.value = true
      let costPrice
      !data.price ? (costPrice = 0) : (costPrice = data.price)
      fetch(url, {
        method: method,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(
          method == 'POST' ? { ...data, price: costPrice } : body
        )
      })
        .then(() => {
          showAlert('مورد هزینه ای شما اضافه شد!', 'success', '#22C55E')
          getCosts()
        })
        .catch(() => showAlert('عدم برقراری ارتباط با سروو', 'error', 'red'))
        .finally(() => {
          loading.value = false
          emit('closeModal')
        })
    }
  }
  return [loading, checkValidate]
}
