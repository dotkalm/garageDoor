import * as graphql from 'graphql'
import { GarageState } from './types'
import { garageStateResolver } from './resolvers'
const {
	GraphQLObjectType,
	GraphQLBoolean,
	subscribe,
} = graphql

const Subscription = new GraphQLObjectType({
	name: 'Subscription',
	fields:{
		garageState: { 
			type: GarageState,
			description: 'garage state',
			subscribe: garageStateResolver,
		}
	}
})
export default Subscription

