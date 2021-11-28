import * as graphql from 'graphql'
import { GarageState } from './types'
import { garageStateGenerator, garageStateResolver } from './resolvers'
const {
	GraphQLObjectType,
	GraphQLBoolean,
	subscribe,
} = graphql

const Subscription = new GraphQLObjectType({
	name: 'Subscription',
	fields:{
		garageState: { 
			name: 'GarageState',
			type: GarageState,
			description: 'garage state',
			subscribe: garageStateGenerator,
		}
	}
})
export default Subscription

