import { inject, ref } from 'vue'
import ShowAlert from './ShowAlert'

export default function InstallmentValidate () {
  let loading = ref(false)

  const showAlert = ShowAlert()

  let getInstallments = inject('getInstallments')

  function checkValidate (data, url, method, body, emit) {
    if (!data.title || !data.selectCategory || !data.count || !data.price) {
      showAlert('تمامی فیلد هارا پر کنید', 'info', 'rgb(68, 68, 240)')
    } else {
      loading.value = true
      fetch(url, {
        method: method,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(() => {
          showAlert('یادآوری شما اضافه شد!', 'success', '#22C55E')
          getInstallments()
        })
        .finally(() => {
          loading.value = false
          emit('closeModal')
        })
    }
  }
  return [loading, checkValidate]
}
