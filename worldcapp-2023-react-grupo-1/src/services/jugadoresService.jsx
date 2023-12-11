import axios from 'axios'
import { Jugador } from '../domain/jugador'
import { REST_SERVER_URL } from './constant'

const jugadorAsJSON = (jugadorJSON) => Jugador.fromJSON(jugadorJSON)

class JugadoresService {
  async agregarJugador(formData) {
    return axios.post(`${REST_SERVER_URL}/jugadores/agregar`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async obtenerJugadores(filtro = '') {
    try {
      const jugadoresJSON = await axios.get(
        `${REST_SERVER_URL}/jugadores_all_info?filtro=${filtro}`,
      )
      const jugadores = jugadoresJSON.data.map((jugadorJSON) =>
        jugadorAsJSON(jugadorJSON),
      )
      return jugadores
    } catch (er) {
      return console.log(er)
    }
  }

  async eliminarJugador(jugador) {
    await axios.delete(`${REST_SERVER_URL}/jugadores/eliminar?id=${jugador.id}`)
  }

  async editarJugador(formData) {
    return axios.put(`${REST_SERVER_URL}/jugadores/editar`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async obtenerJugador(id) {
    const jugadorJSON = await axios.get(`${REST_SERVER_URL}/jugador?id=${id}`)
    return jugadorAsJSON(jugadorJSON.data)
  }
}

export const jugadoresService = new JugadoresService()
