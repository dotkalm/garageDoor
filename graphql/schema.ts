import { GraphQLParams } from 'express-graphql'
import * as graphql from 'graphql'
import type { GraphQLFieldConfig } from 'graphql'
import { ActivityType } from './types'
import { getCollection } from '../server/firestore'
import { QueryType } from '../server/types/firestore'
import makeDateString from '../actions/makeDateString'
import { Request } from '../pages/api/graphql'
const {
	GraphQLString,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLFloat,
} = graphql

const RootQuery = new GraphQLObjectType({
	name: 'Query',
	fields:{
		garageLog: { 
			type: new graphql.GraphQLList(ActivityType),
			description: 'garage log',
			args: { 
				lastKnownTimeStamp: { type: GraphQLFloat },
				limit: { type: GraphQLFloat }
			},
			resolve(parent, args, request){
				const queryArray: QueryType[] = [
					{ orderBy: 'desc', field: 'uid' }
				]
				if('limit' in args){
					queryArray.unshift({
						value: args.limit,
						limit: true
					})
				}else if('lastKnownTimeStamp' in args){
					queryArray.unshift({
						field: 'uid',
						opperator: '>=',
						value: makeDateString(args.lastKnownTimeStamp),
					})
				}else{
					queryArray.unshift({
						value: 3,
						limit: true
					})
				}
				return getCollection('activity', queryArray)
			}
		},
	}
})

export default new GraphQLSchema({
	query: RootQuery,
})
