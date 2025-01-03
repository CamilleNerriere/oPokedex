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
    // Ajout des configurations manquantes
    resolve: {
        alias: {
            '@': '/assets',
        },
    },
});