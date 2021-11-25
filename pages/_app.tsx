import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import { initClient } from "../apollo";
import '../styles/globals.css'

const client = initClient()

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}

export default MyApp
