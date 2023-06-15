import React, { useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from '@mui/material';
import axios from 'axios';

const submitTask = async (taskData:any) => {
  console.log(taskData)

  axios.post('http://localhost:3000/todos', taskData)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
};

const deleteTask = async (taskId:any) => {
  console.log(taskId)

  axios.delete(`http://localhost:3000/todos/${taskId}`)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });  
};

export const Todo = (props:any) => {
  const [task,setTask] = useState('')

  const handleSubmit = (event:any) =>{
    event.preventDefault();
    submitTask({todo:task})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' className='inputtask' onChange={(e) => setTask(e.target.value)}/>
        <Button type='submit'>Add Task</Button>
      </form>
         {props.api.map((item:any) => {
            return <div className='task' key={item.id}>
                <h2 className='taskname'>{item.todo}</h2>
                <CancelIcon className='cancelbtn' onClick={() => deleteTask(item.id) }/>
            </div>
        })}
    </div>
  )
}
