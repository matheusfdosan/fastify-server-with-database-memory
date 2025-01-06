import { randomUUID } from "node:crypto"

export default class DatabaseMemory {
  // Estrutura de dados Map, parecido com objetos, porém com algumas particularidades a mais.
  #videos = new Map()

  list(search) {
    return Array.from(this.#videos.entries())
      .map((eachVideo) => {
        const id = eachVideo[0]
        const data = eachVideo[1]

        return {
          id,
          ...data,
        }
      })
      .filter((video) => {
        if (search) {
          return video.title.includes(search) || video.description.includes(search)
        }

        return true
      })
      // entries() mostra os valores sem as propriedades (ids)
  }

  create(video) {
    const randomVideoId = randomUUID()

    this.#videos.set(randomVideoId, video) // set é para colocar dados no Map
    // Nesse caso, as propridades dos objetos são os ids dos vídeos
  }

  update(id, video) {
    this.#videos.set(id, video)
  }

  delete(id) {
    this.#videos.delete(id)
  }
}
