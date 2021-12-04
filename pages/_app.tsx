import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import { initClient } from "apollo/";
import 'styles/globals.css'
import ErrorBoundary from 'components/ErrorBoundary'

const client = initClient()

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ErrorBoundary>
			<ApolloProvider client={client}>
				<Component {...pageProps} />
			</ApolloProvider>
		</ErrorBoundary>
	)
}

export default MyApp
