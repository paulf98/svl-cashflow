<script setup lang="ts">
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    }
})

const { signIn } = useAuth()
</script>

<template>
    <div class="flex flex-col justify-center items-center min-h-screen p-4 bg-gradient-to-tr from-green-600 to-green-700">
        <div class="flex flex-col border p-4 shadow-md rounded-md gap-4 bg-white">
            <h1 class="text-xl font-bold">Login</h1>
            <NuxtImg src="/svl-cashflow.png" width="250" height="125" class="mx-4" />
            <UButton color="white" icon="i-devicon-google" size="xl" class="text-center" block
                @click="() => signIn('google')">Login mit Google
            </UButton>
        </div>
    </div>
</template>


