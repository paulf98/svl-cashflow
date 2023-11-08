<!-- Render the amount as a colored text depending on the value -->
<script setup lang="ts">
const props = defineProps({
    amount: {
        type: Number,
        required: true
    }
})
const amountClass = computed(() => {
    return {
        'text-green-700': props.amount > 0,
        'text-red-700': props.amount < 0,
        'text-gray-700': props.amount == 0,
    }
})

</script>

<template>
    <span class="font-bold" :class="amountClass">{{ props.amount }} €</span>
</template>