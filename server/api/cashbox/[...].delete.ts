import { prisma } from '../../../prisma/db';

// delete the booking with the selected id
export default defineEventHandler(async (event) => {
	// read the id from the query string
	const query = getQuery(event);
	const cashboxId = Number(query.id);

	// delete all bookings for this cashbox
	await prisma.booking.deleteMany({
		where: {
			cashboxId,
		},
	});

	// delete the cashbox
	const cashbox = await prisma.cashbox
		.delete({
			where: {
				id: cashboxId,
			},
		})
		.catch((error) => {
			console.error(error);
			return null;
		});

	return cashbox;
});
