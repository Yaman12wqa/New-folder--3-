import React, { useMemo, useState } from 'react';

const getTodayDateInput = () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 10);
};

const initialFormState = {
    title: '',
    description: '',
    course: '',
    type: 'Assignment',
    priority: 'medium',
    dueDate: ''
};

const TaskForm = ({ onSubmit }) => {
    const [form, setForm] = useState(initialFormState);
    const minDate = useMemo(() => getTodayDateInput(), []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!form.title.trim() || !form.course.trim()) {
            return;
        }

        const submitData = {
            ...form,
            title: form.title.trim(),
            course: form.course.trim()
        };

        if (!submitData.dueDate) {
            delete submitData.dueDate;
        }

        const isSuccess = await onSubmit(submitData);
        if (isSuccess) {
            setForm(initialFormState);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="panel-card">
            <h2>Add Task</h2>

            <div className="form-group">
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Task title *"
                    required
                    minLength={3}
                    maxLength={100}
                />
            </div>

            <div className="form-group">
                <input
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    placeholder="Course name *"
                    required
                />
            </div>

            <div className="form-group form-grid">
                <select name="type" value={form.type} onChange={handleChange}>
                    <option value="Assignment">Assignment</option>
                    <option value="Project">Project</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Exam">Exam</option>
                </select>

                <select name="priority" value={form.priority} onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                </select>
            </div>

            <div className="form-group">
                <label className="input-label">Due date</label>
                <input
                    name="dueDate"
                    type="date"
                    value={form.dueDate}
                    onChange={handleChange}
                    min={minDate}
                />
            </div>

            <div className="form-group">
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description (optional)"
                    rows="3"
                />
            </div>

            <button type="submit" className="btn-primary btn-block">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
