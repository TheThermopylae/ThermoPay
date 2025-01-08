import { ref, inject, computed } from 'vue'
import ShowAlert from './ShowAlert'

export default function IncomeValidate () {
  let date = new Date().getFullYear()
  let loading = ref(false)
  let getIncomes = inject('getIncomes')
  let incomes = inject('incomes')

  const showAlert = ShowAlert()

  function checkValidate (
    url,
    data,
    method,
    bodyReq,
    successText,
    errorText,
    emit
  ) {
    let someYear = computed(() =>
      incomes.value.some(income => income[1].year == data.year)
    )

    if (!data.year || !data.value)
      showAlert('لطفا فیلد هارا پر کنید!', 'info', 'rgb(68, 68, 240)')
    else if (data.year > date)
      showAlert(`هنوز سال ${data.year} نیومده!`, 'info', 'rgb(68, 68, 240)')
    else if (data.year < 2015)
      showAlert(
        'سال درامد نباید کمتر از 2015 باشه!',
        'info',
        'rgb(68, 68, 240)'
      )
    else if (method !== 'PATCH' && someYear.value)
      showAlert(
        `درآمد سال ${data.year} را قبلا تعیین کردید!`,
        'info',
        'rgb(68, 68, 240)'
      )
    else {
      loading.value = true
      fetch(url, {
        method: method,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(bodyReq)
      })
        .then(() => {
          showAlert(successText, 'success', '#22C55E')
          getIncomes()
        })
        .catch(() => showAlert(errorText, 'error', 'red'))
        .finally(() => {
          if (method == 'PATCH') emit('closeModal')
          loading.value = false
        })
    }
  }
  return [checkValidate, loading]
}
