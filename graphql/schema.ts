import {
	GraphQLFloat,
	GraphQLList,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from 'graphql'
import { ActivityType } from './types'
import { garageEntries } from './resolvers'
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
	},
})

export default new GraphQLSchema({
	query: RootQuery,
	subscription: Subscription,
})
