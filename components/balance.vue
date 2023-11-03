<!-- This component summarizes the current balance of the account -->
<template>
  <div class="container mx-auto flex flex-col justify-center items-center p-4 border rounded-lg shadow-md max-w-sm">
    <h2 class="text-xl mb-2 text-gray-700">Kontostand</h2>
    <p :class="`text-6xl font-bold ${balance > 0 ? 'text-green-600' : 'text-red-600'}`">{{ balance }} €</p>
  </div>
</template>

<script setup>
const expenses = await useFetch('/api/bookings/expenses', { method: "GET" }).data.value?.body;
const income = await useFetch('/api/bookings/income', { method: "GET" }).data.value?.body;

const balance = (income ? income.reduce((acc, cur) => acc + cur.amount, 0) : 0) - (expenses ? expenses.reduce((acc, cur) => acc - cur.amount, 0) : 0);

</script>
