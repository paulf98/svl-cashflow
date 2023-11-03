import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// get the bookings from the database that have an amount that is smaller than 0
export default defineEventHandler(async (event) => {
	const bookings = await prisma.booking.findMany({
		where: {
			amount: {
				lt: 0,
			},
		},
	});

	return {
		status: 200,
		body: bookings,
	};
});
