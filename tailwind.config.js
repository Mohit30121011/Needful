/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            boxShadow: {
                'material-1': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
                'material-2': '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
                'material-3': '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
                'material-4': '0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)',
                'material-5': '0 20px 40px rgba(0,0,0,0.2)',
            },
            borderRadius: {
                'lg': 'var(--radius)',
                'md': 'calc(var(--radius) - 2px)',
                'sm': 'calc(var(--radius) - 4px)',
                'xl': 'calc(var(--radius) * 1.5)',
                '2xl': 'calc(var(--radius) * 2)',
                '3xl': 'calc(var(--radius) * 3)',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
            keyframes: {
                "slide-in-right-cool": {
                    "0%": { transform: "translateX(100%) scale(0.95)", opacity: "0", filter: "blur(10px)" },
                    "100%": { transform: "translateX(0) scale(1)", opacity: "1", filter: "blur(0)" },
                },
                "slide-in-left-cool": {
                    "0%": { transform: "translateX(-100%) scale(0.95)", opacity: "0", filter: "blur(10px)" },
                    "100%": { transform: "translateX(0) scale(1)", opacity: "1", filter: "blur(0)" },
                },
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
                "spin-reverse": {
                    from: { transform: "rotate(360deg)" },
                    to: { transform: "rotate(0deg)" },
                },
                "counter-spin": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(-360deg)" },
                },
                "fadeIn": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "fadeInUp": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "spring-in": {
                    from: { transform: "scale(0.9)", opacity: 0 },
                    to: { transform: "scale(1)", opacity: 1 },
                },
                "shimmer": {
                    '0%': { backgroundPosition: "-200% 0" },
                    '100%': { backgroundPosition: "200% 0" },
                },
                "text-shimmer": {
                    '0%': { backgroundPosition: "0 0" },
                    '100%': { backgroundPosition: "-200% 0" },
                },
                "float": {
                    '0%, 100%': { transform: "translateY(0) translateX(0)" },
                    '25%': { transform: "translateY(-20px) translateX(10px)" },
                    '50%': { transform: "translateY(-10px) translateX(-10px)" },
                    '75%': { transform: "translateY(-30px) translateX(5px)" },
                },
                "blob": {
                    '0%, 100%': { transform: "translate(0, 0) scale(1)" },
                    '25%': { transform: "translate(20px, -30px) scale(1.1)" },
                    '50%': { transform: "translate(-20px, 20px) scale(0.95)" },
                    '75%': { transform: "translate(30px, 10px) scale(1.05)" },
                },
                "mobile-slide-in-right": {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0)" },
                },
                "mobile-slide-out-right": {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(100%)" },
                },
                "mobile-slide-in-left": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0)" },
                },
                "mobile-slide-out-left": {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-100%)" },
                },
                "marquee": {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "spring-in": "spring-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                "shimmer": "shimmer 2s infinite linear",
                "text-shimmer": "text-shimmer 2.5s ease-out infinite alternate",
                "float": "float 6s ease-in-out infinite",
                "blob": "blob 20s ease-in-out infinite",
                "mobile-slide-in-right": "mobile-slide-in-right 0.5s cubic-bezier(0.32, 0.72, 0, 1) forwards",
                "mobile-slide-out-right": "mobile-slide-out-right 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards",
                "mobile-slide-in-left": "mobile-slide-in-left 0.5s cubic-bezier(0.32, 0.72, 0, 1) forwards",
                "mobile-slide-out-left": "mobile-slide-out-left 0.3s cubic-bezier(0.32, 0.72, 0, 1) forwards",
                "marquee": "marquee 15s linear infinite",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
