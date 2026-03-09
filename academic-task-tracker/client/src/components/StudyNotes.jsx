import React, { useState } from 'react';

const NOTES_KEY = 'academic_notes';
const NOTES_SAVED_AT_KEY = 'academic_notes_saved_at';

const formatSavedAt = (value) => {
    if (!value) {
        return 'Not saved yet';
    }

    return new Date(value).toLocaleString();
};

const StudyNotes = () => {
    const [notes, setNotes] = useState(() => localStorage.getItem(NOTES_KEY) || '');
    const [savedAt, setSavedAt] = useState(() => localStorage.getItem(NOTES_SAVED_AT_KEY) || '');

    const handleChange = (event) => {
        const nextValue = event.target.value;
        const timestamp = new Date().toISOString();

        setNotes(nextValue);
        setSavedAt(timestamp);
        localStorage.setItem(NOTES_KEY, nextValue);
        localStorage.setItem(NOTES_SAVED_AT_KEY, timestamp);
    };

    return (
        <div className="panel-card notes-card">
            <h2>Quick Notes</h2>
            <textarea
                value={notes}
                onChange={handleChange}
                placeholder="Write your study notes here..."
                className="notes-input"
            />
            <small className="muted-text">Last saved: {formatSavedAt(savedAt)}</small>
        </div>
    );
};

export default StudyNotes;
