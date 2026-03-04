import { createTheme, DEFAULT_THEME } from '@mantine/core';

export const myTheme = createTheme({
    fontFamily: 'Montserrat, sans-serif',
    fontFamilyMonospace: 'Monaco, Courier, monospace',
    headings: {
        fontFamily: `Montserrat, ${DEFAULT_THEME.fontFamily}`,
    },
    colors: {
        brand: [
            '#f0f5ff',   // [0]  → Más claro  (bg variante light)
            '#d6e4ff',   // [1]  → Muy claro
            '#adc6ff',   // [2]  → Claro
            '#85a5ff',   // [3]  → Claro medio
            '#597ef7',   // [4]  → Medio       (texto variante light, borde outline)
            '#2F54EB',   // [5]  → Medio fuerte
            '#1d39c4',   // [6]  → ★ COLOR PRINCIPAL (filled)
            '#10239e',   // [7]  → Oscuro      (hover del filled)
            '#061178',   // [8]  → Más oscuro  (active/pressed)
            '#030852',   // [9]  → El más oscuro
        ],
    },
    primaryColor: 'brand',
});