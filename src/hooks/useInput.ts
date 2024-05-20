import { useState, useEffect } from "react";

interface UseInputConfig<T> {
    initialValue?: T;
    validationRule?: (value: T) => string | undefined;
}

const useInput = <T>(config: UseInputConfig<T> = {}) => {
    const [value, setValue] = useState<T>(config.initialValue || ({} as T));
    const [error, setError] = useState<string | undefined>(config.validationRule? config.validationRule(value) : undefined);

    useEffect(() => {
        setError(config.validationRule? config.validationRule(value) : undefined);
    }, [value, config.validationRule]);

    const handleChange = (newValue: T) => {
        setValue(newValue);
    };

    return {
        value,
        handleChange,
        error,
    };
};

export default useInput;

//Usage example
//----------------------------------------------------------------
// import React from 'react';
// import useInput from './useInput';

// const MyInput: React.FC = () => {
//   const { value, error, handleChange } = useInput<string>({
//     initialValue: 'Initial Value',
//     validationRule: (value) => (value.length < 5 ? 'Must be at least 5 characters' : undefined),
//   });

//   return (
//     <div>
//       <input type="text" value={value} onChange={(e) => handleChange(e.target.value)} />
//       {error && <span className="error">{error}</span>}
//     </div>
//   );
// };

// export default MyInput;
//----------------------------------------------------------------
