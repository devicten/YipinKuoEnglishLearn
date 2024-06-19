// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  build: { transpile: ["@fortawesome/vue-fontawesome"] },
  modules: ["@pinia/nuxt", "nuxt-mongodb", "nuxt-bootstrap-icons"],
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "@/assets/scss/app.scss",
  ],
  plugins: [],
  postcss: {
    // CSS 屬性加上瀏覽器相容性前綴
    plugins: {
      autoprefixer: true,
    },
  },
  app: {
    head: {
      title: "Kingslish",
      htmlAttrs: {
        lang: "zh-tw",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  server: {
    port: 3000,
    host: "localhost",
  },
  vue: {
    config: {
      productionTip: true,
      devtools: false,
    },
  },
  vite: {
    server: {
      watch: {
        usePolling: true, //set here to enable hot reload
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/_color.scss";
            @import "@/assets/scss/_variables.scss";
          `,
        },
      },
    },
  },
  runtimeConfig: {
    jwtSignSecret: "qYU72DwKkYl6jv1id7UAw8cWYYB3b1Lo",
    pwdKey: "qaZutzHs5bTqN3hwZD4WQr64wZQSNtce",
  },
});
