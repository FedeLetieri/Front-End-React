import axios from "axios"
import { REST_SERVER_URL } from "./constant"
import { Seleccion } from "../domain/Seleccion"

class SeleccionesService{
    async getSelecciones(search){
        const searchParam = search == "" ? "" : `?search=${encodeURIComponent(search)}`
        const selecciones = await axios.get(`${REST_SERVER_URL}/selecciones${searchParam}`)
        return selecciones.data.map((seleccion) => Seleccion.fromJSON(seleccion))
    }

    async deleteSeleccion(id){
        await axios.delete(`${REST_SERVER_URL}/eliminarSeleccion?id=${id}`)
    }

    async createSeleccion(seleccion){
        await axios.post(`${REST_SERVER_URL}/nuevaSeleccion`, seleccion, {
            headers: {
              'Content-Type': 'application/json',
            },
        })
    }

    async putSeleccion(seleccion){
        await axios.put(`${REST_SERVER_URL}/editarSeleccion`, seleccion, {
            headers: {
              'Content-Type': 'application/json',
            },
        })
    }

    async getConfederaciones(){
        const confeds = await axios.get(`${REST_SERVER_URL}/confederaciones`)
        return confeds.data
    }
}

export const seleccionesService = new SeleccionesService()