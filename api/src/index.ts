import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { graphqlMiddleware } from './graphql'
import * as schema from './schema'

export const app = new Koa()

app.use(bodyParser())
app.use(graphqlMiddleware([schema]))

app.listen({ port: 4000 }, () => {
  console.log(`🚀 To infinity...and beyond!`)
})
