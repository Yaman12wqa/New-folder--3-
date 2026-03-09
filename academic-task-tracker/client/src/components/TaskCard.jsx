import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle, Clock, Edit2, Play, Save, Trash2, X } from 'lucide-react';

const statusLabels = {
    pending: 'Pending',
    'in-progress': 'In progress',
    done: 'Done'
};

const typeLabels = {
    Assignment: 'Assignment',
    Project: 'Project',
    Quiz: 'Quiz',
    Exam: 'Exam'
};

const nextStatus = {
    pending: 'in-progress',
    'in-progress': 'done',
    done: 'pending'
};

const getTodayDateInput = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 10);
};

const toDateInputValue = (value) => {
    if (!value) {
        return '';
    }

    const date = new Date(value);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 10);
};

const toDateLabel = (value) => {
    if (!value) {
        return 'No due date';
    }

    return new Date(value).toLocaleDateString();
};

const startOfLocalDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const isTaskOverdue = (task) => {
    if (!task.dueDate || task.status === 'done') {
        return false;
    }

    return startOfLocalDay(new Date(task.dueDate)) < startOfLocalDay(new Date());
};

const createEditFormState = (task) => ({
    title: task.title || '',
    description: task.description || '',
    course: task.course || '',
    type: task.type || 'Assignment',
    priority: task.priority || 'medium',
    status: task.status || 'pending',
    dueDate: toDateInputValue(task.dueDate)
});

const TaskCard = ({ task, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState(() => createEditFormState(task));
    const minDate = useMemo(() => getTodayDateInput(), []);

    useEffect(() => {
        setForm(createEditFormState(task));
    }, [task]);

    const overdue = isTaskOverdue(task);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleStatusAdvance = async () => {
        setIsSubmitting(true);
        await onUpdate(task._id, { status: nextStatus[task.status] });
        setIsSubmitting(false);
    };

    const handleEditSave = async (event) => {
        event.preventDefault();
        if (!form.title.trim() || !form.course.trim()) {
            return;
        }

        const payload = {
            title: form.title.trim(),
            description: form.description.trim(),
            course: form.course.trim(),
            type: form.type,
            priority: form.priority,
            status: form.status,
            dueDate: form.dueDate || ''
        };

        setIsSubmitting(true);
        const success = await onUpdate(task._id, payload);
        setIsSubmitting(false);

        if (success) {
            setIsEditing(false);
        }
    };

    const handleDelete = () => {
        const confirmed = window.confirm('Delete this task?');
        if (confirmed) {
            onDelete(task._id);
        }
    };

    return (
        <article className={`task-card priority-${task.priority} ${overdue ? 'overdue' : ''}`}>
            <header className="task-header">
                <div>
                    <span className="task-course">{task.course}</span>
                    <h3 className="task-title">{task.title}</h3>
                </div>
                <div className="task-actions">
                    {!isEditing && task.status !== 'done' && (
                        <button
                            type="button"
                            className="btn-icon"
                            onClick={handleStatusAdvance}
                            title="Advance status"
                            disabled={isSubmitting}
                        >
                            {task.status === 'pending' ? <Play size={18} /> : <CheckCircle size={18} />}
                        </button>
                    )}

                    <button
                        type="button"
                        className="btn-icon"
                        onClick={() => setIsEditing((prev) => !prev)}
                        title={isEditing ? 'Close editor' : 'Edit task'}
                        disabled={isSubmitting}
                    >
                        {isEditing ? <X size={18} /> : <Edit2 size={18} />}
                    </button>

                    <button
                        type="button"
                        className="btn-icon delete"
                        onClick={handleDelete}
                        title="Delete task"
                        disabled={isSubmitting}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </header>

            {isEditing ? (
                <form className="task-edit-form" onSubmit={handleEditSave}>
                    <div className="form-group">
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleFormChange}
                            placeholder="Task title"
                            required
                            minLength={3}
                            maxLength={100}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            name="course"
                            value={form.course}
                            onChange={handleFormChange}
                            placeholder="Course name"
                            required
                        />
                    </div>

                    <div className="form-grid">
                        <select name="type" value={form.type} onChange={handleFormChange}>
                            <option value="Assignment">Assignment</option>
                            <option value="Project">Project</option>
                            <option value="Quiz">Quiz</option>
                            <option value="Exam">Exam</option>
                        </select>

                        <select name="priority" value={form.priority} onChange={handleFormChange}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>

                    <div className="form-grid">
                        <select name="status" value={form.status} onChange={handleFormChange}>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In progress</option>
                            <option value="done">Done</option>
                        </select>

                        <input
                            name="dueDate"
                            type="date"
                            value={form.dueDate}
                            onChange={handleFormChange}
                            min={minDate}
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleFormChange}
                            rows="3"
                            placeholder="Description"
                        />
                    </div>

                    <div className="task-edit-actions">
                        <button type="submit" className="btn-primary" disabled={isSubmitting}>
                            <Save size={16} /> Save
                        </button>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => {
                                setForm(createEditFormState(task));
                                setIsEditing(false);
                            }}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    {task.description && <p className="task-desc">{task.description}</p>}

                    <footer className="task-footer">
                        <span className={`badge badge-status ${task.status}`}>
                            {statusLabels[task.status]}
                        </span>
                        <div className="task-meta">
                            <span>{typeLabels[task.type]}</span>
                            <span className={overdue ? 'overdue-text' : ''}>
                                <Clock size={14} />
                                {toDateLabel(task.dueDate)}
                            </span>
                        </div>
                    </footer>
                </>
            )}
        </article>
    );
};

export default TaskCard;
