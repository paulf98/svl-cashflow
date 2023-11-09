import { prisma } from '../../../prisma/db';

// fetch all bookings from the database
export default defineEventHandler(async (event) => {
	console.log('Fetching all bookings');
	const query = getQuery(event);
	console.log(query);
	const bookings = await prisma.booking.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		where: {
			createdById: Number(query.userId),
		},
	});

	return {
		status: 200,
		body: bookings,
	};
});
