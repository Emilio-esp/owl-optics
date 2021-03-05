import { useState } from 'react';

const useSelect = (initialValue = 'default', selectOptions) => {
  const [options, setOptions] = useState(selectOptions);
  const [value, setValue] = useState(initialValue);

  const setValueforSelect = (option) => {
    setValue(option);
  };

  const setSelectOptions = ( options ) => {
    setOptions(options);
  }

  return [options, value, setValueforSelect, setSelectOptions];
}



export default useSelect;