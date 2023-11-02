<script setup>
const { signOut, getSession } = useAuth()
const session = await getSession()
</script>

<template>
    <div class="mx-auto flex flex-col gap-2 items-center">
        <UButton color="red" @click="signOut">Abmelden</UButton>
        <p class="text-sm text-gray-500 italic">Angemeldet als {{ session && session.user && session.user.name }}</p>
    </div>
</template>