import { defineStore } from 'pinia';
import { useCashboxStore } from './cashbox';
import { type Booking } from '@prisma/client';

export const useBookingsStore = defineStore('bookings', {
	state: () => ({
		bookings: [] as Booking[],
	}),
	getters: {
		hasBookings: (state) => !!state.bookings,
		getAllIncome: (state) => {
			if (!state.bookings.length) return [];
			const income = state.bookings.filter((booking) => booking.amount > 0);
			if (!income.length) return [];
			const cashboxStore = useCashboxStore();
			return income.map((booking) => {
				const cashbox = cashboxStore.getCashboxById(booking.cashboxId);
				return {
					...booking,
					cashbox,
				};
			});
		},
		getAllExpenses: (state) => {
			if (!state.bookings.length) return [];
			const expenses = state.bookings.filter((booking) => booking.amount < 0);
			if (!expenses.length) return [];
			const cashboxStore = useCashboxStore();
			return expenses.map((booking) => {
				const cashbox = cashboxStore.getCashboxById(booking.cashboxId);
				return {
					...booking,
					cashbox,
				};
			});
		},
		getIncomeFromDateBetween: (state) => (from: Date, to: Date) => {
			if (!state.bookings.length) return [];
			return state.bookings.filter(
				(booking) =>
					booking.amount > 0 &&
					booking.createdAt >= from &&
					booking.createdAt <= to
			);
		},
		getExpensesFromDateBetween: (state) => (from: Date, to: Date) => {
			if (!state.bookings.length) return [];
			return state.bookings.filter(
				(booking) =>
					booking.amount < 0 &&
					booking.createdAt >= from &&
					booking.createdAt <= to
			);
		},
		getBalanceOfCashbox: (state) => (cashboxId: number) => {
			if (!state.bookings.length) return 0;
			const cashboxBookings = state.bookings.filter(
				(booking) => booking.cashboxId === cashboxId
			);
			if (!cashboxBookings.length) return 0;
			return cashboxBookings.reduce((acc, booking) => acc + booking.amount, 0);
		},
	},
	actions: {
		async addBooking({
			name,
			amount,
			createdAt,
			cashbox,
		}: {
			name: string;
			amount: number;
			createdAt?: Date;
			cashbox?: number;
		}) {
			const response: any = await useFetch('/api/bookings', {
				method: 'POST',
				body: { name, amount, createdAt, cashbox },
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
			const { data } = await useFetch('/api/bookings', {
				method: 'GET',
			});
			// de-serialize the body from the response, need to convert date fields from strings to Date objects
			if (data && data.value?.body) {
				const deserializedBody = data.value?.body.map((booking: any) => ({
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
			await useFetch(`/api/bookings/?id=${id}`, {
				method: 'DELETE',
				onResponse: (response) => {
					if (response.response.status === 200) {
						this.bookings = this.bookings.filter(
							(booking) => booking.id !== id
						);
					}
				},
			});
		},
	},
});
