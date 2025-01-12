import { ref } from 'vue'
import ShowAlert from './ShowAlert'

export default function RemoveAllItems () {
  let loading = ref(false)
  let showAlert = ShowAlert()

  async function removeFunc (data, url, func, text,emit) {
    loading.value = true
    try {
      const deleteRequests = data.value.map(data =>
        fetch(`${url}/${data[0]}.json`, { method: 'DELETE' })
      )

      await Promise.all(deleteRequests)
      await func()
      showAlert(text, 'success', '#22C55E')
    } catch (error) {
      showAlert('خطا در برقراری ارتباط با سرور!ً', 'error', 'red')
    } finally {
      loading.value = false
      emit('closeModal')
    }
  }

  return [loading, removeFunc]
}
