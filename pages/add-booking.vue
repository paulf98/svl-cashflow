<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
})

import { useBookingsStore } from '@/stores/bookings'
import type { FormSubmitEvent, FormError, FormErrorEvent } from '#ui/types';

export type BookingFormData = {
    name: string,
    amount: number,
    date: string,
}

const bookings = useBookingsStore()

const state = reactive({
    name: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0]
})

const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.name) errors.push({ path: 'name', message: 'Bezeichnung der Buchung fehlt.' })
    if (!state.amount) errors.push({ path: 'amount', message: 'Betrag kann nicht leer sein.' })
    if (state.amount == 0) errors.push({ path: 'amount', message: 'Betrag kann nicht Null sein.' })
    return errors
}

async function onError(event: FormErrorEvent) {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const btnClasses = computed(() => {
    return {
        'bg-green-500 hover:bg-green-600': state.amount > 0,
        'bg-red-500 hover:bg-red-600': state.amount < 0,
        // if the amount is 0, disable the button
        '!bg-gray-500 cursor-not-allowed': state.amount == 0,
    }
})

async function onSubmit(event: FormSubmitEvent<BookingFormData>) {
    const booking = {
        name: state.name,
        // amount is a string, so we need to convert it to a number
        amount: Number(state.amount),
        // convert the string to a date here
        createdAt: state.date ? new Date(state.date) : new Date(),
    }

    // add the booking to the store and database
    bookings.addBooking(booking).then(() => {
        // TODO: show success message

        // then reset the form
        state.name = ''
        state.amount = 0
        state.date = new Date().toISOString().split('T')[0]

    }).catch((error) => {
        // show error message
        console.log(error)
    })

}

</script>

<template>
    <div class="p-4 w-full max-w-lg mx-auto">
        <div class="border p-4 rounded-md shadow-sm">
            <h1 class="text-xl font-bold">Neue Buchung</h1>

            <UForm class="mt-4 flex flex-col gap-4" :validate="validate" :state="state" @submit="onSubmit" @error="onError">

                <UFormGroup label="Bezeichnung" name="name">
                    <UInput v-model="state.name" placeholder="Bezeichnung der Buchung" />
                </UFormGroup>

                <UFormGroup label="Betrag" name="amount">
                    <UInput placeholder="Betrag" v-model="state.amount" type="number">
                        <template #trailing>
                            <span class="text-gray-500 dark:text-gray-400 text-xs">€</span>
                        </template>
                    </UInput>
                </UFormGroup>

                <UFormGroup label="Buchungsdatum" name="date">
                    <UInput v-model="state.date" type="date" />
                </UFormGroup>

                <!-- Button to submit the form -->
                <UButton block type="submit" :class="btnClasses">
                    Buchen
                </UButton>

            </UForm>
        </div>
    </div>
</template>