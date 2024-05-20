import { useState, useEffect } from "react";

interface FormField {
    name: string;
    value: any;
    error?: string;
}

interface FormValues {
    [key: string]: any;
}

interface ValidationRule {
    (value: any): string | undefined;
}

interface FormConfig {
    initialValues: FormValues;
    validationSchema?: {
        [fieldName: string]: ValidationRule | ValidationRule[];
    }
}

const useForm = <T extends FormValues>(formConfig: FormConfig) => {
    const [fields, setFields] = useState<FormField[]>(() => 
        Object.entries(formConfig.initialValues).map(([name, value]) =>
            ({name, value})));
    const [errors, setErrors] = useState<FormValues>({} as FormValues);
    

    useEffect(() => {
        const validate = (fieldName: string, value: any) => {
            const rules = formConfig.validationSchema?.[fieldName];
            if (!rules) return;
            const errors = Array.isArray(rules)
               ? rules.map(rule => rule(value)).filter(Boolean)
                : rules(value);
            if (errors?.length) {
                setErrors((prevErrors) => ({...prevErrors, [fieldName]: errors}));
            } else {
                setErrors((prevErrors) => ({...prevErrors, [fieldName]: undefined}));
            }
        };
        fields.forEach(({name, value}) => validate(name, value));
    },[fields, formConfig.validationSchema]);

    const handleChange = (fieldName: string, value: any) => {
        setFields((prevFields) => prevFields.map((field) =>
            field.name === fieldName? {...field, value} : field));
    };

    // Get form values
    const getValues = () => {
        return fields.reduce((values, field) => ({...values, [field.name]: field.value}), {} as T);
    };

    // Reset form values
    const resetForm = () => {
        setFields((prevFields) => prevFields.map((field) => ({...field, value: formConfig.initialValues[field.name]})));
        // setErrors((prevErrors) => ({...prevErrors, [fieldName]: undefined}));
    };

    return {
        fields,
        errors,
        handleChange,
        getValues,
        resetForm,
    };

};

export default useForm;

// Usages
// ----------------------------------------------------------------
// import React from 'react';
// import useForm from './useForm';

// interface User {
//   name: string;
//   email: string;
//   age: number;
// }

// const MyForm: React.FC = () => {
//   const { fields, errors, handleChange, getValues, resetForm } = useForm<User>({
//     initialValues: {
//       name: '',
//       email: '',
//       age: 0,
//     },
//     validationSchema: {
//       name: (value: string) => (value.length < 3 ? 'Name must be at least 3 characters' : undefined),
//       email: (value: string) => (!value.includes('@') ? 'Invalid email format' : undefined),
//       age: (value: number) => (value < 18 ? 'Age must be 18 or older' : undefined),
//     },
//   });

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const user = getValues();
//     console.log('Submitted data:', user);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={fields.find((f) => f.name === 'name')?.value || ''}
//           onChange={(e) => handleChange('name', e.target.value)}
//         />
//         {errors.name && <span className="error">{errors.name}</span>}
//       </div>
//       {/* Similar input fields for email and age */}
//       <button type="submit">Submit</button>
//       <button type="button" onClick={resetForm}>
//         Reset
//       </button>
//     </form>
//   );
// };

// export default MyForm;
// ----------------------------------------------------------------