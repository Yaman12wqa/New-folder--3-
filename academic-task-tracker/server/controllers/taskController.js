const Task = require('../models/Task');

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const normalizeTaskPayload = (payload = {}) => {
    const normalized = { ...payload };

    // Allow clearing due date from the UI.
    if (normalized.dueDate === '') {
        normalized.dueDate = null;
    }

    return normalized;
};

const buildPrioritySortPipeline = (filter, direction = -1) => ([
    { $match: filter },
    {
        $addFields: {
            priorityRank: {
                $switch: {
                    branches: [
                        { case: { $eq: ['$priority', 'urgent'] }, then: 4 },
                        { case: { $eq: ['$priority', 'high'] }, then: 3 },
                        { case: { $eq: ['$priority', 'medium'] }, then: 2 },
                        { case: { $eq: ['$priority', 'low'] }, then: 1 }
                    ],
                    default: 0
                }
            }
        }
    },
    { $sort: { priorityRank: direction, createdAt: -1 } },
    { $project: { priorityRank: 0 } }
]);

// GET /api/tasks
exports.getTasks = async (req, res, next) => {
    try {
        const filter = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }
        if (req.query.priority) {
            filter.priority = req.query.priority;
        }
        if (req.query.type) {
            filter.type = req.query.type;
        }
        if (req.query.course) {
            const safeCourse = escapeRegExp(req.query.course.trim());
            if (safeCourse) {
                filter.course = { $regex: safeCourse, $options: 'i' };
            }
        }
        if (req.query.search) {
            const safeSearch = escapeRegExp(req.query.search.trim());
            if (safeSearch) {
                const pattern = { $regex: safeSearch, $options: 'i' };
                filter.$or = [
                    { title: pattern },
                    { description: pattern },
                    { course: pattern }
                ];
            }
        }

        const requestedSort = req.query.sort || '-createdAt';
        const allowedSorts = new Set(['-createdAt', 'createdAt', 'dueDate', '-dueDate', 'updatedAt', '-updatedAt']);

        if (requestedSort === 'priority_desc') {
            const tasks = await Task.aggregate(buildPrioritySortPipeline(filter, -1));
            return res.json(tasks);
        }

        if (requestedSort === 'priority_asc') {
            const tasks = await Task.aggregate(buildPrioritySortPipeline(filter, 1));
            return res.json(tasks);
        }

        const sort = allowedSorts.has(requestedSort) ? requestedSort : '-createdAt';
        const tasks = await Task.find(filter).sort(sort);
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

// POST /api/tasks
exports.createTask = async (req, res, next) => {
    try {
        const task = await Task.create(normalizeTaskPayload(req.body));
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res, next) => {
    try {
        const updatePayload = normalizeTaskPayload(req.body);
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            updatePayload,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (err) {
        next(err);
    }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted' });
    } catch (err) {
        next(err);
    }
};
