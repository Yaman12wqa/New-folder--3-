const mongoose = require('mongoose');

const startOfLocalDay = (date) => (
    new Date(date.getFullYear(), date.getMonth(), date.getDate())
);

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters'],
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        default: ''
    },
    course: {
        type: String,
        required: [true, 'Course name is required'],
        trim: true
    },
    type: {
        type: String,
        enum: ['Assignment', 'Project', 'Quiz', 'Exam'],
        default: 'Assignment'
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'done'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    dueDate: {
        type: Date,
        validate: {
            validator: function (value) {
                if (!value) {
                    return true;
                }

                // Compare by date (not time) so selecting "today" is always valid.
                const dueDay = startOfLocalDay(new Date(value));
                const today = startOfLocalDay(new Date());
                return dueDay >= today;
            },
            message: 'Due date cannot be in the past'
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
