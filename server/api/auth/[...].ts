import { NuxtAuthHandler } from '#auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '../../../prisma/db';
import { useUserStore } from '../../../stores/user';

export default NuxtAuthHandler({
	secret: process.env.GOOGLE_CLIENT_SECRET,
	pages: {
		// Change the default behavior to use `/login` as the path for the sign-in page
		signIn: '/login',
	},
	callbacks: {
		async signIn({ user }) {
			// check if the user exists in the database
			let dbUser = await prisma.user.findUnique({
				where: {
					email: user.email as string,
				},
			});
			// if the user doesn't exist, create a new user
			if (!dbUser) {
				dbUser = await prisma.user.create({
					data: {
						email: user.email as string,
						name: user.name as string,
						image: user.image,
					},
				});
			}
			const userStore = useUserStore();
			userStore.setUser(dbUser);
			return true;
		},
		async session({ session }) {
			if (session.user) {
				let dbUser = await prisma.user.findUnique({
					where: {
						email: session.user.email as string,
					},
				});
				if (dbUser) {
					const userStore = useUserStore();
					userStore.setUser(dbUser);
				}
			}
			return session;
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
