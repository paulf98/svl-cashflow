<script setup lang="ts">
const props = defineProps<{
    name: string
    route: string
    icon?: string
}>()

// detect the active route 
const route = useRoute()
const isActive = computed(() => route.path === props.route)
</script>

<template>
    <li>
        <NuxtLink :to="props.route"
            class="flex flex-row justify-center items-center p-2 px-4 hover:bg-gray-200 rounded-md text-gray-800" :class="{
                'bg-gray-200': isActive,
                'hover:bg-gray-200': !isActive
            }">
            <UIcon v-if="props.icon" :name="props.icon" class="mr-2" />
            {{ name }}
        </NuxtLink>
    </li>
</template>