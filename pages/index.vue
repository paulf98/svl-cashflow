<script setup>
const { signIn, getSession } = useAuth();
const data = await getSession();
if (!data.user) {
    await signIn();
}
</script>

<template>
    <div class="p-4 flex flex-col gap-8">
        <Balance />
        <Tabs />
        <Logout />
    </div>
</template>