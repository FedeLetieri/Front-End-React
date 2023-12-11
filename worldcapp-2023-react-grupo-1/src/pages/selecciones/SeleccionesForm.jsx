import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useOnInit } from '../../customHooks/hooks'

import './Selecciones.css'
import { CustomInput, CustomSelect } from '../../components/form/form'
import { isValidNumber } from '../../components/form/validaciones'
import { useState } from 'react'
import { seleccionesService } from '../../services/seleccionesService'

export const SeleccionesForm = (props) => {
  const [confeds, setConfeds] = useState([])
  const { handleSubmit, control } = useForm()
  const [defaultSeleccion] = useState(props.defaultSeleccion)

  const onSubmit = async (seleccion) => {
    const success = {msg: ''}
    await props.doThenShowMsg(async () => {
      if (defaultSeleccion != null) {
        const seleccionData = JSON.parse(JSON.stringify(seleccion))
        seleccionData.id = defaultSeleccion.id
        await seleccionesService.putSeleccion(JSON.stringify(seleccionData))
        success.msg = 'Selección editada exitosamente'
      } else {
        await seleccionesService.createSeleccion(JSON.stringify(seleccion))
        success.msg = 'Selección creada exitosamente'
      }
    }, () => success.msg, '')

    goToMainView()
  }

  useOnInit(async () => {
    const confedsList = await seleccionesService.getConfederaciones()
    setConfeds([
      { value: '', label: 'Elija una confederación' },
      ...confedsList.map((confed) => {
        return { value: confed.pais, label: confed.pais }
      }),
    ])
  })

  const goToMainView = () => {
    props.changeVisibility()
    props.changeSeleccion(null)
  }

  return (
    <div className={`selecciones-form__wrapper`}>
      <span className="selecciones-form__bg"></span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="selecciones-form"
        noValidate
      >
        <h1>Nueva Seleccion</h1>
        <CustomInput
          label="Nombre"
          name="pais"
          type="text"
          control={control}
          rules={{ required: 'El campo es requerido' }}
          defaultValue={defaultSeleccion ? props.defaultSeleccion.pais : ''}
        />
        <CustomSelect
          label="Confederación"
          name="confederacion"
          control={control}
          rules={{ required: 'El campo es requerido' }}
          options={confeds}
          defaultValue={
            defaultSeleccion ? props.defaultSeleccion.confederacion : null
          }
        />
        <CustomInput
          label="Copas del Mundo"
          name="copasDelMundo"
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
          defaultValue={
            defaultSeleccion ? props.defaultSeleccion.copasDelMundo : ''
          }
        />

        <div className="buttons-container">
          <button
            onClick={() => {
              goToMainView()
            }}
            type="button"
            className="secondary-button"
          >
            Cancelar
          </button>
          <button type="submit" className="primary-button">
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}

SeleccionesForm.propTypes = {
  visible: PropTypes.bool,
  changeVisibility: PropTypes.func,
  defaultSeleccion: PropTypes.object,
  changeSeleccion: PropTypes.func,
  doThenShowMsg: PropTypes.func
}

export default SeleccionesForm
