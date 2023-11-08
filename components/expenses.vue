<script setup lang="ts">
import { useBookingsStore } from '@/stores/bookings'

const bookings = useBookingsStore()
const { getAllExpenses } = storeToRefs(bookings)

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'amount', label: 'Betrag', sortable: true },
    { key: 'cashbox', label: 'Kasse', sortable: true },
    { key: 'createdAt', label: 'Datum', sortable: true },
    { key: 'actions', label: 'Aktionen' },
]

const selectedColumns = ref([...columns])

const items = (row: any) => [
    [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: async () => {
            await bookings.deleteBooking(row.id)
            await bookings.fetchAllBookings();
        }
    }]
]

</script>

<template>
    <div>
        <UButton color="red" icon="i-heroicons-minus" block truncate class="my-2" @click="() => navigateTo('/add-booking')">
            Ausgabe buchen
        </UButton>
        <div class=" flex py-3.5 border-b border-gray-200 dark:border-gray-700">
            <USelectMenu v-model="selectedColumns" :options="columns" multiple placeholder="Anzeige" />
        </div>
        <UTable :columns="selectedColumns" :rows="getAllExpenses">
            <!-- Translate the date to a readable string -->
            <template #createdAt-data="{ row }">
                {{ new Date(row.createdAt).toLocaleDateString('de-DE') }}
            </template>
            <template #amount-data="{ row }">
                <span class="text-red-700 font-bold">{{ row.amount }} €</span>
            </template>
            <template #cashbox-data="{ row }">
                {{ row.cashbox.name }}
            </template>
            <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>
    </div>
</template>

