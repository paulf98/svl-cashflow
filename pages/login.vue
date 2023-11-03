<script setup lang="ts">
import { useUserStore } from '@/stores/user'

definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    }
})

const { signIn, getSession } = useAuth()
const userStore = useUserStore()

// redirect the user if they are already logged in
const session = await getSession()
if (session.user) {
    await userStore.setUser()
    if (userStore.hasUser) {
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


