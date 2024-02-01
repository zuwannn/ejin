import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import dotenv from 'dotenv'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/ejin",
    define: {
        // env variable
        // 'process.env.VITE_BASE': JSON.stringify(process.env.VITE_BASE)
    },
    // envDir: "./env"
})