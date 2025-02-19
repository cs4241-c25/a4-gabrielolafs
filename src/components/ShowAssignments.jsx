import React, { useEffect, useState } from 'react';
import axiosInstance from "../axiosConfig";

const ShowAssignments = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await axiosInstance.get('/tasks');
                console.log('Fetching tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }

        fetchTasks();
    }, []); // Empty dependency array ensures this runs on load

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
                </tr>
                </thead>
                <tbody id="completedTasksBody">
                {tasks.map(task => (
                    <tr key={task._id}>
                        <td>{task.complete ? 'Yes' : 'No'}</td>
                        <td>{task.daysTillDue}</td>
                        <td>{task.task}</td>
                        <td>{task.priority}</td>
                        <td>{task.dueDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default ShowAssignments;