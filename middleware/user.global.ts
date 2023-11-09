// client side middleware to set the user from the session in the pinia store
import { useUserStore } from '@/stores/user';
import { useBookingsStore } from '@/stores/bookings';

export default defineNuxtRouteMiddleware(async () => {
	const { getSession } = useAuth();
	const userStore = useUserStore();
	const bookings = useBookingsStore();

	if (userStore.hasUser) {
		await bookings.fetchAllBookings();
		return;
	}

	const session = await getSession();
	if (session && session.user && session.user.email) {
		const { data } = await useFetch('/api/user');
		if (data && data.value) {
			// deserialize the user
			const user = {
				...data.value,
				createdAt: new Date(data.value.createdAt),
				updatedAt: new Date(data.value.updatedAt),
			};
			userStore.setUser(user);
			await bookings.fetchAllBookings();
		}
	}
});
