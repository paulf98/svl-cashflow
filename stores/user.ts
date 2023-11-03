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
			const user = await useFetch('/api/user').data.value?.body;
			if (user) {
				// de-serialize the body from the response, need to convert date fields from strings to Date objects
				const userObj = {
					...user,
					createdAt: new Date(user.createdAt),
					updatedAt: new Date(user.updatedAt),
				};
				this.user = userObj;
				return userObj;
			}
			return {};
		},
	},
});
