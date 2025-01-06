<template>
  <div class="p-5 min-h-screen" v-if="userData">
    <h1 class="text-4xl font-semibold">محاسبه ی هزینه ها</h1>
    <NowIncome
      @searchCostAccept="searchCostFunc"
      @openAddCostModal="kir"
    ></NowIncome>
    <p class="text-center text-xl mt-5" v-if="filterCosts.length === 0">
      مورد هزینه ای وجود ندارد!
    </p>
    <div v-else>
      <h3 class="text-xl mt-5 mb-3">پرداخت شده ها</h3>
      <p v-if="purchasedCosts.length === 0" class="text-lg border-b pb-5">
        موردی وجود ندارد!
      </p>
      <div class="grid grid-cols-4 gap-5 border-b pb-5" v-else>
        <CostsCard
          v-for="item in purchasedCosts"
          :cost="item"
          :key="item[0]"
          @showDeleteModal="openDeleteCostModal(item)"
        ></CostsCard>
      </div>
      <h3 class="text-xl mt-5 mb-3">پرداخت نشده ها</h3>
      <p v-if="notPurchasedCosts.length === 0" class="text-lg">
        موردی وجود ندارد!
      </p>
      <div class="grid grid-cols-4 mt-5 gap-5">
        <CostsCard
          v-for="item in notPurchasedCosts"
          :cost="item"
          :key="item[0]"
          @showDeleteModal="openDeleteCostModal(item)"
        ></CostsCard>
      </div>
    </div>
    <div class="fixed left-5 bottom-5 text-xl">
      <div class="flex gap-1">
        <p class="">هزینه نهایی شما :</p>
        <span class="text-green-500">{{ finalCost.toLocaleString() }}$</span>
      </div>
      <div class="flex gap-1">
        <p>پرداخت شده ها :</p>
        <span class="text-green-500"
          >{{ calcPurchasedCosts.toLocaleString() }}$</span
        >
      </div>
    </div>
    <Transition>
      <AddCostModal
        @closeModal="showAddCostModal = false"
        v-if="showAddCostModal"
      ></AddCostModal>
    </Transition>
    <Transition>
      <DeleteCostModal
        v-if="showDeleteCostModal"
        @closeModal="showDeleteCostModal = false"
        :cost="targetCost"
      ></DeleteCostModal>
    </Transition>
  </div>
</template>

<script>
import { computed, inject, ref } from 'vue'
import NowIncome from '../components/NowIncome.vue'
import AddCostModal from '../components/AddCostModal.vue'
import CostsCard from '../components/CostsCard.vue'
import DeleteCostModal from '../components/DeleteCostModal.vue'

export default {
  components: {
    NowIncome,
    AddCostModal,
    CostsCard,
    DeleteCostModal
  },
  setup () {
    let userData = inject('userData')
    let costs = inject('costs')

    let searchedCosts = ref('')

    let filterCosts = computed(() => {
      if (!searchedCosts.value) {
        return costs.value.filter(cost => cost[1].for == userData.value.name)
      } else {
        return costs.value.filter(
          cost =>
            cost[1].for == userData.value.name &&
            cost[1].costTitle.includes(searchedCosts.value)
        )
      }
    })

    let purchasedCosts = computed(() =>
      filterCosts.value.filter(cost => cost[1].isPurchased)
    )
    let notPurchasedCosts = computed(() =>
      filterCosts.value.filter(cost => !cost[1].isPurchased)
    )

    let showAddCostModal = ref(false)
    let showDeleteCostModal = ref(false)

    let targetCost = ref('')

    function openDeleteCostModal (item) {
      targetCost.value = item
      showDeleteCostModal.value = true
    }

    function searchCostFunc (searchValue) {
      searchedCosts.value = searchValue.value.trim()
    }

    function calculate (items) {
      let sum = 0
      items.value.forEach(cost => (sum += cost[1].price))
      return sum
    }

    let finalCost = computed(() => calculate(filterCosts))

    let calcPurchasedCosts = computed(() => calculate(purchasedCosts))

    function kir () {
      showAddCostModal.value = true
    }

    return {
      userData,
      showAddCostModal,
      filterCosts,
      showDeleteCostModal,
      openDeleteCostModal,
      targetCost,
      purchasedCosts,
      notPurchasedCosts,
      searchCostFunc,
      finalCost,
      calcPurchasedCosts,
      kir
    }
  }
}
</script>
