import React from 'react';

const startOfLocalDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const DashboardStats = ({ tasks }) => {
    const today = startOfLocalDay(new Date());

    const summary = tasks.reduce((acc, task) => {
        acc.total += 1;

        if (task.status === 'done') {
            acc.completed += 1;
        } else if (task.status === 'in-progress') {
            acc.inProgress += 1;
        } else {
            acc.pending += 1;
        }

        if (task.dueDate) {
            const due = startOfLocalDay(new Date(task.dueDate));

            if (due.getTime() === today.getTime()) {
                acc.dueToday += 1;
            }

            if (task.status !== 'done' && due < today) {
                acc.overdue += 1;
            }
        }

        return acc;
    }, {
        total: 0,
        completed: 0,
        inProgress: 0,
        pending: 0,
        dueToday: 0,
        overdue: 0
    });

    return (
        <section className="dashboard-stats">
            <div className="stat-card">
                <span className="stat-value">{summary.total}</span>
                <span className="stat-label">Total</span>
            </div>
            <div className="stat-card">
                <span className="stat-value" style={{ color: 'var(--primary)' }}>{summary.dueToday}</span>
                <span className="stat-label">Due Today</span>
            </div>
            <div className="stat-card">
                <span className="stat-value" style={{ color: 'var(--status-progress)' }}>{summary.inProgress}</span>
                <span className="stat-label">In Progress</span>
            </div>
            <div className="stat-card">
                <span className="stat-value" style={{ color: 'var(--status-done)' }}>{summary.completed}</span>
                <span className="stat-label">Completed</span>
            </div>
            <div className="stat-card">
                <span className="stat-value" style={{ color: 'var(--status-pending)' }}>{summary.pending}</span>
                <span className="stat-label">Pending</span>
            </div>
            <div className="stat-card">
                <span className="stat-value" style={{ color: summary.overdue > 0 ? 'var(--priority-urgent)' : 'var(--text-muted)' }}>
                    {summary.overdue}
                </span>
                <span className="stat-label">Overdue</span>
            </div>
        </section>
    );
};

export default DashboardStats;
