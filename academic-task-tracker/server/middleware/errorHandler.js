const errorHandler = (err, req, res, next) => {
    console.error('Server error:', err);

    if (err.name === 'ValidationError') {
        const details = Object.values(err.errors).map((item) => ({
            field: item.path,
            message: item.message
        }));

        return res.status(400).json({
            error: 'Validation error',
            details
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    if (err.code === 11000) {
        return res.status(409).json({ error: 'Duplicate record' });
    }

    return res.status(500).json({ error: 'Server error' });
};

module.exports = errorHandler;
