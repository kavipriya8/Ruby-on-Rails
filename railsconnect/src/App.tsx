import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Todo } from './components/Todo';
import Button from '@mui/material/Button';

const API_URL = "http://localhost:3000/todos";

function App() {
  const [api,setApi] = useState([]);
  const [show,setShow] = useState(false)

  function visible(){
    return setShow(!show)
  }

  function getAPIData(){
    return axios.get(API_URL).then((response) => response.data)
  }

  return (
    <div className="App">
      <Button onClick={() => {getAPIData().then((items) => setApi(items));
        visible(); }}>{show?"Close Todo App":"Open Todo App"}</Button>
      {show && <Todo api={api}/>}
    </div>
  );
}

export default App;
