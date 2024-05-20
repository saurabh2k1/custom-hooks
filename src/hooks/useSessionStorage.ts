import { useState, useEffect } from "react";

const useSessionStorage = <T>(key: string, initialValue: T): [T, (newValue: T) => void] => {
    const [value, setValue] = useState<T>(() => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue? JSON.parse(storedValue) as T : initialValue;
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useSessionStorage;

// Usage 
// ----------------------------------------------------------------
// import React from 'react';
// import useSessionStorage from './useSessionStorage';

// const MyComponent: React.FC = () => {
//   // Store a user's name in session storage
//   const [userName, setUserName] = useSessionStorage('userName', 'Guest');

//   return (
//     <div>
//       <h1>Welcome, {userName}!</h1>
//       <input
//         type="text"
//         value={userName}
//         onChange={(e) => setUserName(e.target.value)}
//       />
//     </div>
//   );
// };

// export default MyComponent;
//----------------------------------------------------------------
