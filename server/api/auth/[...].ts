import { NuxtAuthHandler } from '#auth';
import GoogleProvider from 'next-auth/providers/google';

export default NuxtAuthHandler({
	secret: process.env.AUTH_SECRET,
	pages: {
		// Change the default behavior to use `/login` as the path for the sign-in page
		signIn: '/login',
	},
	providers: [
		// @ts-expect-error
		GoogleProvider.default({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
});
