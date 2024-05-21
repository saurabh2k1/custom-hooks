import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';
import useMediaQuery from './hooks/useMediaQuery';
import useFetch from './hooks/useFetch';
import useToggle from './hooks/useToggle';

import ThemeToggleButton from './components/ThemeToggleButton';

import Dropdown from './components/Dropdown';
import Pagination from './components/Pagination';

import Spinner from './components/Spinner';


interface Todos {
  id: number;
  title: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  // using useLocalStorage hook
  const [name, setName] = useLocalStorage<string>('name', 'Saurabh Sharma');

  // using useToggle hook
  const [isLightOn, toggleLight] = useToggle(false);
  
  //using useMediaQuery hook
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(undefined);

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    // ... more countries
  ];
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };



  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
      // ... your data fetching logic
      const fetchedUsers = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Charlie', email: 'charlie@example.com' },
        // ... more users
      ];
      setUsers(fetchedUsers);
    };

    fetchData();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const displayedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // using useFetch hook
  const {data, error, loading} = useFetch<Todos[]>('https://jsonplaceholder.typicode.com/todos');

  if (loading) {
    return <h1>Loading data...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }



  return (
    <div className="App dark:bg-slate-900 bg-slate-100 text-gray-900 dark:text-gray-50 "  
      
    >
      <header className=" flex flex-col items-center justify-center text-gray-900 dark:text-white ">
        <ThemeToggleButton />
        
        <h1 className='text-3xl font-bold underline text-gray-900 dark:text-gray-50'>{isMobile ? 'Mobile View' : 'Desktop View'}</h1>
        <div className=' bg-indigo-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100' >
        <img src={logo} className="App-logo" alt="logo" />
        </div>
        
        <Spinner size={12}  />
        <div >
          <input value={name} type="text" onChange={(e) => setName(e.target.value)} />
          <p>Hello, {name}!</p>
        </div>
        <div className='w-full'>
          Light {isLightOn ? 'On' : 'Off'} <br/>
          <button onClick={toggleLight}>Toggle Light</button>
        </div>
        
        <Dropdown 
          options={countries} 
          selectedValue={selectedCountry}
          onChange={handleCountryChange}
          placeholder='Select country'
        />
<table className='table'>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
          {displayedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
</table>


        <Pagination itemsPerPage={itemsPerPage} data={users} onChangePage={handlePageChange} />
        {/* <div>
          Fetched Data: 
          <ul>
            {data?.map((todos) => (
              <li key={todos.id}>{todos.title}</li>
            ))}
          </ul>
        </div> */}
      </header>
    </div>
  );
}

export default App;
