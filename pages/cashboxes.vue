<script setup lang="ts">
import { useCashboxStore } from '@/stores/cashbox';

const cashbox = useCashboxStore();
await cashbox.fetchAll();

</script>

<template>
    <div class="container mx-auto p-4">
        <div class="flex flex-col-reverse md:flex-row gap-4 md:items-start">
            <MyCashboxes />
            <NewCashbox />
        </div>
    </div>
</template>