import { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'
import { useOnInit } from "../../customHooks/hooks"
import './Selecciones.css'
import { seleccionesService } from '../../services/seleccionesService'
import { BarraBusqueda } from '../../components/barraBusqueda/barraBusqueda'
import { ModifyElement } from '../../components/modifyElement/ModifyElement'
import { ButtonAdd } from '../../components/buttonAdd/buttonAdd'
import { Loading } from '../../components/loading/Loading'
import SeleccionesForm from './SeleccionesForm'

export const Selecciones = (props) => {
    const [loadingState, setLoadingState] = useState('loading')
    const [selecciones, setSelecciones] = useState([])
    const [modalForm, setModalForm] = useState(false)
    const [defaultSeleccion, setDefaultSeleccion] = useState(null)
    const [lastSearch, setLastSearch] = useState("")

    const deleteSeleccion = async (id) => {
        await props.doThenShowMsg(async () => {
            await seleccionesService.deleteSeleccion(id)},
            'Eliminada exitosamente',
            ''
        )
        getSelecciones(lastSearch)
    }

    const goToEditSeleccion = (seleccion) => {
        setDefaultSeleccion(seleccion)
        changeModalFormVisibility()
    }

    const seleccionesItems = () => {
        return selecciones.map((seleccion, index) =>
            <tr data-testid='seleccion' key={seleccion + '-tr-' + index}>
                <td key={seleccion + '-td-' + index}>
                    <span className="seleccion-icon"><FontAwesomeIcon icon={faFlag}></FontAwesomeIcon></span>
                    <span data-testid='seleccion__pais' className='seleccion-name'>{seleccion.pais}</span>
                    <ModifyElement edit={() => goToEditSeleccion(seleccion)} remove={() => deleteSeleccion(seleccion.id)}></ModifyElement>
                </td>
            </tr>
        )
    }

    useOnInit(async () => { getSelecciones(lastSearch) })

    const noElements = () => selecciones.length == 0

    const getSelecciones = async (lastSearch) => {
        setLoadingState('loading')
        setSelecciones(await seleccionesService.getSelecciones(lastSearch))
        setLoadingState(noElements() ? 'notFound' : 'loaded')
    }

    const searchSelecciones = async (search) => {
        setLastSearch(search)
        console.log(lastSearch, search)
        setSelecciones(await seleccionesService.getSelecciones(search))
    }

    const changeModalFormVisibility = () => { setModalForm(!modalForm) }
    const changeDefaultSeleccion = (seleccion) => {
        setDefaultSeleccion(seleccion)
        getSelecciones(lastSearch)
    }

    return (
        <div className='main-wrapper'>
            <BarraBusqueda buscarElemento={searchSelecciones}/>
            {(() => { return noElements() ? 
                        <Loading state={loadingState} itemsName='selecciones'></Loading>
                        :
                        <>
                            <table className='selecciones-table'>
                                <tbody>
                                    {seleccionesItems()}
                                </tbody>
                            </table>
                            <ButtonAdd path='/selecciones' handleChange={() => changeModalFormVisibility(true)}/>
                            {(() => modalForm ?
                                <SeleccionesForm doThenShowMsg={props.doThenShowMsg} changeSeleccion={changeDefaultSeleccion} defaultSeleccion={defaultSeleccion} changeVisibility={changeModalFormVisibility} visible={modalForm}/>
                                : <></>)()
                            }                            
                        </>
                    })()
                }
        </div>
    )
}

Selecciones.propTypes = {
    doThenShowMsg: PropTypes.func,
}

export default Selecciones