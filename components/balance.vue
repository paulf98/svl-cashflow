<script setup lang="ts">
import { useBookingsStore } from '@/stores/bookings';

const bookings = useBookingsStore();
const { getAllExpenses, getAllIncome } = storeToRefs(bookings);

const balance = computed(
  () => (getAllIncome.value ? getAllIncome.value.reduce((acc, cur) => acc + cur.amount, 0) : 0) - (getAllExpenses.value ? getAllExpenses.value.reduce((acc, cur) => acc - cur.amount, 0) : 0)
)

const balanceClass = computed(
  () => balance.value > 0 ? 'text-green-600' : balance.value < 0 ? 'text-red-600' : 'text-gray-600'
)
</script>


<!-- This component summarizes the current balance of the account -->
<template>
  <div class="container mx-auto flex flex-col justify-center items-center p-4 border rounded-lg shadow-md">
    <h2 class="text-xl mb-2 text-gray-700">Aktueller Kontostand</h2>
    <p v-if="balance" class="text-6xl font-bold" :class="balanceClass">{{ balance }} €</p>
    <p v-else class="text-6xl font-bold text-gray-600">0 €</p>
  </div>
</template>

