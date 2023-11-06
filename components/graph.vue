<script lang="ts" setup>
import { Line } from 'vue-chartjs'

const chartData = ref({
    // the last 4 weeks
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
        {
            label: 'Entwicklung',
            data: [40, 20, -10, 50],
            fill: {
                target: 'origin',
                above: 'rgb(0, 200, 0)',   // Area will be red above the origin
                below: 'rgb(200, 0, 0)'    // And blue below the origin
            }
        },
    ],
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