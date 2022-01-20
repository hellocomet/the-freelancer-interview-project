import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

export const app = new Koa()

app.use(bodyParser())

app.listen({ port: 4000 }, () => {
  console.log(`🚀 To infinity...and beyond!`)
})
