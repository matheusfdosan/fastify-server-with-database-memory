// SERVIDOR CONVENCIONAL
/*
  import { createServer } from "node:http"

  const server = createServer((request, response) => {
    console.log("Entrou");
    response.write("Ola, Mundo!")
    return response.end()
  })

  server.listen(1324)
*/

// SERVIDOR COM FASTIFY
import { fastify } from "fastify"
import DatabaseMemory from "./database-memory.js"
const server = fastify()

const database = new DatabaseMemory()

server.get("/videos", (req) => {
  const search = req.query.search

  const videos = database.list(search)

  return videos
})

server.post("/videos", (req, res) => {
  const { title, description, duration } = req.body

  database.create({
    title,
    description,
    duration,
  })

  console.log(database.list())

  return res.status(201).send() // status code 201 significa que algo foi criado
})



// server.get("/videos/:id", (req, res) => {})

server.put("/videos/:id", (req, res) => {
  const videoId = req.params.id
  const { title, description, duration } = req.body

  database.update(videoId, {
    title,
    description,
    duration,
  })

  return res.status(200).send()
})

server.delete("/videos/:id", (req, res) => {
  const videoId = req.params.id

  database.delete(videoId)
  
  return res.status(204).send()
})

server.listen({ port: process.env.PORT ?? 1324 })
