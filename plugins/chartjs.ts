import {
	Chart,
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
} from 'chart.js';

export default defineNuxtPlugin(() => {
	Chart.register(
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale,
		LineController,
		LineElement,
		PointElement
	);
});
