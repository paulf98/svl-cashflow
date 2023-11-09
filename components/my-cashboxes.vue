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

const deleteDialogState = reactive({
    showDeleteModal: false,
    selectedId: null,
    selectedName: '',
    typedName: ''
})

function resetDeleteDialogState() {
    deleteDialogState.showDeleteModal = false
    deleteDialogState.selectedId = null
    deleteDialogState.selectedName = ''
    deleteDialogState.typedName = ''
}


const items = (row: any) => [
    [{
        label: 'Delete',
        icon: 'i-heroicons-trash-20-solid',
        click: () => {
            deleteDialogState.showDeleteModal = true
            deleteDialogState.selectedId = row.id
            deleteDialogState.selectedName = row.name
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

        <UModal v-model="deleteDialogState.showDeleteModal">
            <div class="p-4">
                <h2 class="text-xl font-bold mb-4">Kasse löschen</h2>
                <p class="mb-2 italic text-gray-700">
                    Möchtest du die Kasse wirklich löschen? Alle zugehörigen Buchungen werden ebenfalls gelöscht.
                </p>
                <p class="mb-4">
                    <span class="font-bold">Kasse:</span> {{ deleteDialogState.selectedName }}
                </p>
                <!-- To confirm, you have to type in the name of the cashbox to activate the delete button -->
                <UInput v-model="deleteDialogState.typedName" placeholder="Name der Kasse eingeben" />
                <div class="flex justify-end mt-4">
                    <UButton color="gray" variant="ghost" @click="resetDeleteDialogState">Abbrechen</UButton>
                    <UButton color="red" class="ml-2"
                        :disabled="deleteDialogState.typedName !== deleteDialogState.selectedName" @click="() => {
                            if (deleteDialogState.selectedId) {
                                cashbox.delete(deleteDialogState.selectedId)
                            }
                            resetDeleteDialogState()
                        }
                            ">Löschen</UButton>
                </div>
            </div>
        </UModal>
    </div>
</template>