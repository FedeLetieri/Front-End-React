
import { PuntoDeVenta } from "../domain/puntosDeVenta"
import axios from 'axios'
import { REST_SERVER_URL } from './constant'

const puntosDeVentaAsJSON = (puntosDeVentaJSON) => PuntoDeVenta.fromJSON(puntosDeVentaJSON)

class PuntosDeVentaService{
    
    puntosDeVenta = [
        new PuntoDeVenta(1,"Alto Kiosko", "Kiosko", "Av.Saraza 5555", 100),
        new PuntoDeVenta(1,"Alto Kiosko", "Kiosko", "Av.Saraza 5555", 100),
    ]

    async obtenerPuntosDeVenta(){
        try{
            const puntosDeVentaJSON = await axios.get(`${REST_SERVER_URL}/obtenerSobres`)
            const puntoDeVenta = puntosDeVentaJSON.data.map((puntoDeVentaJSON) => puntosDeVentaAsJSON(puntoDeVentaJSON)) 
            
            return puntoDeVenta
        }
            catch(er){
                return console.log(er)
            }
    }

    async obtenerPuntoDeVentaPorId(id) {
        try {
          const response = await axios.get(`${REST_SERVER_URL}/obtenerSobrePorId?idSobre=${id}`)
          const puntoDeVentaJSON = response.data
      
          const puntoDeVenta = PuntoDeVenta.fromJSON(puntoDeVentaJSON)
          
          return puntoDeVenta
        } catch (error) {
          console.error(error)
          throw error
        }
      }

    async agregarPuntoDeVenta(puntoDeVenta) {
        return axios.post(`${REST_SERVER_URL}/agregarSobre`, puntoDeVenta.toJSON(), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }

    async editarPuntoDeVenta(puntoDeVenta){
        return axios.put(`${REST_SERVER_URL}/editarSobre`, puntoDeVenta.toJSON(), {
            headers: {
              'Content-Type': 'application/json',
            },
          })
    }

    async eliminarPuntosDeVenta(puntoDeVenta){
        try{
            const puntosDeVentaJSON = await axios.delete(`${REST_SERVER_URL}/eliminarSobre?idSobre=${puntoDeVenta.id}`)
            
            const puntoDeVentaNuevos = puntosDeVentaJSON.data.map((puntoDeVentaJSON) => puntosDeVentaAsJSON(puntoDeVentaJSON)) 
            return puntoDeVentaNuevos
        }
            catch(er){
                return console.log(er)
            }

    }

}   


export const puntosDeVentaService = new PuntosDeVentaService()