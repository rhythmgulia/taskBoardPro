# TaskBoard Pro

A project collaboration platform with task management and workflow automation features.

## Features

* User Authentication with Google OAuth
* Project Management
* Task Management with Kanban Board
* Workflow Automation
* Real-time Updates

## Tech Stack

* Frontend: React, Material-UI
* Backend: Node.js, Express
* Database: MongoDB
* Authentication: Firebase

## Prerequisites

* Node.js (v14 or higher)
* MongoDB
* Firebase Account
* Google Cloud Console Account

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd taskboard-pro
```

2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Login and Register:
   generated jwt token for each user
   

4. Configure environment variables:

   * Create `.env` file in the backend directory with:

     ```
     PORT=8082
     MONGODB_URI=mongodb://localhost:27017/taskboard || cluster connection string
     JWT_SECRET=your_jwt_secret_key_here || 
     ```

5. Start the development servers:

```bash
# Start backend server
cd backend
npm start

# Start frontend server
cd ../frontend
npm start
```

## Usage

1. Open your browser and navigate to `http://localhost:3002` || `http://localhost:3003`
2. Create a new project
3. Add tasks and set up automations

## API Endpoints

### Authentication

* POST /api/auth/login - Login with jwt token
* GET /api/auth/me - Get current user

### Projects

* GET /api/projects - Get all projects
* POST /api/projects - Create project
* GET /api/projects/\:id - Get project by ID
* PATCH /api/projects/\:id - Update project
* POST /api/projects/\:id/members - Add member to project

### Tasks

* GET /api/tasks/project/\:projectId - Get tasks for project
* POST /api/tasks - Create task
* PATCH /api/tasks/\:id - Update task
* DELETE /api/tasks/\:id - Delete task

### Automations

* GET /api/automations/project/\:projectId - Get automations for project
* POST /api/automations - Create automation


