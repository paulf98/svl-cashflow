<script setup lang="ts">
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    }
})
const { signIn, getSession } = useAuth()

// redirect the user if they are already logged in
const session = await getSession()
if (session.user) {
    // make request to backend to check if the user already exists
    const user = await useFetch('/api/user')
    if (user) {
        navigateTo('/')
    }
}
</script>

<template>
    <div class="flex flex-col gap-8 justify-center items-center min-h-screen p-4">
        <UButton color="white" icon="i-heroicons-arrow-right-on-rectangle" @click="() => signIn('google')">Login mit Google
        </UButton>
    </div>
</template>


