<script setup>
const { signOut, getSession } = useAuth()
const session = await getSession()
</script>

<template>
    <div class="flex flex-row gap-2 items-center">
        <UPopover>
            <UButton label="Profile" variant="ghost">
                <NuxtImg v-if="session.user.image" :src="session.user.image" :alt="session.user.name" width="32" height="32"
                    class="rounded-full" />
            </UButton>
            <template #panel>
                <div class="p-2">
                    <UButton color="red" @click="signOut">Abmelden</UButton>
                </div>
            </template>
        </UPopover>
    </div>
</template>