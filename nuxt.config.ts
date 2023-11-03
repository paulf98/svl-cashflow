// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxt/ui', '@sidebase/nuxt-auth', '@pinia/nuxt'],
	pinia: {
		storesDirs: ['./stores/**'],
	},
	auth: {
		origin: process.env.AUTH_ORIGIN,
	},
	colorMode: {
		preference: 'light',
	},
	ui: {
		global: true,
		icons: ['heroicons'],
	},
	css: ['~/assets/css/main.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
