import { useState } from "react";

const useInput = ( inialValue ) => {
    const [value, setvalue] = useState(inialValue);
    const [error, setError] = useState(null);

    const updateInputValue = ( e ) => {
        const newInputValue = e.target.value;
        setvalue(newInputValue);
    }

    

    return [value, updateInputValue, error, setError];

}


export default useInput;