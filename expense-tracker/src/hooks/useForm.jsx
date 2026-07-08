import React, { useState } from 'react'

function useForm(formState) {
    const [inputValue, setInputValue] = useState(formState);
    const handleInputChange = (e)=>{
      const {name, value} = e.target;
      setInputValue({
        ...inputValue,
        [name]:value
      });
    };
    const resetForm =()=>{
        setInputValue(formState);
    }
    
    return{
        inputValue,
        handleInputChange,
        resetForm,
    }

}

export default useForm
