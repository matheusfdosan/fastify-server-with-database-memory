import { fastify } from "fastify"
import DatabasePostgres from "./database-postgres.js"
const server = fastify()

const database = new DatabasePostgres()

server.get("/videos", async (req) => {
  const search = req.query.search

  const videos = await database.list(search)

  return videos
})

server.post("/videos", async (req, res) => {
  const { title, description, duration } = req.body

  await database.create({
    title,
    description,
    duration,
  })

  console.log(database.list())

  return res.status(201).send() // status code 201 significa que algo foi criado
})



// server.get("/videos/:id", (req, res) => {})

server.put("/videos/:id", async (req, res) => {
  const videoId = req.params.id
  const { title, description, duration } = req.body

  await database.update(videoId, {
    title,
    description,
    duration,
  })

  return res.status(200).send()
})

server.delete("/videos/:id", async (req, res) => {
  const videoId = req.params.id

  await database.delete(videoId)
  
  return res.status(204).send()
})

server.listen({ port: process.env.PORT ?? 1324 })
