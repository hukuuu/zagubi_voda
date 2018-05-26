import React from 'react'

const re = /^-?\d+\.?\d*$/
const couldBeNumber = string =>
  string === '-' || string === '' || re.test(string)

const NumberInput = ({ value, onChange, ...rest }) => (
  <input
    type="text"
    value={value}
    onChange={e => {
      console.log(e.target.value, couldBeNumber(e.target.value))
      if (couldBeNumber(e.target.value)) {
        onChange && onChange(e.target.value)
      }
    }}
    {...rest}
  />
)

export default NumberInput
