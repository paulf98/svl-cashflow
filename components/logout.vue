<script setup>
const { signOut, getSession } = useAuth()
const session = await getSession()
</script>

<template>
    <div class="mx-auto flex flex-col gap-4 items-center">
        <UButton color="red" @click="signOut">Sign Out</UButton>
        <span>Logged in as {{ session && session.user && session.user.name }}</span>
    </div>
</template>