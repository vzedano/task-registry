import React from 'react';
import fetchTasks from './../../components/fetchTasks';

export default (WrappedComponent) => {
  return (props) => {
    const [tasks] = fetchTasks()
    return <WrappedComponent tasks={tasks} />
  }
}