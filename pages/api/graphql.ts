import type { IncomingMessage, ServerResponse } from 'http';
import { graphqlHTTP, GraphQLParams } from 'express-graphql'
import type {
	DocumentNode,
	ValidationRule,
	ExecutionArgs,
	ExecutionResult,
	FormattedExecutionResult,
	GraphQLSchema,
	GraphQLFieldResolver,
	GraphQLTypeResolver,
	GraphQLFormattedError, 
} from 'graphql'
import {
	buildSchema,
	Source,
	GraphQLError,
	parse,
	validate,
	execute,
	formatError,
	validateSchema,
	getOperationAST,
	specifiedRules,
} from 'graphql';

import Schema from 'graphql/schema' 

export type Request = IncomingMessage & { url: string };

type Response = ServerResponse & { json?: (data: unknown) => void };
type MaybePromise<T> = Promise<T> | T;
type Options =
	| ((
		request: Request,
		response: Response,
		params?: GraphQLParams,
	) => MaybePromise<OptionsData>)
	| MaybePromise<OptionsData>;
interface OptionsData {
	schema: GraphQLSchema;
	context?: unknown;
	rootValue?: unknown;
	pretty?: boolean;
	validationRules?: ReadonlyArray<ValidationRule>;
	customValidateFn?: (
		schema: GraphQLSchema,
		documentAST: DocumentNode,
		rules: ReadonlyArray<ValidationRule>,
	) => ReadonlyArray<GraphQLError>;
	customExecuteFn?: (args: ExecutionArgs) => MaybePromise<ExecutionResult>;
	customFormatErrorFn?: (error: GraphQLError) => GraphQLFormattedError;
	customParseFn?: (source: Source) => DocumentNode;
	formatError?: (error: GraphQLError) => GraphQLFormattedError;
	extensions?: (
		info: RequestInfo,
	) => MaybePromise<undefined | { [key: string]: unknown }>;
	graphiql?: boolean;
	fieldResolver?: GraphQLFieldResolver<unknown, unknown>;
	typeResolver?: GraphQLTypeResolver<unknown, unknown>;
}

const PORT = 4000;
const subscriptionEndpoint = `ws://localhost:${PORT}/subscriptions`;

async function server(req: Request, res: Response, graphQLParams: GraphQLParams | undefined){
	return {
		schema: Schema,
		graphiql: {
      subscriptionEndpoint,
      websocketClient: 'v1',
    },
	}
}
export default graphqlHTTP(server)
