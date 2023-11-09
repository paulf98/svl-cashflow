// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxt/ui', '@sidebase/nuxt-auth', '@pinia/nuxt', '@nuxt/image'],
	image: {
		// allow loading images from google user profiles
		domains: ['lh3.googleusercontent.com'],
	},
	pinia: {
		storesDirs: ['./stores/**'],
	},
	app: {
		pageTransition: {
			name: 'page',
			mode: 'out-in',
		},
	},
	auth: {
		globalAppMiddleware: true,
		// @ts-expect-error Somehow the typing for this is wrong
		origin: process.env.AUTH_BASE_URL || 'http://localhost:3000',
	},
	colorMode: {
		preference: 'light',
	},
	ui: {
		global: true,
		icons: ['heroicons', 'devicon'],
	},
	css: ['~/assets/css/main.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
