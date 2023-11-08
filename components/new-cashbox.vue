<script setup lang="ts">
import { useCashboxStore } from '@/stores/cashbox';

const cashbox = useCashboxStore();

const name = ref('');

const createCashbox = async () => {
    await cashbox.create(name.value);
    name.value = '';
}

</script>

<template>
    <div class="rounded-md shadow-md border p-4">
        <h1 class="text-lg font-bold">Neue Kasse:</h1>
        <form @submit.prevent="createCashbox">
            <div class="flex flex-col gap-2">
                <label for="name">Name:</label>
                <UInput type="text" id="name" v-model="name" />
                <UButton type="submit">Erstellen</UButton>
            </div>
        </form>
    </div>
</template>