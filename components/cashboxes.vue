<script setup lang="ts">
import { useCashboxStore } from '@/stores/cashbox';

const cashbox = useCashboxStore();
const { ownCashboxes } = storeToRefs(cashbox)

await cashbox.fetchAll();
</script>

<template>
    <div class="border shadow-md rounded-md p-4">
        <h1 class="text-lg font-bold">Meine Kassen:</h1>
        <ul v-for="cashbox in ownCashboxes" :key="cashbox.id">
            <li>{{ cashbox.name }}</li>
        </ul>
    </div>
</template>