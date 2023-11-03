import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// delete the booking with the selected id
export default defineEventHandler(async (event) => {
	// read the id from the query string
	const query = getQuery(event);
	console.log(query);

	const booking = await prisma.booking.delete({
		where: {
			// need to convert the id from a string to a number
			id: Number(query.id),
		},
	});

	return {
		status: 200,
		body: booking,
	};
});
