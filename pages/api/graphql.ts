import type { IncomingMessage, ServerResponse } from 'http';

import type { NextApiRequest, NextApiResponse } from 'next'
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

type Data = {
	name: string
}
export type Request = IncomingMessage & { url: string };

type Response = ServerResponse & { json?: (data: unknown) => void };
type MaybePromise<T> = Promise<T> | T;
export type Options =
	| ((
		request: Request,
		response: Response,
		params?: GraphQLParams,
	) => MaybePromise<OptionsData>)
	| MaybePromise<OptionsData>;

export interface OptionsData {
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

const Schema = buildSchema(`
	type Query {
		hello: String
	}
`)
async function server(req: Request, res: Response, graphQLParams: GraphQLParams | undefined){
	return {
		schema: Schema,
		graphiql: true,
	}
}
export default graphqlHTTP(server)
