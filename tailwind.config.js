import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                black: '#030303', // off-black
                neon: {
                    DEFAULT: '#00ff41',
                    glow: 'rgba(0, 255, 65, 0.2)',
                },
                zinc: {
                    900: '#18181b',
                    800: '#27272a',
                    100: '#f4f4f5',
                },
            },
            fontFamily: {
                sans: ['"JetBrains Mono"', ...defaultTheme.fontFamily.sans],
                mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
            },
        },
    },

    plugins: [forms],
};
