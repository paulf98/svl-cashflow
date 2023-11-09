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
			return state.cashboxes.filter(
				(cashbox) => cashbox.createdById === user.id
			);
		},
		getCashboxById: (state) => (id: number) => {
			return state.cashboxes.find((cashbox) => cashbox.id === id);
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
		async create(name: string) {
			const userStore = useUserStore();
			const user = userStore.getUser;
			const { data } = await useFetch('/api/cashbox', {
				method: 'POST',
				body: { createdById: user.id, name },
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
		async delete(id: number) {
			const { data } = await useFetch(`/api/cashbox/?id=${id}`, {
				method: 'DELETE',
			});
			if (data && data.value) {
				const bookings = useBookingsStore();
				await bookings.fetchAllBookings();
				this.cashboxes = this.cashboxes.filter((cashbox) => cashbox.id !== id);
				return data.value;
			}
		},
	},
});
