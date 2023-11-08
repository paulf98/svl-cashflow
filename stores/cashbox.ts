import type { Cashbox } from '@prisma/client';
import { useUserStore } from './user';

export const useCashboxStore = defineStore('cashbox', {
	state: () => ({
		cashboxes: [] as Cashbox[],
	}),
	getters: {
		ownCashboxes(state) {
			const userStore = useUserStore();
			const user = userStore.getUser;
			console.log(state.cashboxes);
			console.log(user);
			return state.cashboxes.filter(
				(cashbox) => cashbox.createdById === user.id
			);
		},
	},
	actions: {
		async fetchAll() {
			const { data } = await useFetch('/api/cashbox', { method: 'GET' });
			if (data && data.value) {
				const deserializedBody = data.value?.map((booking: any) => ({
					...booking,
					createdAt: new Date(booking.createdAt),
					updatedAt: new Date(booking.updatedAt),
				})) as Cashbox[];
				this.cashboxes = deserializedBody;
				return deserializedBody;
			}
		},
		async create(cashbox: Cashbox) {
			const { data } = await useFetch('/api/cashbox', {
				method: 'POST',
				body: cashbox,
			});
			if (data && data.value) {
				// de-serialize the body from the response, need to convert date fields from strings to Date objects
				const deserializedBody = {
					...data.value,
					createdAt: new Date(data.value.createdAt),
					updatedAt: new Date(data.value.updatedAt),
				};
				this.cashboxes = [...this.cashboxes, deserializedBody];
				return deserializedBody;
			}
		},
	},
});
