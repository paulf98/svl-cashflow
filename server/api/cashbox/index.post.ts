import { prisma } from '../../../prisma/db';

export default defineEventHandler(async (event) => {
	const data = await readBody(event);
	console.log('Data: ', data);
	const cashbox = await prisma.cashbox.create({
		data: {
			...data,
			updatedAt: new Date(),
		},
	});
	return cashbox;
});
