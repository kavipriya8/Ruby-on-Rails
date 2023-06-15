import React, { useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from '@mui/material';
import axios from 'axios';

export const Todo = (props:any) => {
  const [task,setTask] = useState('')
  const [update,setUpdate] = useState(0)

  const handleSubmit = (event:any) =>{
    event.preventDefault();
    props.submitTask({todo:task})
    setUpdate(update+1)
  }

  const deleteTask = (taskId:any) => {
    props.deleteTask(taskId)
    setUpdate(update+1)
  }

  useEffect(() => {
    axios.get('http://localhost:3000/todos').then((response) => props.setApi(response.data));
  },[update])

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
