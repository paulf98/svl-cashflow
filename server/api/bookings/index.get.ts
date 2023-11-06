import { prisma } from '../../../prisma/db';

// fetch all bookings from the database
export default defineEventHandler(async (event) => {
	const bookings = await prisma.booking.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	});

	return {
		status: 200,
		body: bookings,
	};
});
