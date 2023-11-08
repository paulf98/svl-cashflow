<script setup lang="ts">
import { useCashboxStore } from '@/stores/cashbox';
import { useBookingsStore } from '@/stores/bookings';

const cashbox = useCashboxStore();
await cashbox.fetchAll();
const { ownCashboxes } = storeToRefs(cashbox)

const bookings = useBookingsStore();
const { getBalanceOfCashbox } = storeToRefs(bookings)

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'cashboxBalance', label: 'Kontostand', sortable: true },
    { key: 'actions', label: 'Aktionen' },
]

const selectedColumns = ref([...columns])

const items = (row: any) => [
    [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: async () => {
            console.log(row.id)
        }
    }]
]
</script>

<template>
    <div class="border shadow-md rounded-md p-4 flex-1">
        <h1 class="text-lg font-bold">Meine Kassen:</h1>
        <div class=" flex py-3.5 border-b border-gray-200 dark:border-gray-700">
            <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Anzeige" />
        </div>
        <UTable :columns="selectedColumns" :rows="ownCashboxes">
            <template #cashboxBalance-data="{ row }">
                <Amount :amount="getBalanceOfCashbox(row.id)" />
            </template>
            <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>
    </div>
</template>