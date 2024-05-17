import React from 'react';
import logo from './logo.svg';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';
import useMediaQuery from './hooks/useMediaQuery';
import useFetch from './hooks/useFetch';
import useToggle from './hooks/useToggle';
import useDarkMode from './hooks/useDarkMode';

interface Todos {
  id: number;
  title: string;
}

function App() {
  // using useLocalStorage hook
  const [name, setName] = useLocalStorage<string>('name', 'Saurabh Sharma');

  // using useToggle hook
  const [isLightOn, toggleLight] = useToggle(false);
  
  //using useMediaQuery hook
  const isMobile = useMediaQuery('(max-width: 768px)');

  // using useDarkMode hook
  const [darkMode, setDarkMode] = useDarkMode();

  // using useFetch hook
  const {data, error, loading} = useFetch<Todos[]>('https://jsonplaceholder.typicode.com/todos');

  if (loading) {
    return <h1>Loading data...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }



  return (
    <div className="App">
      <header className="App-header">
        
        <h1>{isMobile ? 'Mobile View' : 'Desktop View'}</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <input value={name} type="text" onChange={(e) => setName(e.target.value)} />
          <p>Hello, {name}!</p>
        </div>
        <div>
          Light {isLightOn ? 'On' : 'Off'} <br/>
          <button onClick={toggleLight}>Toggle Light</button>
        </div>
        <div>
          Theme Mode: {darkMode ? "Dark" : "Light"} <br/>
          <button 
            onClick={ ()=> setDarkMode(!darkMode) }
          >Toggle Theme</button>
        </div>
        <div>
          Fetched Data: 
          <ul>
            {data?.map((todos) => (
              <li key={todos.id}>{todos.title}</li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
