<script setup lang="ts">
import { useBookingsStore } from '@/stores/bookings'

const bookings = useBookingsStore()
const data = bookings.getAllIncome;

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'amount', label: 'Betrag' },
    { key: 'date', label: 'Datum' },
    { key: 'actions', label: 'Aktionen' },
]

const selectedColumns = ref([columns[0], columns[1], columns[3]])

const items = (row: any) => [
    [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: async () => {
            await bookings.deleteBooking(row.id)
        }
    }]
]

</script>

<template>
    <div>
        <UButton icon="i-heroicons-plus" block truncate class="my-2" @click="() => navigateTo('/add-booking')">Neue
            Einnahme buchen
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

