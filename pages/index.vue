<script setup>
import { useBookingsStore } from '@/stores/bookings';

const bookings = useBookingsStore();
await bookings.fetchAllBookings();
</script>

<template>
    <div class="container mx-auto p-4 grid grid-cols-6 md:grid-rows-3 gap-4 md:gap-x-8 lg:gap-x-16">
        <Balance class="md:row-span-1 col-span-6 md:col-span-3 lg:col-span-2" />
        <Graph class="md:row-span-1 md:row-start-2 col-span-6 md:col-span-3 lg:col-span-2" />
        <MyCashboxes class="md:row-span-1 md:row-start-3 col-span-6 md:col-span-3 lg:col-span-2" />
        <Tabs class="md:row-span-3 col-span-6 md:col-span-3 lg:col-span-4" />
    </div>
</template>