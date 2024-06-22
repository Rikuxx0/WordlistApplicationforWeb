import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig ({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://script.google.com/macros/s/AKfycbxtg3CHW9gSIRlED0lIhYXfUr2sF7YIRqSrH-Gzu4nJX1l8cplKIFpWiJGbQJSll-DC/exec?text=Hello&source=en&target=ja",
        changeOrigin: true,
      },
    },
  },
});
