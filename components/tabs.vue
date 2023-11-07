<script setup>
const items = [{
    label: 'Einnahmen',
    key: 'income',
    slot: 'income',
}, {
    label: 'Ausgaben',
    key: 'expenses',
    slot: 'expenses',
}]
</script>

<template>
    <div class="w-full mx-auto">
        <UTabs :items="items">
            <template #income>
                <Income />
            </template>

            <template #expenses>
                <Expenses />
            </template>
        </UTabs>
    </div>
</template>

