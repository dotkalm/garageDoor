import * as graphql from 'graphql'
const {
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLFloat,
} = graphql

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
