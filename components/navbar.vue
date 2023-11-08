<script setup>
const { getSession } = useAuth()
const session = await getSession()
</script>

<template>
    <nav v-if="session && session.user" class="flex flex-row justify-between items-center p-4 py-2 border-b">
        <NuxtLink to="/" class="hover:bg-gray-200 rounded-md px-1 md:px-2">
            <NuxtImg src="/svl-cashflow.png" width="100" height="50" />
        </NuxtLink>

        <ul class="flex flex-row items-center justify-center gap-2">
            <Navitem name="Dashboard" route="/" icon="i-heroicons-home" />
            <Navitem name="Buchung" route="/add-booking" icon="i-heroicons-book-open" />
            <Navitem name="Kassen" route="/cashboxes" icon="i-heroicons-banknotes" />
        </ul>
        <Logout v-if="session && session.user" />
    </nav>
</template>
