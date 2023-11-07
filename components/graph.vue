<script lang="ts" setup>
import { Line } from 'vue-chartjs'
import { useBookingsStore } from '@/stores/bookings';
import { getXWeeksAgoDateSpan } from '@/utils/graph-helpers';

const bookings = useBookingsStore()
const { getExpensesFromDateBetween, getIncomeFromDateBetween } = storeToRefs(bookings)
const balances = computed(() => {
    const balances = [] as { start: Date, end: Date, balance: number }[]
    for (let i = 3; i >= 0; i--) {
        const { start, end } = getXWeeksAgoDateSpan(i)
        const expenses = getExpensesFromDateBetween.value(start, end).map((booking) => booking.amount).reduce((a, b) => a + b, 0)
        const income = getIncomeFromDateBetween.value(start, end).map((booking) => booking.amount).reduce((a, b) => a + b, 0)
        const balance = expenses + income;
        balances.push({ start, end, balance })
    }
    return balances
})

const chartData = computed(() => {
    return {
        labels: [balances.value[0].start.toLocaleDateString(), balances.value[1].start.toLocaleDateString(), balances.value[2].start.toLocaleDateString(), balances.value[3].start.toLocaleDateString()],
        datasets: [
            {
                label: 'Zusammenfassung der letzten Wochen',
                data: balances.value.map((balance) => balance.balance),
                fill: {
                    target: 'origin',
                    above: '#22C55E',   // Area will be green above the origin
                    below: '#EF4444'    // And red below the origin
                }
            },
        ]
    }
})

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
})
</script>

<template>
    <div class="border shadow-md rounded-md">
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>