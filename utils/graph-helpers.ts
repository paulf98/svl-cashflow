// Returns the start and end date of the week that is x weeks ago
export function getXWeeksAgoDateSpan(x: number) {
	const today = new Date();
	const start = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() - 7 * x
	);
	const end = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() - 7 * (x - 1)
	);
	return { start, end };
}
