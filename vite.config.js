import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    server: {
    host: 'localhost',
    port: 5173,
    origin: 'http://localhost:5173',
    }
})