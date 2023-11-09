<script setup lang="ts">
import { useCashboxStore } from '@/stores/cashbox';

const toast = useToast();

const cashbox = useCashboxStore();

const name = ref('');

const createCashbox = async () => {
    cashbox.create(name.value).then(() => {
        toast.add({
            title: 'Kasse wurde erstellt',
            icon: "i-heroicons-check-circle",
            timeout: 2000,
        })
        name.value = '';
    });
}

</script>

<template>
    <div class="rounded-md shadow-md border p-4 flex-1 max-w-sm">
        <h1 class="text-lg font-bold mb-4">Neue Kasse:</h1>
        <form @submit.prevent="createCashbox">
            <div class="flex flex-col gap-2">
                <UInput type="text" id="name" v-model="name" placeholder="Neue Kasse" />
                <UButton block :disabled="name.length == 0" type="submit">Erstellen</UButton>
            </div>
        </form>
    </div>
</template>