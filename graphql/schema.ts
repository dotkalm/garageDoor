import { GraphQLParams } from 'express-graphql'
import * as graphql from 'graphql'
import { getCollection } from '../server/firestore'
import { Request } from '../pages/api/graphql'
import type { 
	GraphQLFieldConfig,
} from 'graphql'
const {
	GraphQLString,
	GraphQLObjectType,
	GraphQLSchema,
} = graphql

const RootQuery = new GraphQLObjectType({
	name: 'Query',
	fields:{
		hello: {
			type: GraphQLString,
			resolve(): string{
		}
	}
})

export default new GraphQLSchema({
	query: RootQuery,
})
