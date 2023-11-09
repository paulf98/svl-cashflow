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
		baseURL: process.env.AUTH_BASE_URL,
		globalAppMiddleware: true,
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
