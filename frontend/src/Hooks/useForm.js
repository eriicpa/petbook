import { useState } from 'react';

const confirmTypes = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um e-mail válido.'
  },
}


function useForm(type) {
  const [error, setError] = useState(null);
  const [value, setValue] = useState('');

  function validate(value) {
    if(type === false) return true;

    if(!value) {
      setError('Preencha um valor neste campo!');
      return false;
    } else if(confirmTypes[type] && !confirmTypes[type].regex.test(value)) {
      setError(confirmTypes[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }


  function onChange({target}) {
    if(error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    error,
    setValue,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
  }

}

export default useForm;