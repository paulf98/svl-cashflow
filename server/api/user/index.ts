import { getServerSession } from '#auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Endpoint that inserts or returns the user
export default defineEventHandler(async (event) => {
	const session = await getServerSession(event);

	if (session && session.user) {
		const user = await prisma.user.findUnique({
			where: {
				email: session.user.email || '',
			},
		});

		if (user) {
			return {
				status: 200,
				body: user,
			};
		} else {
			// write the new user to the database
			const newUser = await prisma.user.create({
				data: {
					email: session.user.email || '',
					name: session.user.name || '',
					image: session.user.image || '',
				},
			});
			return {
				status: 200,
				body: newUser,
			};
		}
	}
});
