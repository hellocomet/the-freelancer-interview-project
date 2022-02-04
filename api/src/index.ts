import Server from './Server'

const server: Server = new Server()

const server_port = 5000

server.run(server_port, () => {
  console.log(`[SERVER] Started on http://localhost:${server_port}`)
})
