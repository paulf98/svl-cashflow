import { prisma } from '../../../prisma/db';

// delete the booking with the selected id
export default defineEventHandler(async (event) => {
	// read the id from the query string
	const query = getQuery(event);

	const booking = await prisma.booking
		.delete({
			where: {
				// need to convert the id from a string to a number
				id: Number(query.id),
			},
		})
		.catch((error) => {
			console.error(error);
			return null;
		});
	return booking;
});
