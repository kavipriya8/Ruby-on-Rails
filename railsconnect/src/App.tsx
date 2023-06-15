import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Todo } from "./components/Todo";
import Button from "@mui/material/Button";

function App() {
  const [api, setApi] = useState([]);
  const [show, setShow] = useState(false);
  const [load,setLoad] = useState(false)

  const API_URL = "http://localhost:3000/todos";

  const submitTask = async (taskData: any) => {
    console.log(taskData);

    return axios
      .post("http://localhost:3000/todos", taskData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTask = async (taskId: any) => {
    console.log(taskId);

    return axios
      .delete(`http://localhost:3000/todos/${taskId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function visible() {
    return setShow(!show);
  }

  function getAPIData() {
    return axios.get(API_URL).then((response) => setApi(response.data));
  }

  return (
    <div className="App">
      <Button
        onClick={() => {
          getAPIData();
          visible();
          setLoad(true);
        }}
      >
        {show ? "Close Todo App" : "Open Todo App"}
      </Button>
      {load && (
        <Todo
          api={api}
          setApi={setApi}
          submitTask={submitTask}
          deleteTask={deleteTask}
        />
      )}
    </div>
  );
}

export default App;
