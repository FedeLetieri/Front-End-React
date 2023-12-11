import { Controller } from 'react-hook-form'
import './form.css'
import '../../assets/css/generic/input.css'
import PropTypes from 'prop-types'

export const CustomInput = ({
  label,
  type,
  control,
  name,
  rules,
  defaultValue,
  step
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? ''}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="form__container-information">
          <label className="primary_label primary_label-default">{label}</label>
          <input
            className={`form-container__input primary-input animation-input${
              fieldState.error ? ' primary-input-error' : ''
            }`}
            type={type}
            autoComplete="off"
            {...field}
            step={type === 'number' ? step : undefined}
          />
          {fieldState.error && (
            <p className="form_error">* {fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  )
}

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object.isRequired,
  step: PropTypes.string
}

export const CustomSelect = ({
  label,
  options,
  control,
  name,
  rules,
  defaultValue,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue ?? ''}
      render={({ field, fieldState }) => (
        <div className="form__container-information">
          <label className="primary_label primary_label-default">{label}</label>
          <select
            className={`form-container__input primary-input animation-input${
              fieldState.error ? ' primary-input-error' : ''
            }`}
            {...field}
          >
            {options.map((option) => (
              <option
                className="option_container"
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          {fieldState.error && (
            <p className="form_error">* {fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  )
}

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export const CustomCheckbox = ({ label, control, name, defaultValue }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ?? ''}
      render={({ field }) => (
        <div className="checkbox-container">
          <div className="center--flex">
            <span className="checkbox__radio-btn">
              <input
                type="checkbox"
                {...field}
                value={field.value}
                checked={field.value}
              />
              <span className="checkbox__checkmark"></span>
            </span>
          </div>
          <label className="checkbox__input-label ">{label}</label>
        </div>
      )}
    />
  )
}

CustomCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.bool,
}