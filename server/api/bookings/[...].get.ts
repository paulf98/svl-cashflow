import { prisma } from '../../../prisma/db';

// fetch all bookings from the database
export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const bookings = await prisma.booking.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		where: {
			createdById: Number(query.userId),
		},
	});

	return bookings;
});
