<script setup>
import { useBookingsStore } from '@/stores/bookings';

const bookings = useBookingsStore();

const expenses = bookings.getAllExpenses;
const income = bookings.getAllIncome;

const balance = (income ? income.reduce((acc, cur) => acc + cur.amount, 0) : 0) - (expenses ? expenses.reduce((acc, cur) => acc - cur.amount, 0) : 0);
const balanceClass = computed(
  () => balance > 0 ? 'text-green-600' : balance < 0 ? 'text-red-600' : 'text-gray-600'
)
</script>


<!-- This component summarizes the current balance of the account -->
<template>
  <div class="container mx-auto flex flex-col justify-center items-center p-4 border rounded-lg shadow-md max-w-sm">
    <h2 class="text-xl mb-2 text-gray-700">Kontostand</h2>
    <p v-if="balance" class="text-6xl font-bold" :class="balanceClass">{{ balance }} €</p>
  </div>
</template>

