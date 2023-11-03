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
		async addBooking({
			name,
			amount,
			createdAt,
		}: {
			name: string;
			amount: number;
			createdAt?: Date;
		}) {
			const response = await useFetch('/api/bookings', {
				method: 'POST',
				body: { name, amount, createdAt },
			}).data.value;
			if (response && 'body' in response) {
				// de-serialize the body from the response, need to convert date fields from strings to Date objects
				const deserializedBody = {
					...response.body,
					createdAt: new Date(response.body.createdAt),
					updatedAt: new Date(response.body.updatedAt),
				};
				this.bookings = [...this.bookings, deserializedBody];
				return deserializedBody;
			}
		},
		async fetchAllBookings() {
			const responseBody = await useFetch('/api/bookings', {
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
		async deleteBooking(id: number) {
			const response = await useFetch(`/api/bookings/?id=${id}`, {
				method: 'DELETE',
			}).data.value;
			if (response && 'body' in response) {
				// de-serialize the body from the response, need to convert date fields from strings to Date objects
				const deserializedBody = {
					...response.body,
					createdAt: new Date(response.body.createdAt),
					updatedAt: new Date(response.body.updatedAt),
				};
				// remove the deleted booking from the store
				this.bookings = this.bookings.filter(
					(booking) => booking.id !== deserializedBody.id
				);
				return deserializedBody;
			}
		},
	},
});
