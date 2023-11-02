<script setup lang="ts">

import { ref } from 'vue'


const data = ref([
    { id: 1, name: 'Einnahme 1', amount: 1000, date: '2021-01-01' },
    { id: 2, name: 'Einnahme 2', amount: 2000, date: '2021-01-02' },
    { id: 3, name: 'Einnahme 3', amount: 3000, date: '2021-01-03' },
])

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'amount', label: 'Betrag' },
    { key: 'actions', label: 'Aktionen' },
    { key: 'date', label: 'Datum' },
]

const selectedColumns = ref([columns[0], columns[1], columns[2]])

</script>

<template>
    <div>
        <UButton icon="i-heroicons-24-plus" block truncate class="my-2">Neue Einnahme buchen</UButton>
        <div class="flex py-3.5 border-b border-gray-200 dark:border-gray-700">
            <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Anzeige" />
        </div>
        <UTable :columns="selectedColumns" :rows="data" />
    </div>
</template>

