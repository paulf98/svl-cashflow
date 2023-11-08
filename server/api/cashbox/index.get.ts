import { prisma } from '../../../prisma/db';

export default defineEventHandler(async (event) => {
	const cashbox = await prisma.cashbox.findMany({
		orderBy: {
			createdAt: 'desc',
		},
	});

	return cashbox;
});
