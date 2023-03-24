import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import BASE_URL from '../config/config';


import {
    Button,
    Container,
    Grid,
    List,
    makeStyles,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import Task from "./Task";
import { UserContext } from "../context/UserContext";
// import { UserContext } from '../contexts/UserContext';
// import { getAllTasks } from '../api/task';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#000000",
        color: "#2196f3",
        minHeight: "100vh",
        paddingTop: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(3)
    },
    input: {
        // marginBottom: theme.spacing(2),
        backgroundColor: "#ffffff",
        borderRadius: "5px",
        width: "50%",
        marginRight: theme.spacing(1)
    },
    form: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        width: "100%"
    },
    button: {
        color: "#ffffff",
        backgroundColor: "transparent",
        border: "1px solid #ffffff",
        borderRadius: "5px",
        margin: theme.spacing(1),
        width: "50%",
        "&:hover": {
            backgroundColor: "#2196f3",
            borderColor: "#2196f3"
        }
    }
}));

const Dashboard = () => {
    const classes = useStyles();
    const [tasks, setTasks] = useState([]);
    const [update, setUpdate] = useState(false)
    const [title, setTitle] = useState('');
    const [updateTask, setUpdateTask] = useState([])
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('')
    const { user } = useContext(UserContext); 

    
    const GET_TASKS_URL = `${BASE_URL}/tasks`;
    const TOKEN = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    });

    const fetchTasks = async () => {
        try {
            const response = await axiosInstance.get(GET_TASKS_URL);
            const tasks = response.data;
            //   console.log(tasks);
            setTasks(tasks)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(GET_TASKS_URL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    dueDate: dueDate,
                }),
            });
            const data = await response.json();
            setTasks([...tasks, data]);
            setTitle('');
            setDescription('');
            setDueDate('')
        } catch (error) {
            console.error(error);
            console.log(`Bearer ${TOKEN}`)
        }

    };

    const handleDelete = async (taskId) => {
        try {
            const response = await fetch(`${GET_TASKS_URL}/${taskId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                },
            });
            if (response.ok) {
                const updatedTasks = tasks.filter(task => task._id !== taskId);
                setTasks(updatedTasks);
            } else {
                console.error(response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleEdit = (task) => {
        setUpdateTask(task);
        setUpdate(true)
        // console.log(task)
    };


    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        const updatedTaskData = {
            title: title,
            description: description,
            dueDate: dueDate,
            isCompleted: updateTask.isCompleted
        }

        try {
            const response = await fetch(`${BASE_URL}/tasks/${updateTask._id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTaskData)
            });
            const data = await response.json();
            // Update the tasks state to reflect the updated task
            setTasks(tasks.map(task => task._id === data._id ? data : task));
            setUpdate(false);
            setUpdate(false)
            setTitle('');
            setDescription('');
            setDueDate('');
        } catch (error) {
            console.error(error);
        }
    }

    const handleComplete = async (taskId) => {
        try {
            const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: true }),
            });

            if (response.ok) {
                const updatedTask = await response.json();
                const updatedTasks = tasks.map(task => task._id === taskId ? updatedTask : task);
                setTasks(updatedTasks);
            } else {
                throw new Error('Failed to update task');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        // Remove the JWT token from local storage
        localStorage.removeItem('token');
        
        // Optionally redirect the user to a login page
        window.location.href = '/';
      };

    const [filterType, setFilterType] = useState("all");

    const handleFilterAll = () => setFilterType("all");
    const handleFilterPending = () => setFilterType("pending");
    const handleFilterCompleted = () => setFilterType("completed");

    const filteredTasks = tasks.filter((task) => {
        if (filterType === "pending") return !task.completed;
        if (filterType === "completed") return task.completed;
        return true;
    });

    const numPendingTasks = tasks.filter((task) => !task.completed).length;


    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <Typography variant="body1" gutterBottom style={{ color: "red" }}>
                    You have {numPendingTasks} pending tasks!
                </Typography>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Hi, {user.name}!
                        </Typography>
                        <form className={classes.form} onSubmit={update ?handleUpdateSubmit : handleSubmit }>
                            <TextField
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={classes.input}
                                required
                            />
                            <TextField
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className={classes.input}
                                required
                            />
                            <TextField
                                label="Due Date"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className={classes.input}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                required
                            />
                            <Button type="submit" style={{ width: "28%" }} className={classes.button}>
                                {update ? 'Update' : 'Add Task'}
                            </Button>
                        </form>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button onClick={handleFilterAll} className={classes.button}>
                                All Tasks
                            </Button>
                            <Button onClick={handleFilterPending} className={classes.button}>
                                Pending Tasks
                            </Button>
                            <Button
                                onClick={handleFilterCompleted}
                                className={classes.button}
                            >
                                Completed Tasks
                            </Button>
                        </div>
                        <Typography variant="h6" component="h3" gutterBottom>
                            Your Tasks
                        </Typography>
                        <Paper className={classes.paper}>
                            <List>
                                {filteredTasks.map((task) => (
                                    <React.Fragment key={task._id}>
                                        {/* Adding tasks */}
                                        <Task
                                            task={task}
                                            handleDelete={handleDelete}
                                            handleEdit={handleEdit}
                                            handleComplete={handleComplete}
                                        />
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    style={{width:'10%',borderRadius:"50%", marginLeft:'85%',marginTop:'5%'}}
                onClick={logout}
                >
                    Logout
                </Button>
        </div>
    );
};

export default Dashboard;
