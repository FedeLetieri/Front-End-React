import { CardChica } from "../../components/cardChica/cardChica"
import { BarraBusqueda } from "../../components/barraBusqueda/barraBusqueda"
import { ButtonAdd } from "../../components/buttonAdd/buttonAdd"
import { useState } from "react"
import { useOnInit } from "../../customHooks/hooks"
import { figuritasService } from "../../services/figuritasService"
import "./figuritas.css"
import { faHashtag, faIdCardClip, faPrint } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { NoElementMessage } from '../../components/shared/noElementMessage/noElementMessage'
import PropTypes from 'prop-types'


export const Figuritas = (props) => {    
    const [figuritas, setFiguritas] = useState([])
    const navigate = useNavigate()

    const obtenerFiguritas = async () => {
      await props.doThenShowMsg(async () => {
        const figuritas = await figuritasService.obtenerFiguritas()
        setFiguritas(figuritas)
      }, '', '')
    }

    const eliminarFigurita = async(figurita) => {
      await props.doThenShowMsg(async () => {
        await figuritasService.eliminarFigurita(figurita)
        const updatedFiguritas = figuritas.filter(item => item.id !== figurita.id)
        setFiguritas(updatedFiguritas)
      }, 'Eliminada exitosamente', '')
    }
       
    const obtenerFiguritasByBuscador = async (filtro) =>{
      await props.doThenShowMsg(async () => {
        const figuritas = await figuritasService.obtenerFiguritas(filtro)
        setFiguritas(figuritas)
      }, '', '')
    }

    const editarElemento = async(figurita) => {
      navigate(`/figuritas/editar/${figurita.id}`)
    }

    useOnInit(obtenerFiguritas)


    return (    
        <div className="general-container">
            <div className="container-BarraBusqueda">
            <BarraBusqueda
            buscarElemento={(filtro) => obtenerFiguritasByBuscador(filtro)}
            ></BarraBusqueda>
            </div>
             <div className="CardChica-container">
             {figuritas.length === 0 ? 
                    <NoElementMessage message='figuritas'></NoElementMessage>
                 : 
                figuritas.map((figurita, index) =>
                 
                    <CardChica
                        
                        key={figurita.id} 
                        titulo={figurita.nombre} 
                        tituloInferior={"Valoración"}
                        valorTituloInferior={figurita.valorTotal.toFixed(0)} 
                        color={index % 2 === 0 ? "var(--color-primario)" : "var(--color-primario-oscuro)"} 
                        icon={faIdCardClip} 
                        taglist={[  
                            { icon: <FontAwesomeIcon icon={faHashtag} style={{ color: 'var(--color-primario)' }}/>, texto: figurita.numero.toString() },
                            { icon: <FontAwesomeIcon icon={faFire} style={{ color: 'var(--color-secundario)' }}/>, texto: figurita.onFire ? "On Fire" : <span className="notOnfire" data-testid="On Fire">On fire</span> },
                            { icon: <FontAwesomeIcon icon={faPrint} style={{ color: 'var(--color-primario)' }}/>, texto: figurita.nivelImpresion }
                          ]} 
                          eliminarElemento={() => eliminarFigurita(figurita)}
                          editarElemento={() => editarElemento(figurita)}
                          ></CardChica>
                          )}
            </div> 
            <ButtonAdd path="/figuritas/agregar" ></ButtonAdd>
        </div>
    )
}

Figuritas.propTypes = {
  doThenShowMsg: PropTypes.func,
}
