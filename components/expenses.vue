<script setup lang="ts">

import { ref } from 'vue'

const data = ref([
    { id: 1, name: 'Ausgabe 1', amount: 1000, date: '2021-01-01' },
    { id: 2, name: 'Ausgabe 2', amount: 2000, date: '2021-01-02' },
    { id: 3, name: 'Ausgabe 3', amount: 3000, date: '2021-01-03' },
])

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'amount', label: 'Betrag' },
    { key: 'date', label: 'Datum' },
    { key: 'actions', label: 'Aktionen' },
]

const selectedColumns = ref([columns[0], columns[1], columns[3]])


const items = (row: any) => [
    [{
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => console.log('Edit', row.id)
    }, {
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => console.log('Delete', row.id)
    }]
]

</script>

<template>
    <div>
        <UButton color="red" icon="i-heroicons-minus" block truncate class="my-2" @click="() => {
            console.log('Neue Ausgabe buchen')
            data.push({ id: Math.random(), name: 'Neue Ausgabe', amount: Math.round(Math.random() * 10000), date: '2021-01-04' })
        }">
            Neue Ausgabe buchen
        </UButton>
        <div class="flex py-3.5 border-b border-gray-200 dark:border-gray-700">
            <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Anzeige" />
        </div>
        <UTable :columns="selectedColumns" :rows="data">
            <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>
    </div>
</template>

