<template>
    <nav class="flex flex-row justify-between items-center p-4 py-2 border-b">
        <NuxtLink to="/" class="hover:bg-gray-200 rounded-md px-2">
            <NuxtImg src="/svl-cashflow.png" width="100" height="50" />
        </NuxtLink>

        <ul class="flex flex-row justify-center gap-2">
            <Navitem name="Dashboard" route="/" icon="i-heroicons-home" />
            <Navitem name="Neue Buchung" route="/add-booking" icon="i-heroicons-plus" />
        </ul>
        <Logout />
    </nav>
</template>
