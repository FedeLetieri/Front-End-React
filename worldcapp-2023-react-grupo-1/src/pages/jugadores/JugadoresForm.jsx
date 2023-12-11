import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useOnInit } from '../../customHooks/hooks'
import PropTypes from 'prop-types'
import {
  CustomCheckbox,
  CustomInput,
  CustomSelect,
} from '../../components/form/form'
import { isValidNumber, isValidDate } from '../../components/form/validaciones'
import './Jugadores.css'
import '../../components/form/form.css'
import { jugadoresService } from '../../services/jugadoresService'
import { seleccionesService } from '../../services/seleccionesService'

export const JugadoresForm = (props) => {
  const { handleSubmit, control, register, getValues } = useForm()
  const [jugador, setJugador] = useState(null)
  const [seleccionesOptions, setSeleccionesOptions] = useState([])
  const navigate = useNavigate()
  const { id } = useParams()

  const onSubmit = async (data) => {
    const jsonData = JSON.stringify(data)
    const success = {msg: ''}

    await props.doThenShowMsg(async () => {
     if (esPathAgregar()) {
        await jugadoresService.agregarJugador(jsonData)
        success.msg = 'Agregado exitosamente'
      } else {
        await jugadoresService.editarJugador(jsonData, id)
        success.msg = 'Editado exitosamente'
      }

      setTimeout(() => {
        volver()
      }, 1500)
    }, () => success.msg, '')
  }

  const obtenerData = async () => {
    if (!esPathAgregar()) {
      await props.doThenShowMsg(async () => {
        setJugador(await jugadoresService.obtenerJugador(id))
      }, '', '')
    } else setJugador({})
  }

  const esPathAgregar = () => {
    const currentPath = location.pathname
    return currentPath == '/jugadores/agregar'
  }

  const defaultSelectSeleccion = () => {
    return jugador ? jugador.seleccion : ''
  }

  const defaultSelectPosicion = () => {
    return jugador ? jugador.posicion : ''
  }

  const volver = () => {
    navigate(`/jugadores`)
  }

  const obtenerSelecciones = async () => {
    try {
      const selecciones = await seleccionesService.getSelecciones('')
      const options = selecciones.map((seleccion) => ({
        value: seleccion.pais,
        label: seleccion.pais,
      }))
      options.unshift({ value: '', label: 'Elija una selección' })
      setSeleccionesOptions(options)
    } catch (error) {
      console.error('ERROR:', error)
    }
  }

  useOnInit(obtenerData)
  useOnInit(obtenerSelecciones)

  const optionsPosicion = [
    { value: '', label: 'Elija una posición ' },
    { value: 'Delantero', label: 'Delantero' },
    { value: 'MedioCampo', label: 'Mediocampo' },
    { value: 'Defensa', label: 'Defensor' },
    { value: 'Arquero', label: 'Arquero' },
  ]

  const validateDebut = (value) => {
    const yearOfBirth = parseInt(getValues('nacimiento')?.split('-')[0])
    return (
      value > yearOfBirth ||
      'El año de debut debe ser mayor al año de nacimiento'
    )
  }

  return jugador ? (
    <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
      <input
        type="hidden"
        {...register('id')}
        value={jugador ? jugador.id : 0}
      />
      <CustomInput
        label="Nombre"
        name="nombre"
        type="text"
        control={control}
        rules={{ required: 'El campo es requerido' }}
        defaultValue={
          jugador.nombre != undefined ? jugador.nombre.split(' ')[0] : ''
        }
      />
      <CustomInput
        label="Apellido"
        name="apellido"
        type="text"
        control={control}
        rules={{ required: 'El campo es requerido' }}
        defaultValue={
          jugador.nombre != undefined ? jugador.nombre.split(' ')[1] : ''
        }
      />
      <CustomInput
        label="Fecha de nacimiento"
        name="nacimiento"
        type="date"
        control={control}
        rules={{
          required: 'El campo es requerido',
          validate: (value) => isValidDate(value) || 'Fecha inválida',
        }}
        defaultValue={jugador.nacimiento}
      />
      <CustomInput
        label="Altura"
        name="altura"
        type="number"
        control={control}
        step="0.01"
        rules={{
          required: 'El campo es requerido',
          validate: {
            validStep: (value) =>
              isValidNumber(value, 2) || 'Los decimales máximos son 2',
          },
        }}
        defaultValue={jugador.altura}
      />
      <CustomInput
        label="Peso"
        name="peso"
        type="number"
        control={control}
        step="0.01"
        rules={{
          required: 'El campo es requerido',
          validate: {
            validStep: (value) =>
              isValidNumber(value, 2) || 'Los decimales máximos son 2',
          },
        }}
        defaultValue={jugador.peso}
      />
      <CustomInput
        label="N° Camiseta"
        name="camiseta"
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
        defaultValue={jugador.casaca}
      />
      <CustomSelect
        label="Selección"
        name="seleccion"
        control={control}
        rules={{ required: 'El campo es requerido' }}
        options={seleccionesOptions}
        defaultValue={defaultSelectSeleccion()}
      />
      <CustomInput
        label="Año debut"
        name="debut"
        type="number"
        control={control}
        step="1"
        rules={{
          required: 'El campo es requerido',
          validate: {
            validStep: (value) =>
              isValidNumber(value, 0) || 'No debe tener decimales',
            debutGreaterThanBirth: validateDebut,
          },
        }}
        defaultValue={jugador.debut}
      />
      <CustomSelect
        label="Posición"
        name="posicion"
        control={control}
        rules={{ required: 'El campo es requerido' }}
        options={optionsPosicion}
        defaultValue={defaultSelectPosicion()}
      />
      <CustomCheckbox
        label="Es líder"
        name="lider"
        control={control}
        defaultValue={false || jugador.esLider}
      />
      <CustomInput
        label="Cotización"
        name="cotizacion"
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
        defaultValue={jugador.cotizacion}
      />
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

JugadoresForm.propTypes = {
  doThenShowMsg: PropTypes.func,
}
