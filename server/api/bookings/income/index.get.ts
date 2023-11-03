import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// get the bookings from the database that have an amount that is greater than 0
export default defineEventHandler(async (event) => {
	const bookings = await prisma.booking.findMany({
		where: {
			amount: {
				gt: 0,
			},
		},
	});

	return {
		status: 200,
		body: bookings,
	};
});
