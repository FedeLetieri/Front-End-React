import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import {
  CustomCheckbox,
  CustomInput,
  CustomSelect,
} from '../../components/form/form'
import { isValidNumber } from '../../components/form/validaciones'
import '../../components/form/form.css'
import { figuritasService } from '../../services/figuritasService'

import { useState } from 'react'
import { useOnInit } from '../../customHooks/hooks'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { jugadoresService } from '../../services//jugadoresService'

export const FiguritasForm = (props) => {
  const { handleSubmit, control } = useForm()
  const [jugadores, setJugadores] = useState(null)
  const [figurita, setFigurita] = useState(null)

  const location = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()

  const onSubmit = async (figurita) => {
    if (id) { figurita.id = id }
    const jsonFigurita = JSON.stringify(figurita)
    const success = {msg: ''}

    props.doThenShowMsg(async () => {
      if (esPathAgregar()) {
        await figuritasService.agregarFigurita(jsonFigurita)
        success.msg = 'Agregada exitosamente'
      } else {
        await figuritasService.editarFigurita(jsonFigurita)
        success.msg = 'Editada exitosamente'
      }
      setTimeout(() => {
        volver()
      }, 1500)
    }, () => success.msg, '')
  }

  const obtenerJugadores = async () => {
    await props.doThenShowMsg(async () => {
      const allJugadores = await jugadoresService.obtenerJugadores()

      const listaJugadores = allJugadores.map((jugador) => ({
        value: jugador.id,
        label: jugador.nombre,
      }))

      setJugadores(listaJugadores)
    }, '', '')
  }

  const obtenerDatosfromUnaFigurita = async () => {
    if (!esPathAgregar()) {
      await props.doThenShowMsg(async () => {
        setFigurita(await figuritasService.obtenerUnaFigurita(id))
      }, '', '')
    } else setFigurita({})
  }

  const esPathAgregar = () => {
    const currentPath = location.pathname
    return currentPath == '/figuritas/agregar'
  }

  const defaultSelect = () => {
    if (esPathAgregar()) {
      const defaultOption = {
        value: '0',
        label: 'Seleccione una opcion',
      }

      const defaultJugadores = [defaultOption, ...jugadores]
      return defaultJugadores
    } else {
      const initialValueSelect = {
        value: parseInt(id, 10),
        label: figurita.nombre,
      }
      const initialJugadorList = [
        initialValueSelect,
        ...jugadores.filter(
          (elemento) => elemento.value !== initialValueSelect.value,
        ),
      ]
      return initialJugadorList
    }
  }

  const defaultValueSelectJugador = () => {
    return figurita.jugador ? figurita.jugador.id : ''
  }

  const volver = () => {
    navigate(`/figuritas`)
  }

  useOnInit(obtenerJugadores)
  useOnInit(obtenerDatosfromUnaFigurita)

  const defaultNivelSeleccion = () => {
    const nivelesDeImpresion = [
      { value: 'BAJA', label: 'BAJA' },
      { value: 'MEDIA', label: 'MEDIA' },
      { value: 'ALTA', label: 'ALTA' },
    ]

    if (esPathAgregar()) {
      const defaultOption = {
        value: '0',
        label: 'Seleccione una opcion',
      }
      return [defaultOption, ...nivelesDeImpresion]
    } else {
      const initialValueNivelDeImpresion = {
        value: figurita.nivelImpresion,
        label: figurita.nivelImpresion,
      }
      return [
        initialValueNivelDeImpresion,
        ...nivelesDeImpresion.filter(
          (elemento) => elemento.value !== initialValueNivelDeImpresion.value,
        ),
      ]
    }
  }

  const defaultValueSelectNivelImpresion = () => {
    return figurita ? figurita.nivelImpresion : ''
  }

  return figurita && jugadores ? (
    <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
      <CustomInput
        label="Nro"
        name="numero"
        type="number"
        control={control}
        step="1"
        rules={{
          required: 'El campo es requerido',
          validate: {
            validStep: (value) =>
              isValidNumber(value, 0) || 'No debe tener decimales',
          },
        }}
        defaultValue={figurita.numero}
      />
      <CustomSelect
        label="Jugador"
        name="idJugador"
        control={control}
        rules={{ required: 'El campo es requerido' }}
        options={defaultSelect()}
        defaultValue={defaultValueSelectJugador()}
      />
      <CustomCheckbox
        label="On Fire"
        name="onFire"
        control={control}
        defaultValue={figurita.onFire}
      />
      <CustomSelect
        label="Nivel De Impresion"
        name="nivelImpresion"
        control={control}
        rules={{ required: 'El campo es requerido' }}
        options={defaultNivelSeleccion()}
        defaultValue={defaultValueSelectNivelImpresion()}
      />
      {figurita.valorBase && (
        <div className="container-label-assessment">
          <p className="assessment_label">
            Valoracion Base {figurita.valorBase.toFixed(0)}
          </p>
          <p className="assessment_label">
            Valoracion Total {figurita.valorTotal.toFixed(0)}
          </p>
        </div>
      )}
      {/* ...resto del formulario... */}
      <div className="buttons-container">
        <button type="button" className="secondary-button" onClick={volver}>
          Volver
        </button>
        <button type="submit" className="primary-button">
          Guardar
        </button>
      </div>
    </form>
  ) : (
    <div>loading...</div>
  )
}

FiguritasForm.propTypes = {
  doThenShowMsg: PropTypes.func,
}
