import React from 'react';

const defaultFilters = {
    status: '',
    priority: '',
    course: '',
    type: '',
    search: '',
    sort: '-createdAt'
};

const FilterBar = ({ filters, onFilterChange }) => {
    return (
        <div className="panel-card">
            <div className="panel-header">
                <h2>Filters</h2>
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => onFilterChange(defaultFilters)}
                >
                    Reset
                </button>
            </div>

            <div className="form-grid">
                <input
                    type="text"
                    placeholder="Search title, course, or description..."
                    value={filters.search}
                    onChange={(event) => onFilterChange({ ...filters, search: event.target.value })}
                    className="span-2"
                />

                <select
                    value={filters.status}
                    onChange={(event) => onFilterChange({ ...filters, status: event.target.value })}
                >
                    <option value="">All statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In progress</option>
                    <option value="done">Done</option>
                </select>

                <select
                    value={filters.type}
                    onChange={(event) => onFilterChange({ ...filters, type: event.target.value })}
                >
                    <option value="">All types</option>
                    <option value="Assignment">Assignment</option>
                    <option value="Project">Project</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Exam">Exam</option>
                </select>

                <select
                    value={filters.priority}
                    onChange={(event) => onFilterChange({ ...filters, priority: event.target.value })}
                >
                    <option value="">All priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                </select>

                <input
                    type="text"
                    placeholder="Filter by course..."
                    value={filters.course}
                    onChange={(event) => onFilterChange({ ...filters, course: event.target.value })}
                />

                <select
                    value={filters.sort}
                    onChange={(event) => onFilterChange({ ...filters, sort: event.target.value })}
                    className="span-2"
                >
                    <option value="-createdAt">Newest first</option>
                    <option value="createdAt">Oldest first</option>
                    <option value="dueDate">Closest due date</option>
                    <option value="-dueDate">Latest due date</option>
                    <option value="priority_desc">Highest priority</option>
                    <option value="priority_asc">Lowest priority</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
