// client side middleware to set the user from the session in the pinia store
import { useUserStore } from '@/stores/user';

export default defineNuxtRouteMiddleware(async () => {
	const { getSession } = useAuth();
	const userStore = useUserStore();

	if (userStore.hasUser) {
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
		}
	}
});
