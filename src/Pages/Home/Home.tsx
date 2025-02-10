import React, { useEffect, useState } from "react";
import useUserStore from "../../Store/userStore";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Checkbox,
  List,
  ListItem,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid2";
import { Task } from "../../Components/Task/Task";
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import type { DragSourceMonitor } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

interface TaskProps {
  task: Task;
  toggleHandle: (taskId: number) => void;
  deleteHandle: (taskId: number) => void;
}

interface TaskListProps {
  title: string;
  tasks: Task[];
  toggleHandle: (taskId: number) => void;
  deleteHandle: (taskId: number) => void;
}

const TaskItem: React.FC<TaskProps> = ({ task, toggleHandle, deleteHandle}) => {
  const [{}, dragRef] = useDrag(
    () => ({
      type: 'BOX',
      item: {task},
      collect: (monitor:DragSourceMonitor) => ({
        isDragging: monitor.isDragging()
      }),
      end: ({task}) => {
        toggleHandle(task.id);
      }
    })
  );
  return (
    <div ref={dragRef}>
      <Checkbox checked={task.completed} onChange={() => toggleHandle(task.id)}/>
      <Typography style={{ textDecoration: task.completed ? "line-through" : "none", }} >
        {task.title}
      </Typography>
      <IconButton onClick={() => deleteHandle(task.id)}>
        <DeleteIcon color="error" />
      </IconButton>
    </div>
  );
};

const TaskList: React.FC<TaskListProps> = ({ title, tasks, toggleHandle, deleteHandle }) => {
  const [{canDrop}, drop] = useDrop(
    ()=>({
      accept: 'BOX',
      drop: () => ({}),
      collect: (monitor:any) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      })
    })
  ); 
  return (
    <div ref={drop}>
        <Paper elevation={3} style={{ padding: "1rem" }}>
          <Typography variant="h5">{title}</Typography>
          <List>
            {tasks.map((task: Task) => (
              <ListItem key={task.id}>
                <TaskItem task={task} toggleHandle={toggleHandle} deleteHandle={deleteHandle}/>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
  );
};

const Home: React.FC = () => {
  const { user } = useUserStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
      setTasks(response.data.splice(0, 5));
    });
    setUserName(user?.username || "");
  }, []);

  const [completedCount, setCompletedCount] = useState<number>(0);
  const [pendingCount, setPendingCount] = useState<number>(0);

  useEffect(() => {
    const completed: number = tasks.filter((task) => task.completed).length;
    const pending: number = tasks.length - completed;
    setCompletedCount(completed);
    setPendingCount(pending);
  }, [tasks]);

  const toggleHandle = (taskId: number) => {
    console.log("Toggle", taskId);
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteHandle = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleAddTask = () => {
    if (newTask) {
      const newTaskObj: Task = {
        // userId: tasks.length + 1,
        id: tasks.length + 1,
        title: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>

      <Grid container spacing={3} padding={3}>
        {/* Welcome Message */}
        <Grid size={12}>
          <Typography variant="h4">Welcome, {userName}</Typography>
        </Grid>

        {/* Task Stats */}
        <Grid container size={12} spacing={3}>
          <Grid size={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Completed Tasks</Typography>
                <Typography variant="h4" color="primary">
                  {completedCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Pending Tasks</Typography>
                <Typography variant="h4" color="error">
                  {pendingCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Task List */}
        <Grid size={6}>
          <TaskList toggleHandle={toggleHandle} deleteHandle={deleteHandle} title="Pending Tasks" tasks={tasks.filter(task => !task.completed)} />
        </Grid>
        <Grid size={6}>
          <TaskList toggleHandle={toggleHandle} deleteHandle={deleteHandle} title="Completed Tasks" tasks={tasks.filter(task => task.completed)}/>
        </Grid>
      

        {/* Add New Task */}
        <Grid xs={12}>
          <TextField
            fullWidth
            label="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            style={{ marginTop: "10px" }}
            disabled={!newTask}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>
    </DndProvider>
  );
};

export default Home;
