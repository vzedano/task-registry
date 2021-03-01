import { useState, useEffect } from 'react'

const URL = process.env.REACT_APP_TASKS_URL

export default () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${URL}/tasks`)
      .then(response => response.json())
      .then(tasks => {
        setTasks(tasks)
      })
      .catch(err => console.log(err.message))
  }, []);

  return [tasks];
}