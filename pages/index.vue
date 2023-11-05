<script setup>
import { useBookingsStore } from '@/stores/bookings';

const bookings = useBookingsStore();
await bookings.fetchAllBookings();

definePageMeta({
    middleware: ['auth'],
})
</script>

<template>
    <div class="p-4 flex flex-col gap-8">
        <Balance />
        <Tabs />
        <Logout />
    </div>
</template>