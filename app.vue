<script setup lang="ts">
useHead({
    title: 'SVL Cashflow',
    meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'SVL Cashflow App - Kassenübersicht' },
        // Social Media Preview
        { property: 'og:image', content: './svl-cashflow.png' },
        { property: 'og:title', content: 'SVL Cashflow' },
        { property: 'og:description', content: 'SVL Cashflow App - Kassenübersicht' },
        { property: 'og:url', content: 'https://svl-cashflow.paulf.dev/' },

    ],
})
</script>

<template>
    <div>
        <Navbar />
        <NuxtLoadingIndicator />
        <NuxtPage />
        <UNotifications />
    </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>