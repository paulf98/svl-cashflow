import { NuxtAuthHandler } from '#auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '../../../prisma/db';

export default NuxtAuthHandler({
	secret: process.env.GOOGLE_CLIENT_SECRET,
	pages: {
		// Change the default behavior to use `/login` as the path for the sign-in page
		signIn: '/login',
	},
	callbacks: {
		async signIn({ user }) {
			// check if the user exists in the database
			const dbUser = await prisma.user.findUnique({
				where: {
					email: user.email,
				},
			});
			// if the user doesn't exist, create a new user
			if (!dbUser) {
				await prisma.user.create({
					data: {
						email: user.email,
						name: user.name,
						image: user.image,
					},
				});
			}
			return true;
		},
	},
	providers: [
		// @ts-expect-error
		GoogleProvider.default({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
});
