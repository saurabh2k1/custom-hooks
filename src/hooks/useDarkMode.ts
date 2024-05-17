import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import useMediaQuery from "./useMediaQuery";

// hook for setting the dark mode 
const useDarkMode = () => {
    const browserDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", browserDarkMode);

    useEffect(() =>{
        const element = window.document.body;
        if (darkMode) {
            element.classList.add("dark");
        } else {
            element.classList.remove("dark");
        }
    }, [darkMode]);

    return [darkMode, setDarkMode] as const;
}

export default useDarkMode;

// Usage 

// function App() {
   
//     // using useDarkMode hook
//     const [darkMode, setDarkMode] = useDarkMode();
    
//     return (
//       <div className="App">
        
//           <div>
//             Theme Mode: {darkMode ? "Dark" : "Light"} <br/>
//             <button 
//               onClick={ ()=> setDarkMode(!darkMode) }
//             >Toggle Theme</button>
//           </div>
         
//       </div>
//     );
//   }