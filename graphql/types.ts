import * as graphql from 'graphql'
const {
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLFloat,
	GraphQLBoolean,
	GraphQLInt,
} = graphql

export const TimeFields = new GraphQLObjectType({
	name: 'Timefields',
	description: 'human readable timestamp since',
	fields: () => ({
		seconds: { type: GraphQLInt },
		minutes: { type: GraphQLInt },
		hours: { type: GraphQLInt },
		days: { type: GraphQLInt },
	})
})
export const GarageState = new GraphQLObjectType({
	name: 'GarageState',
	description: 'state of garage',
	fields: () => ({
		open: { type: GraphQLBoolean },
		lastUpdated: { type: GraphQLFloat },
		lastUpdatedObject: { type: TimeFields }
	})
})
export const EntryType = new GraphQLObjectType({
	name: 'LogEntry',
	description: 'entries within day',
	fields: () => ({
		timestamp: { type: GraphQLFloat },
		action: { type: GraphQLString }
	})
})
export const ActivityType = new GraphQLObjectType({
	name: 'DailyLogEntry',
	description: 'garage door activity per day',
	fields: () => ({
		uid: { type: GraphQLFloat },
		entries: {
			type: new GraphQLList(EntryType),
			resolve: ({uid, ...entries}) => {
				const arr = new Array
				for(const timestamp in entries){
					arr.push({ timestamp, action: entries[timestamp] })
				}
				return arr.sort((x,y) => x.timestamp > y.timestamp ? -1 : 1)
			}
		},
	})
})
