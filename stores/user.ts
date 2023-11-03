import { defineStore } from 'pinia';
import type { User } from '@prisma/client';

// this store contains the data of the currently logged in user
export const useUserStore = defineStore('user', {
	state: () => ({
		user: {} as User,
	}),
	getters: {
		hasUser: (state) => !!state.user,
	},
	actions: {
		async setUser() {
			const user = await useFetch('/api/user');
			return user.data.value;
		},
	},
});
