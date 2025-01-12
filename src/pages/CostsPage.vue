<template>
  <div class="p-5">
    <Teleport to="title"> | هزینه ها</Teleport>
    <h1 class="text-4xl font-semibold">محاسبه ی هزینه ها</h1>
    <NowIncome
      @searchCostAccept="searchCostFunc"
      @openAddCostModal="showAddCostModal = true"
      @openRemoveAllCosts="showRemoveCosts = true"
    ></NowIncome>
    <div class="text-xl mt-5 leading-10 flex gap-3" v-if="userData.length > 0">
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
    <div>
      <p class="text-center text-xl mt-5" v-if="filterCosts.length === 0">
        مورد هزینه ای وجود ندارد!
      </p>
      <div v-else>
        <h3 class="text-xl mt-5 mb-3">پرداخت شده ها</h3>
        <p v-if="purchasedCosts.length === 0" class="text-lg">
          موردی وجود ندارد!
        </p>
        <div
          class="grid grid-cols-1 lg:grid-cols-4 gap-5 border-b dark:border-b-gray-600 pb-5"
          v-else
        >
          <CostsCard
            v-for="item in purchasedCosts"
            :cost="item"
            :key="item[0]"
            @showDeleteModal="openDeleteCostModal(item)"
            @showEditCostModal="openEditCostModal(item)"
          ></CostsCard>
        </div>
        <h3 class="text-3xl mt-5 mb-3">پرداخت نشده ها</h3>
        <p v-if="notPurchasedCosts.length === 0" class="text-lg">
          موردی وجود ندارد!
        </p>
        <div
          class="grid grid-cols-1 lg:grid-cols-4 mt-5 gap-5 border-b dark:border-gray-600 pb-5"
        >
          <CostsCard
            v-for="item in notPurchasedCosts"
            :cost="item"
            :key="item[0]"
            @showEditCostModal="openEditCostModal(item)"
            @showDeleteModal="openDeleteCostModal(item)"
          ></CostsCard>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <h3 class="text-3xl mt-5 mb-3">اقساط</h3>
        <button class="btn btn-primary" @click="showInstallmentModal = true">
          افزودن یادآوری
        </button>
      </div>
      <p class="text-lg" v-if="installments.length === 0">موردی وجود ندارد!</p>
      <div class="grid grid-cols-1 lg:grid-cols-4 mt-5 gap-5 mb-5">
        <InstallmentCard
          @showEditInstallment="showEditInstallmentModalFunc(item)"
          @showDeleteInstallment="showDeleteInstallmentModalFunc(item)"
          v-for="item in installments"
          :key="item[0]"
          :data="item"
        ></InstallmentCard>
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
    <Transition>
      <EditCostModal
        :cost="targetCost"
        v-if="showEditCostModal"
        @closeModal="showEditCostModal = false"
      ></EditCostModal>
    </Transition>
    <Transition>
      <InstallmentModal
        @closeModal="showInstallmentModal = false"
        v-if="showInstallmentModal"
      ></InstallmentModal>
    </Transition>
    <Transition>
      <DeleteInstallment
        :installment="targetInstallment"
        @closeModal="showDeleteInstallmentModal = false"
        v-if="showDeleteInstallmentModal"
      ></DeleteInstallment>
    </Transition>
    <Transition>
      <EditInstallmentModal
        v-if="showEditInstallmentModal"
        :installment="targetInstallment"
        @closeModal="showEditInstallmentModal = false"
      ></EditInstallmentModal>
    </Transition>
    <Transition>
      <RemoveCostsModal
        @closeModal="showRemoveCosts = false"
        v-if="showRemoveCosts"
      ></RemoveCostsModal>
    </Transition>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import NowIncome from '../components/NowIncome.vue'
import AddCostModal from '../components/Modals/AddCostModal.vue'
import CostsCard from '../components/CostsCard.vue'
import DeleteCostModal from '../components/Modals/DeleteCostModal.vue'
import EditCostModal from '../components/Modals/EditCostModal.vue'
import FilterIncomes from '../hooks/FilterIncomes'
import InstallmentModal from '../components/Modals/InstallmentModal.vue'
import InstallmentCard from '../components/InstallmentCard.vue'
import DeleteInstallment from '../components/Modals/DeleteInstallment.vue'
import EditInstallmentModal from '../components/Modals/EditInstallmentModal.vue'

import RemoveCostsModal from '../components/Modals/RemoveCostsModal.vue'

let userData = inject('userData')
let costs = inject('costs')

const [userIncomes] = FilterIncomes()

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

let showEditCostModal = ref(false)

function openEditCostModal (item) {
  targetCost.value = item
  showEditCostModal.value = true
}

let showInstallmentModal = ref(false)

let installments = inject('installments')

let showDeleteInstallmentModal = ref(false)
let targetInstallment = ref('')

function showDeleteInstallmentModalFunc (item) {
  showDeleteInstallmentModal.value = true
  targetInstallment.value = item
}

let showEditInstallmentModal = ref(false)

function showEditInstallmentModalFunc (item) {
  targetInstallment.value = item
  showEditInstallmentModal.value = true
}

let showRemoveCosts = ref(false)
</script>
