import React from 'react';
import { Clock } from 'lucide-react';

const startOfLocalDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const getDueLabel = (dueDate) => {
    const today = startOfLocalDay(new Date());
    const due = startOfLocalDay(new Date(dueDate));
    const days = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (days === 0) {
        return 'Today';
    }
    if (days === 1) {
        return 'Tomorrow';
    }
    return `In ${days} days`;
};

const UpcomingDeadlines = ({ tasks }) => {
    const today = startOfLocalDay(new Date());

    const upcoming = tasks
        .filter((task) => task.status !== 'done' && task.dueDate && startOfLocalDay(new Date(task.dueDate)) >= today)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5);

    const overdueCount = tasks.filter(
        (task) => task.status !== 'done' && task.dueDate && startOfLocalDay(new Date(task.dueDate)) < today
    ).length;

    return (
        <div className="panel-card">
            <div className="panel-header">
                <h2>Upcoming</h2>
                {overdueCount > 0 && <span className="pill-alert">{overdueCount} overdue</span>}
            </div>

            {upcoming.length === 0 ? (
                <p className="muted-text">No upcoming deadlines.</p>
            ) : (
                <div className="upcoming-list">
                    {upcoming.map((task) => (
                        <div key={task._id} className="upcoming-item">
                            <span className="upcoming-title">{task.title}</span>
                            <span className="upcoming-date">
                                <Clock size={12} />
                                {new Date(task.dueDate).toLocaleDateString()} ({getDueLabel(task.dueDate)})
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UpcomingDeadlines;
