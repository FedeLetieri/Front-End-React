import './PuntoDeVenta.css'
import { BarraBusqueda } from "../../components/barraBusqueda/barraBusqueda"
import PropTypes from 'prop-types'
import { ButtonAdd } from "../../components/buttonAdd/buttonAdd"
import { useState } from "react"
import { useOnInit } from "../../customHooks/hooks"
import { faStore, faLocationDot, faIdBadge } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CardChica } from '../../components/cardChica/cardChica'
import { puntosDeVentaService } from '../../services/puntosDeVentaService'
import { useNavigate } from 'react-router-dom'
import { NoElementMessage } from '../../components/shared/noElementMessage/noElementMessage'

export const PuntoDeVenta = (props) => {
    const [puntosDeVenta, setPuntosDeVenta] = useState([])
    const navigate = useNavigate()

    const obtenerPuntosDeVenta = async () => {
        try {
          const puntosDeVenta = await puntosDeVentaService.obtenerPuntosDeVenta()
          setPuntosDeVenta(puntosDeVenta)
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarPuntosDeVenta = async(puntosDeVenta) => {
        await props.doThenShowMsg(async () => {
            const updatedPuntosDeVenta = await puntosDeVentaService.eliminarPuntosDeVenta(puntosDeVenta)
            setPuntosDeVenta(updatedPuntosDeVenta)
        }, 'Eliminado exitosamente', '')
    }

    const editarElemento = async(puntoDeVenta) => {
        navigate(`/puntos-de-venta/editar/${puntoDeVenta.id}`)
    }
    
    useOnInit(obtenerPuntosDeVenta)


    return (    
        <div className='general-container'>
            <div className="container-BarraBusqueda">
                <BarraBusqueda></BarraBusqueda>
            </div>
            <div className="CardChica-container">
                {puntosDeVenta.length === 0 ? 
                    <NoElementMessage message='puntos de venta'></NoElementMessage>
                 : 
                    puntosDeVenta.map((puntoDeVenta, index) =>
                        <CardChica
                            key={puntoDeVenta.nombre}
                            titulo={puntoDeVenta.nombre}
                            tituloInferior={""}
                            valorTituloInferior={puntoDeVenta.tipo}
                            color={index % 2 === 0 ? "var(--color-primario)" : "var(--color-primario-oscuro)"} 
                            icon={faStore}
                            taglist={[  
                                { icon: <FontAwesomeIcon icon={faLocationDot} style={{ color: 'var(--color-primario)' }}/>, texto: puntoDeVenta.direccion.calle },
                                { icon: <FontAwesomeIcon icon={faIdBadge} style={{ color: 'var(--color-primario-oscuro)' }}/>, texto: puntoDeVenta.stockSobres }
                            ]} 
                            eliminarElemento={() => eliminarPuntosDeVenta(puntoDeVenta)}
                            editarElemento={() => editarElemento(puntoDeVenta)}
                        ></CardChica>
                    )
                }
            </div> 
            <ButtonAdd path="/puntos-de-venta/agregar"></ButtonAdd>
        </div>
    )
}

PuntoDeVenta.propTypes = {
    doThenShowMsg: PropTypes.func,
  }
