# Academic Task Tracker

Academic Task Tracker is a student project for organizing course assignments, projects, quizzes, and exams. It contains a React interface and a Node.js API backed by MongoDB.

> Learning status: This project was created with AI assistance and is still being reviewed as a learning project. Technologies present in the repository are not presented as confirmed personal skills until the project owner can explain and modify the code independently.

## Current features

- Create, read, update, and delete academic tasks
- Track task status, priority, course, type, and due date
- Filter, search, and sort tasks
- Display summary cards and upcoming deadlines
- Store short study notes in the browser's local storage
- Provide a basic API health endpoint

## Project structure

```text
academic-task-tracker/
  client/   React and Vite user interface
  server/   Express API and MongoDB connection
```

## Technologies used by the project

- Frontend: React, Vite, Axios, Lucide React
- Backend: Node.js, Express, MongoDB, Mongoose

This list describes the repository. It is not a claim of mastery.

## Local setup

Requirements:

- Node.js 18 or newer
- npm
- a local MongoDB instance or MongoDB Atlas connection

Install the two applications separately:

```bash
cd academic-task-tracker/server
npm install

cd ../client
npm install
```

Copy `server/.env.example` to `server/.env`, then change the values for your local environment. The `.env` file must not be committed.

The optional `client/.env.example` documents the frontend API address.

Run the backend and frontend in separate terminals:

```bash
cd academic-task-tracker/server
npm run dev
```

```bash
cd academic-task-tracker/client
npm run dev
```

Default local addresses:

- Frontend: `http://localhost:5173`
- API: `http://localhost:3000/api`

## Available checks

```bash
cd academic-task-tracker/client
npm run lint
npm run build
```

The repository currently has no automated test suite. Backend files can be syntax-checked with Node.js, but database behavior still needs a running MongoDB instance for integration testing.

## Repository hygiene

Dependency folders, `.env` files, logs, and build output are ignored. Previously committed copies may remain in Git history because this cleanup does not rewrite history.
