import React, { useState, useEffect } from 'react';
import { Button, Card, Collapse } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import MathJax from 'react-mathjax2';
import api from '../../../api/api';
import './TaskView.css';

function TaskView() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [editedTasks, setEditedTasks] = useState(new Set());

    useEffect(() => {
        getTask(id);
    }, [id]);

    const getTask = async (id) => {
        setIsLoading(true);
        try {
            const data = await api.tasks.getTask(id);
            setTask(data);
            setIsLoading(false);
        } catch (error) {
            setTask(null);
            setIsLoading(false);
        }
    };

    const toggleSection = (id) => {
        if (editedTasks.has(id)) {
            editedTasks.delete(id);
        } else {
            editedTasks.add(id);
        }
        setEditedTasks(new Set(editedTasks));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!task) {
        return <div>No task found</div>;
    }

    return (
        <div className="taskContainer">
            {/* Sidebar and sections code goes here */}
        </div>
    );
}

export default TaskView;