import type { Config } from "tailwindcss";

export default {
	// Appearance follows the system setting; see src/index.css.
	darkMode: "media",
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1.25rem',
			screens: {
				'2xl': '1120px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				signal: {
					green: 'var(--signal-green)',
					orange: 'var(--signal-orange)',
					red: 'var(--signal-red)',
					blue: 'var(--signal-blue)',
					yellow: 'var(--signal-yellow)',
					gray: 'var(--signal-gray)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			// Apple text styles in rem so they follow the browser's font-size setting.
			fontSize: {
				largetitle: ['clamp(2.5rem, 5vw + 1rem, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
				title1: ['2.125rem', { lineHeight: '1.18', letterSpacing: '-0.02em' }],
				title2: ['1.75rem', { lineHeight: '1.21', letterSpacing: '-0.015em' }],
				title3: ['1.375rem', { lineHeight: '1.27', letterSpacing: '-0.01em' }],
				headline: ['1.0625rem', { lineHeight: '1.41', fontWeight: '600' }],
				body: ['1.0625rem', { lineHeight: '1.47' }],
				callout: ['1rem', { lineHeight: '1.5' }],
				subhead: ['0.9375rem', { lineHeight: '1.4' }],
				footnote: ['0.8125rem', { lineHeight: '1.38' }],
				caption: ['0.75rem', { lineHeight: '1.33' }]
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fadeIn 0.2s ease-out'
			},
			fontFamily: {
				sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
				mono: ['ui-monospace', '"SF Mono"', 'Menlo', 'Consolas', 'monospace']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
