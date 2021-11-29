import {
	GraphQLFloat,
	GraphQLList,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from 'graphql'

import { ActivityType, GarageState } from './types'
import {
	garageEntries, 
	garageStateResolver, 
	lazyResolver 
} from './resolvers'
import Subscription from './subscription'

const RootQuery = new GraphQLObjectType({
	name: 'Query',
	fields:{
		garageLog: { 
			type: new GraphQLList(ActivityType),
			description: 'garage log',
			args: { 
				lastKnownTimeStamp: { type: GraphQLFloat },
				limit: { type: GraphQLFloat }
			},
			resolve: garageEntries,
		},
		garageState: {
			type: GarageState,
			description: 'garage state',
			resolve: garageStateResolver,
		},
		lazyLoaderLogs: {
			type: new GraphQLList(ActivityType),
			description: 'lazy garage loader',
			args: {
				lastUid: { type: GraphQLFloat },
				limit: { type: GraphQLFloat } 
			},
			resolve: lazyResolver
		}
	},
})

export default new GraphQLSchema({
	query: RootQuery,
	subscription: Subscription,
})
