// creates a new entry in the bookings table
import { getServerSession } from '#auth';
import { prisma } from '../../../prisma/db';

export default defineEventHandler(async (event) => {
	const session = await getServerSession(event);

	if (!session || !session.user) {
		return {
			status: 401,
		};
	}

	// fetch the current user
	const user = await prisma.user.findUnique({
		where: {
			email: session.user.email || '',
		},
	});

	if (!user) {
		return {
			status: 401,
		};
	}

	const data = await readBody(event);

	const booking = await prisma.booking
		.create({
			data: {
				...data,
				amount: Number(data.amount),
				updatedAt: new Date(),
				cashbox: {
					connect: {
						id: parseInt(data.cashbox),
					},
				},
				createdBy: {
					connect: {
						id: user.id,
					},
				},
			},
		})
		.catch((error) => {
			console.error(error);
			return null;
		});
	return booking;
});
