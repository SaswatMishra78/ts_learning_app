import React, { useEffect, useState } from "react";

interface Task {
    id: number,
    task_name: string,
    iscompleted: boolean, 
}

const Home: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Task>();
    const username: string = "Chandra Shekhar";
    useEffect(() => {
        setTasks([
            {
                "id": 1,
                "task_name": "delectus aut autem",
                "iscompleted": false
              },
              {
                "id": 2,
                "task_name": "quis ut nam facilis et officia qui",
                "iscompleted": false
              },
              {
                "id": 3,
                "task_name": "fugiat veniam minus",
                "iscompleted": false
              },
              {
                "id": 4,
                "task_name": "et porro tempora",
                "iscompleted": true
              },
              {
                "id": 5,
                "task_name": "laboriosam mollitia et enim quasi adipisci quia provident illum",
                "iscompleted": true
              },
            
        ]);
      }, []);
    const [completedCount, setCompletedCount] = useState<number>(0);
    const [pendingCount, setPendingCount] = useState<number>(0);
    useEffect(()=> {
        const completed:number = tasks.filter(task=>task.iscompleted).length;
        const pending:number = tasks.length-completed;
        setCompletedCount(completed);
        setPendingCount(pending);
    },[tasks]);
    const togglehandle = (taskId:number) => {
        setTasks(tasks.map(task=> task.id===taskId ? {...task,iscompleted: !(task.iscompleted)} : task))
    };
    const deletehandle = (taskId:number) => {
        setTasks(tasks.filter(task=> task.id!==taskId ))
    };
    const handleAddTask = (newTask: string) => {
        if (newTask) {
          const newTaskObj:Task = {
            id: tasks.length + 1,
            task_name: newTask,
            iscompleted: false,
          };
          setTasks([...tasks, newTaskObj]);
          setNewTask('');
        }
      };
    return(
        <div>
      <h1 data-testid="welcome">Welcome, {username}</h1>
      <div>
        <h3 data-testid="task-stats">Task Stats</h3>
        <p data-testid="completed">Completed: {completedCount}</p>
        <p data-testid="pending">Pending: {pendingCount}</p>
      </div>
      <div>
        <h3 data-testid="task-list">Task List</h3>
        {tasks.map((task) => (
          <div key={task.id}>
            <span>{task.task_name}</span>
            <input
              type="radio"
              checked={task.iscompleted}
              onChange={()=>togglehandle(task.id)}
            />
            <button onClick={()=>deletehandle(task.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
    );
};
export default Home;