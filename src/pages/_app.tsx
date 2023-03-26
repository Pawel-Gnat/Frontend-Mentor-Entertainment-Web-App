import '../styles/global.css'
import type { AppProps } from 'next/app'
import { Outfit } from 'next/font/google'
import Layout from '../components/layout/Layout'

const outfit = Outfit({
	weight: ['300', '500'],
	subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<style
				jsx
				global>{`
				html {
					font-family: ${outfit.style.fontFamily};
				}
			`}</style>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	)
}
