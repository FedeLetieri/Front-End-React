import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { CustomInput, CustomSelect } from '../../components/form/form'
import { isValidNumber } from '../../components/form/validaciones'
import '../../components/form/form.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { puntosDeVentaService } from '../../services/puntosDeVentaService'
import { Direccion, PuntoDeVenta, Ubicacion } from '../../domain/puntosDeVenta'

export const PuntoDeVentaForm = (props) => {
  const { handleSubmit, control, setValue } = useForm()
  const [puntoDeVenta, setPuntoDeVenta] = useState({})
  const location = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()

  const onSubmit = async (puntoDeVentaForm) => {
    if (id) {
      puntoDeVentaForm.id = id
    } else {
      puntoDeVentaForm.id = 0
    }

    const ubicacion = new Ubicacion(
      puntoDeVentaForm.coordenadaY,
      puntoDeVentaForm.coordenadaX,
    )

    const direccion = new Direccion(
      puntoDeVentaForm.provincia,
      puntoDeVentaForm.localidad,
      puntoDeVentaForm.calle,
      puntoDeVentaForm.numero,
      ubicacion,
    )

    const nuevoPuntoDeVenta = new PuntoDeVenta(
      puntoDeVentaForm.nombre,
      direccion,
      puntoDeVentaForm.disponibles,
      puntoDeVentaForm.tipo,
      puntoDeVentaForm.id,
    )

    const success = {msg: ''}

    await props.doThenShowMsg(async () => {
      if (esPathAgregar()) {
        await puntosDeVentaService.agregarPuntoDeVenta(nuevoPuntoDeVenta)
        success.msg = 'Agregado exitosamente'
      } else {
        await puntosDeVentaService.editarPuntoDeVenta(nuevoPuntoDeVenta)
        success.msg = 'Editado exitosamente'
      }

      setTimeout(() => {
        volver()
      }, 1500)      
    }, () => success.msg,'')
  }

  const volver = () => {
    navigate(`/puntos-de-venta`)
  }

  const esPathAgregar = () => {
    const currentPath = location.pathname
    return currentPath === '/puntos-de-venta/agregar'
  }

  useEffect(() => {
    const obtenerPuntoDeVentaPorId = async () => {
      if (!esPathAgregar()) {
        await props.doThenShowMsg(async () => {
          const response = await puntosDeVentaService.obtenerPuntoDeVentaPorId(
            id,
          )
          setPuntoDeVenta(response)

          // Actualiza los valores del formulario con React Hook Form
          setValue('nombre', response.nombre)
          setValue('provincia', response.direccion?.provincia)
          setValue('localidad', response.direccion?.localidad)
          setValue('calle', response.direccion?.calle)
          setValue('numero', response.direccion?.numero)
          setValue('coordenadaX', response.direccion?.ubicacion?.x)
          setValue('coordenadaY', response.direccion?.ubicacion?.y)
          setValue('disponibles', response.stockSobres)
          setValue('tipo', response.tipo)

          console.log(response.tipo)

          // ... actualiza otros campos según sea necesario
        }, '', 'Error desconocido')
      } else {
        setPuntoDeVenta({
          nombre: '',
          direccion: {
            provincia: '',
            localidad: '',
            calle: '',
            numero: '',
            ubicacion: {
              longitud: 0,
              latitud: 0,
            },
          },
          disponibles: 0,
          tipo: '',
        })
      }
    }

    obtenerPuntoDeVentaPorId()
  }, [id, setPuntoDeVenta, setValue])

  const tipoDeNegocio = [
    { value: '', label: 'Seleccione un tipo de negocio' },
    { value: 'Kiosco', label: 'Kiosco' },
    { value: 'Libreria', label: 'Libreria' },
    { value: 'Supermercado', label: 'Supermercado' },
  ]

  return puntoDeVenta ? (
    <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
      <CustomInput
        label="Nombre"
        name="nombre"
        type="text"
        control={control}
        rules={{ required: 'El campo es requerido' }}
        defaultValue={puntoDeVenta.nombre}
      />
      <CustomInput
        label="Provincia"
        name="provincia"
        type="text"
        control={control}
        rules={{ required: 'El campo es requerido' }}
        defaultValue={puntoDeVenta.direccion?.provincia}
      />
      <CustomInput
        label="Localidad"
        name="localidad"
        type="text"
        control={control}
        rules={{ required: 'El campo es requerido' }}
        defaultValue={puntoDeVenta.direccion?.localidad}
      />
      <CustomInput
        label="Calle"
        name="calle"
        type="text"
        control={control}
        rules={{ required: 'El campo es requerido' }}
        defaultValue={puntoDeVenta.direccion?.calle}
      />
      <CustomInput
        label="Numero"
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
        defaultValue={puntoDeVenta.direccion?.numero}
      />
      <CustomInput
        label="Coordenada X"
        name="coordenadaX"
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
        defaultValue={puntoDeVenta.direccion?.ubicacion.x}
      />
      <CustomInput
        label="Coordenada Y"
        name="coordenadaY"
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
        defaultValue={puntoDeVenta.direccion?.ubicacion.y}
      />
      <CustomInput
        label="Sobres disponibles"
        name="disponibles"
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
        defaultValue={puntoDeVenta.stockSobres}
      />
      <CustomSelect
        label="Tipo de negocio"
        name="tipo"
        control={control}
        rules={{ required: 'El campo es requerido' }}
        options={tipoDeNegocio}
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

PuntoDeVentaForm.propTypes = {
  doThenShowMsg: PropTypes.func,
}