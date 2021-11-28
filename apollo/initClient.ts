import {
	ApolloClient,
	createHttpLink,
	from,
	InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

import { jwtDecodeExp } from '../actions/jwt'

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
})
const authLink = setContext((_, { headers }) => {
	const jwt = localStorage.getItem('jwt')
	if (!jwt) return { headers }
	const now = Date.now().valueOf() / 1000
	JSON.parse(atob(jwt.split('.')[1])).user.exp

	const exp = jwtDecodeExp(jwt)
	if (now > exp) {
		localStorage.removeItem('jwt')
		return { headers }
	}

	return {
		headers: {
			...headers,
			authorization: `Bearer ${jwt}`,
		},
	}
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path, extensions }) => {
			console.error(
				`[GraphQL error]: ${
					extensions?.code ? `Code: ${extensions.code}` : ''
				} Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		})
	}

	if (networkError) console.error(`[Network error]: ${networkError}`)
})

export const initClient = () =>
	new ApolloClient({
		link: from([errorLink, authLink, httpLink]),
		cache: new InMemoryCache({
			possibleTypes: {
				Entity: ['Image', 'Text', 'Link', 'Collection'],
			},
		}),
	})
