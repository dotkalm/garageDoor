import * as graphql from 'graphql'
import { garageStateResolver } from './resolvers'
const {
	GraphQLObjectType,
	GraphQLBoolean,
} = graphql

const Subscription = new GraphQLObjectType({
	name: 'Subscription',
	fields:{
		garageState: { 
			type: GraphQLBoolean,
			description: 'garage state',
			resolve: garageStateResolver,
		}
	}
})
export default Subscription

