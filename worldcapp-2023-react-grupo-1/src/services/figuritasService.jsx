
import axios from 'axios'
import { Figurita } from "../domain/figuritas"
import { REST_SERVER_URL } from './constant'

const figuritaAsJSON = (figuritaJSON) => Figurita.fromJSON(figuritaJSON)
class FiguritasService{
    

    async obtenerFiguritas(filtro=''){
            const figuritasJSON = await axios.get(`${REST_SERVER_URL}/figuritas?filtro=${filtro}`)
            const figuritas = figuritasJSON.data.map((figuritaJSON) => figuritaAsJSON(figuritaJSON)) 
            return figuritas
    }
       
    async agregarFigurita(figurita) {
        return axios.post(`${REST_SERVER_URL}/figuritas`, figurita, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
    }

    async editarFigurita(figurita){
        return axios.put(`${REST_SERVER_URL}/editarFigurita`, figurita, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
    }

    async eliminarFigurita(figurita){
        await axios.delete(`${REST_SERVER_URL}/eliminarFigurita?idFigurita=${figurita.id}`)
    }

    async obtenerUnaFigurita(idFiguritaAObtener){
      const figuritaJSON = await axios.get(`${REST_SERVER_URL}/figurita?figurita=${idFiguritaAObtener}`)
      const figurita = figuritaAsJSON(figuritaJSON.data)

      return figurita
    }
}   


export const figuritasService = new FiguritasService()