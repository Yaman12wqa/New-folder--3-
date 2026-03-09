import React, { useCallback, useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './services/api';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import DashboardStats from './components/DashboardStats';
import StudyNotes from './components/StudyNotes';
import UpcomingDeadlines from './components/UpcomingDeadlines';

const getApiErrorMessage = (error, fallbackMessage) => {
  const details = error?.response?.data?.details;
  if (Array.isArray(details) && details.length > 0) {
    return details.map((item) => item.message).join(' | ');
  }

  return error?.response?.data?.error || fallbackMessage;
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    course: '',
    type: '',
    search: '',
    sort: '-createdAt'
  });

  const loadTasks = useCallback(async ({ withLoading = true } = {}) => {
    if (withLoading) {
      setLoading(true);
    }

    try {
      const response = await fetchTasks(filters);
      setTasks(response.data);
      setError(null);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Failed to load tasks'));
    } finally {
      if (withLoading) {
        setLoading(false);
      }
    }
  }, [filters]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleCreate = async (data) => {
    try {
      await createTask(data);
      setError(null);
      await loadTasks({ withLoading: false });
      return true;
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Failed to add task'));
      return false;
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateTask(id, data);
      setError(null);
      await loadTasks({ withLoading: false });
      return true;
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Failed to update task'));
      return false;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setError(null);
      await loadTasks({ withLoading: false });
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Failed to delete task'));
    }
  };

  return (
    <div className="container">
      <h1 className="app-title">Akademik Görev Takipçisi / Academic Task Tracker</h1>

      <DashboardStats tasks={tasks} />

      <div className="main-layout main-layout-wide">
        <aside className="side-panel">
          <TaskForm onSubmit={handleCreate} />
          <FilterBar filters={filters} onFilterChange={setFilters} />
        </aside>

        <main>
          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onRetry={() => loadTasks()}
          />
        </main>

        <aside className="side-panel">
          <UpcomingDeadlines tasks={tasks} />
          <StudyNotes />
        </aside>
      </div>
    </div>
  );
}

export default App;
