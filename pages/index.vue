<script setup>
import { useBookingsStore } from '@/stores/bookings';

const bookings = useBookingsStore();
await bookings.fetchAllBookings();
</script>

<template>
    <div class="container mx-auto p-4 grid grid-cols-6 grid-rows-3 gap-4">
        <Balance class="row-span-1 col-span-3 lg:col-span-2" />
        <Graph class="row-span-1 col-span-3 lg:col-span-2 row-start-2" />
        <Tabs class="row-span-3 col-span-3 lg:col-span-4" />
    </div>
</template>