import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowAssignments = () => {
    const [tasks, setTasks] = useState([]);

    function daysTillDue(dueDate) {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const handleDelete = async (task) => {
        console.log(`taskId ${task}`)
        try {
            const response = await axios.post("/delete-task", { task: task });
            console.log('Response from server:', response.data);
            window.location.reload(); // cheating
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    }

    const handleCompleteChange = async (task, complete) => {
        console.log(`complete ${complete}`)
        console.log(`taskId ${task}`)
        console.log(tasks)
        complete = complete === "on" ? "off" : "on";

        try {
            const response = await axios.post("/update-task", { task: task, complete: complete });
            console.log('Response from server:', response.data);
            window.location.reload(); // cheating
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    }

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await axios.get('/tasks');
                console.log('Fetching tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }

        fetchTasks();
    }, []);

    return (
        <>
            <h2 className="mt-5">Total List of Assignments:</h2>
            <table className="table table-striped mt-3">
                <thead>
                <tr>
                    <th>Complete? (edits)</th>
                    <th>Days Till Due</th>
                    <th>Task</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Press to Delete</th>
                </tr>
                </thead>
                <tbody id="completedTasksBody">
                {tasks.map(task => (
                    <tr key={task._id}>
                        <td>
                            <input
                                type="checkbox"
                                name={`complete-${task.task}`}
                                checked={1? task.complete === "on" : 0}
                                onChange={() => handleCompleteChange(task.task, task.complete)}
                            />
                        </td>
                        <td>{daysTillDue(task.dueDate)}</td>
                        <td>{task.task}</td>
                        <td>{task.priority}</td>
                        <td>{task.dueDate.split('T')[0]}</td>
                        <td>
                            <button onClick={() => handleDelete(task.task)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default ShowAssignments;