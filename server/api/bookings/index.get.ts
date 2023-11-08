import { prisma } from '../../../prisma/db';
import { useUserStore } from '../../../stores/user';

// fetch all bookings from the database
export default defineEventHandler(async (event) => {
	const userStore = useUserStore();
	const userId = userStore.getUserId;
	const bookings = await prisma.booking.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		where: {
			createdById: userId,
		},
	});

	return {
		status: 200,
		body: bookings,
	};
});
