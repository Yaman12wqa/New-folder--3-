import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, loading, error, onUpdate, onDelete, onRetry }) => {
    if (loading) {
        return <div className="loading-state">Loading...</div>;
    }

    if (error) {
        return (
            <div className="error-banner">
                <p>{error}</p>
                <button type="button" className="btn-secondary" onClick={onRetry}>
                    Retry
                </button>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <h3>No tasks yet</h3>
                <p>Add your first task from the panel on the left.</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskCard
                    key={task._id}
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TaskList;
