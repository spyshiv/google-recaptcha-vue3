import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: fileURLToPath(
        new URL("./src/components/Recaptcha.vue", import.meta.url)
      ),
      name: "GoogleRecaptchaVue3",
      fileName: (format) => `google-recaptcha-vue3.${format}.js`
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});