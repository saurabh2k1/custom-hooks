# Project Custom React Hooks

## useFetch Hook
A custom React hook for fetching data from an API endpoint. This hook is designed to handle loading, error, and data states efficiently.

### Features
- Generic type support for flexible data handling
- Easy integration with any REST API
- Handles loading and error states
- Simple and reusable

### Installation
To use the useFetch hook in your project, you can copy the useFetch.ts file into your codebase.

### Usage
Here’s an example of how to use the useFetch hook in a React component:

```typescript

import React from "react";
import useFetch from "./useFetch";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const PostComponent: React.FC = () => {
    const { data, error, loading } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {data?.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
};

export default PostComponent;
```

### Example Usage with Other APIs
You can replace the API URL in the useFetch hook to fetch data from different sources. Here are a few public APIs you can use for testing:

- JSONPlaceholder: https://jsonplaceholder.typicode.com/posts
- ReqRes: https://reqres.in/api/users?page=2
- Random User Generator: https://randomuser.me/api/


## useLocalStorage Hook

The useLocalStorage hook is a custom React hook that allows you to store and retrieve data in the user's web browser using the localStorage API. It takes two parameters: key (a string that uniquely identifies the data) and defaultValue (the initial value of the data if it's not found in localStorage).

The hook returns an array containing the current value of the data and a function to update it. The setValue function updates the value of the data and also updates the localStorage with the new value.

### Features

- Stores and retrieves data in the user's web browser
- Initial value for the data
- Updates the localStorage with the new value
- Simple and reusable

### Usage

Here's an example of how to use the useLocalStorage hook:
```typescript

function MyComponent() {
    const [count, setCount] = useLocalStorage("count", 0);

    const incrementCount = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={incrementCount}>
                Click me
            </button>
        </div>
    );
}

```
In this example, the useLocalStorage hook is used to store the count of clicks on a button. Each time the button is clicked, the incrementCount function is called, which updates the count and also updates the localStorage with the new value.

## useDarkMode
This hook is used to configure dark mode for the theme. Currently it is configured for adding "dark" classname to the Body element of document for using with TailwindCSS.

### Usage
Here's an example of how to use the useDarkMode hook:

```typescript 

function App() {
   
     // using useDarkMode hook
     const [darkMode, setDarkMode] = useDarkMode();
  
     return (
       <div className="App">
       
           <div>
             Theme Mode: {darkMode ? "Dark" : "Light"} <br/>
             <button 
               onClick= {()=> setDarkMode(!darkMode)}
             >
                Toggle Theme
             </button>
           </div>
       </div>
    );
}
```

## ThemeToggleButton Component
    It is a React component called ThemeToggleButton. This component uses the useDarkMode hook to toggle the dark mode in the application. The ThemeToggleButton component renders a button that changes its appearance when the dark mode is toggled.
### Usage
    To use the ThemeToggleButton component in your application, simply import it and render it in your desired location. When the button is clicked, the dark mode will be toggled, and the application's styles will update accordingly.

    ```javascript
    import ThemeToggleButton from './components/ThemeToggleButton';

    function MyComponent() {
        return (
            <nav>
                <ThemeToggleButton />
            </nav>
        )
    }
    
    ```

## Other hooks

### useMediaQuery

### useToggle

### useDebounce

### useTitle

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

