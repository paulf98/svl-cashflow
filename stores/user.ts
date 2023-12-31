import { defineStore } from 'pinia';
import type { User } from '@prisma/client';

// this store contains the data of the currently logged in user
export const useUserStore = defineStore('user', {
	state: () => ({
		user: {} as User,
	}),
	getters: {
		hasUser: (state) => state.user.id !== undefined,
		getUser(state) {
			return state.user;
		},
		getUserId(state) {
			return state.user.id;
		},
	},
	actions: {
		setUser(user: User) {
			this.user = user;
			return user;
		},
	},
});
