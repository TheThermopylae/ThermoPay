<template>
  <div class="p-5">
    <h1 class="text-4xl font-semibold">درآمد شما:</h1>
    <div class="mt-5">
      <AddIncome></AddIncome>
      <p v-if="userIncomes.length === 0" class="text-2xl mt-5 text-center">موردی وجود ندارد!</p>
      <div class="grid grid-cols-4 gap-5 mt-3" v-else>
        <IncomeCard
          @openEditIncomeModal="showEditIncomeModalFunc(item)"
          @openRemoveIncomeModal="showRemoveIncomeModalFunc(item)"
          v-for="item in userIncomes"
          :income="item"
          :data="userData"
          :key="item[0]"
        ></IncomeCard>
      </div>
    </div>
    <Transition>
      <EditIncomeModal
        @closeModal="showEditModal = false"
        :income="targetIncome"
        v-if="showEditModal"
      ></EditIncomeModal>
    </Transition>
    <Transition>
      <DeleteIncomeModal
        @closeModal="showDeleteModal = false"
        :income="targetIncome"
        v-if="showDeleteModal"
      ></DeleteIncomeModal>
    </Transition>
  </div>
</template>

<script>
import { inject, ref } from 'vue'
import IncomeCard from '../components/IncomeCard.vue'
import EditIncomeModal from '../components/EditIncomeModal.vue'
import FilterIncomes from '../hooks/FilterIncomes'
import DeleteIncomeModal from '../components/DeleteIncomeModal.vue'
import AddIncome from '../components/AddIncome.vue'

export default {
  components: {
    IncomeCard,
    EditIncomeModal,
    DeleteIncomeModal,
    AddIncome
  },
  setup () {
    let userData = inject('userData')

    let showEditModal = ref(false)
    let showDeleteModal = ref(false)

    let [userIncomes] = FilterIncomes()

    let targetIncome = ref('')

    function showEditIncomeModalFunc (item) {
      targetIncome.value = item
      showEditModal.value = true
    }

    function showRemoveIncomeModalFunc (item) {
      showDeleteModal.value = true
      targetIncome.value = item
    }

    return {
      userData,
      showEditModal,
      userIncomes,
      showEditIncomeModalFunc,
      showRemoveIncomeModalFunc,
      targetIncome,
      showDeleteModal
    }
  }
}
</script>
