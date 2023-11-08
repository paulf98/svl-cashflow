<script setup lang="ts">
import { useCashboxStore } from '@/stores/cashbox';

const cashbox = useCashboxStore();
const { ownCashboxes } = storeToRefs(cashbox)

await cashbox.fetchAll();
</script>

<template>
    <div>
        Cashboxes
    </div>
</template>