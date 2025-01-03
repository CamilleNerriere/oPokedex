import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: './index.html',
            },
        },
    },
    server: {
        port: 5173,
        host: true,
    },
    resolve: {
        alias: {
            '@': '/assets',
        },
    },
});
