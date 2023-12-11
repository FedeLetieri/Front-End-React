import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useOnInit } from '../../customHooks/hooks'
import PropTypes from 'prop-types'
import {
  faFlag,
  faPersonWalking,
  faShirt,
  faUpDown,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BarraBusqueda } from '../../components/barraBusqueda/barraBusqueda'
import { ButtonAdd } from '../../components/buttonAdd/buttonAdd'
import { CardChica } from '../../components/cardChica/cardChica'
import { jugadoresService } from '../../services/jugadoresService'
import { NoElementMessage } from '../../components/shared/noElementMessage/noElementMessage'

export const Jugadores = (props) => {
  const [jugadores, setJugadores] = useState([])
  const navigate = useNavigate()

  const obtenerJugadores = async () => {
    try {
      const jugadores = await jugadoresService.obtenerJugadores()
      setJugadores(jugadores)
    } catch (error) {
      console.log(error)
    }
  }

  const eliminarJugador = async (jugador) => {
    await props.doThenShowMsg(async () =>{
      await jugadoresService.eliminarJugador(jugador)
      const updatedJugadores = jugadores.filter(
        (item) => item.id !== jugador.id,
      )
      setJugadores(updatedJugadores)
    },'Eliminado exitosamente','')
  }

  const obtenerJugadorByBuscador = async (filtro) => {
    await props.doThenShowMsg(async () =>{
      const jugadores = await jugadoresService.obtenerJugadores(filtro)
      setJugadores(jugadores)
    }, '', '')
  }

  const editarJugador = async (jugador) => {
    navigate(`/jugadores/editar/${jugador.id}`)
  }

  useOnInit(obtenerJugadores)

  return (
    <div className="general-container">
      <div className="container-BarraBusqueda">
        <BarraBusqueda
          buscarElemento={(filtro) => obtenerJugadorByBuscador(filtro)}
        ></BarraBusqueda>
      </div>
      <div className="CardChica-container">
        {jugadores.length === 0 ? (
          <NoElementMessage message="jugadores"></NoElementMessage>
        ) : (
          jugadores.map((jugador) => (
            <CardChica
              key={jugador.nombre}
              titulo={jugador.nombre}
              tituloInferior={'U$S'}
              valorTituloInferior={jugador.cotizacion
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              color={'white'}
              icon={faPersonWalking}
              taglist={[
                {
                  icon: null,
                  texto: jugador.nacimiento,
                },
                {
                  icon: (
                    <FontAwesomeIcon
                      icon={faShirt}
                      style={{ color: 'var(--color-primario)' }}
                    />
                  ),
                  texto: jugador.casaca,
                },
                {
                  icon: (
                    <FontAwesomeIcon
                      icon={faFlag}
                      style={{ color: 'var(--color-primario-oscuro)' }}
                    />
                  ),
                  texto: jugador.seleccion,
                },
                {
                  icon: null,
                  texto: jugador.posicion,
                },
                {
                  icon: (
                    <FontAwesomeIcon
                      icon={faUpDown}
                      style={{ color: 'var(--color-primario-oscuro)' }}
                    />
                  ),
                  texto: `${jugador.altura} m`,
                },
                {
                  icon: (
                    <FontAwesomeIcon
                      icon={faWeightScale}
                      style={{ color: 'var(--color-primario)' }}
                    />
                  ),
                  texto: `${jugador.peso} kg`,
                },
              ]}
              eliminarElemento={() => eliminarJugador(jugador)}
              editarElemento={() => editarJugador(jugador)}
            ></CardChica>
          ))
        )}
      </div>
      <ButtonAdd path="/jugadores/agregar"></ButtonAdd>
    </div>
  )
}

Jugadores.propTypes = {
  doThenShowMsg: PropTypes.func,
}
