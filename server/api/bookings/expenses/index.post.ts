// creates a new entry in the bookings table
import { getServerSession } from '#auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

	const booking = await prisma.booking.create({
		data: {
			...data,
			updatedAt: new Date(),
			createdById: user.id,
		},
	});

	return {
		status: 200,
		body: booking,
	};
});
