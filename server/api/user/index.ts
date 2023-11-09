import { getServerSession } from '#auth';
import { prisma } from '../../../prisma/db';

export default defineEventHandler(async (event) => {
	const session = await getServerSession(event);
	if (!session || !session.user) {
		return null;
	}

	const user = await prisma.user.findUnique({
		where: {
			email: session.user.email as string,
		},
	});

	if (!user) {
		const newUser = await prisma.user.create({
			data: {
				email: session.user.email as string,
				name: session.user.name as string,
				image: session.user.image,
			},
		});
		return newUser;
	}
	return user;
});
