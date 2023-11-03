import { defineStore } from 'pinia';
import { type Booking } from '@prisma/client';

export const useBookingsStore = defineStore('bookings', {
	state: () => ({
		bookings: [] as Booking[],
	}),
	getters: {
		hasBookings: (state) => !!state.bookings,
		getAllIncome: (state) => {
			if (!state.bookings.length) return [];
			return state.bookings.filter((booking) => booking.amount > 0);
		},
		getAllExpenses: (state) => {
			if (!state.bookings.length) return [];
			return state.bookings.filter((booking) => booking.amount < 0);
		},
	},
	actions: {
		async addExpense({ name, amount }: { name: string; amount: number }) {
			const bookings = await useFetch('/api/bookings/expenses', {
				method: 'POST',
				body: { name, amount },
			});
			return bookings.data.value;
		},
		async fetchAllExpenses() {
			const responseBody = await useFetch('/api/bookings/expenses', {
				method: 'GET',
			}).data.value?.body;
			// de-serialize the body from the response, need to convert date fields from strings to Date objects
			if (responseBody) {
				const deserializedBody = responseBody.map((booking: any) => ({
					...booking,
					createdAt: new Date(booking.createdAt),
					updatedAt: new Date(booking.updatedAt),
				})) as Booking[];
				this.bookings = deserializedBody;
				return deserializedBody;
			}
			return [];
		},
	},
});
