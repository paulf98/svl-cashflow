<script setup lang="ts">
import { useCashboxStore } from '@/stores/cashbox';

const cashbox = useCashboxStore();
await cashbox.fetchAll();

</script>

<template>
    <div class="container mx-auto p-4">
        <div class="flex md:flex-row justify-between items-start gap-4">
            <MyCashboxes />
            <NewCashbox />
        </div>
    </div>
</template>