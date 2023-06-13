import React, { useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from '@mui/material';
import axios from 'axios';

const submitTask = async (taskData:any) => {
  // const randomNumber = Math.floor(Math.random() * 1000000);
  // taskData['id']=randomNumber
  console.log(taskData)

  axios.post('http://localhost:3000/todos', taskData)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });

  // try {
  //   const response = await axios.post('http://localhost:3000/todos', taskData);
  //   console.log(taskData)
  //   console.log(response.data); 
  // } catch (error) {
  //   console.error(error); 
  // }
};

export const Todo = (props:any) => {
  const [task,setTask] = useState('')

  const handleSubmit = (event:any) =>{
    event.preventDefault();
    submitTask({task:task})
  }
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' className='inputtask' onChange={(e) => setTask(e.target.value)}/>
        <Button type='submit'>Add Task</Button>
      </form>
         {props.api.map((item:any) => {
            return <div className='task' key={item.id}>
                <h2 className='taskname'>{item.task}</h2>
                <CancelIcon className='cancelbtn' />
            </div>
        })}
    </div>
  )
}
