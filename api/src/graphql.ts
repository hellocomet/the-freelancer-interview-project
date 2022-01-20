import { makeExecutableSchema } from '@graphql-tools/schema'
import { DocumentNode, ExecutionResult, graphql, GraphQLSchema } from 'graphql'
import { Context, DefaultContext, DefaultState, Middleware, ParameterizedContext } from 'koa'
import { log } from './logger'

type Resolvers = {
  Mutation?: Record<string, unknown>
  Query?: Record<string, unknown>
}

export type TypeDefsAndResolvers = {
  typeDefs: DocumentNode
  resolvers: Resolvers
}

async function processGraphql(
  ctx: ParameterizedContext<
    DefaultState,
    DefaultContext,
    ExecutionResult | Record<string, unknown>
  >,
  schema: GraphQLSchema
) {
  const { body } = ctx.request
  const { query, operationName, variables } = body

  ctx.body = await graphql({
    schema,
    operationName,
    contextValue: ctx,
    source: query,
    variableValues: variables,
  })

  if (ctx.body.errors) {
    log.error(ctx.body.errors)
  }
}

export function graphqlMiddleware(
  definitions: TypeDefsAndResolvers[]
): Middleware<DefaultState, Context> {
  const schema = makeExecutableSchema({
    typeDefs: definitions.map(({ typeDefs }) => typeDefs),
    resolvers: definitions.map(({ resolvers }) => resolvers),
  })

  return async function graphqlMiddleware(ctx, next) {
    if (ctx.path === '/graphql' && ctx.method === 'POST') {
      await processGraphql(ctx, schema)
    }

    return next()
  }
}
