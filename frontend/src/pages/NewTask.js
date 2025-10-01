import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { useDispatch } from 'react-redux';
import { createTask } from '../store/taskSlice';

export default function NewTask(){
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(data){
    await dispatch(createTask(data));
    navigate('/');
  }

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mb-4">New Task</h2>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
}
