# Phrase Wisdom Bridge

A web application that displays random Wikipedia articles with a beautiful UI. The application uses a Python FastAPI backend to fetch data from Wikipedia's API and serves it to a React frontend.

## Project Structure

- `backend/` - Python FastAPI backend
- `src/` - React frontend
- `public/` - Static assets

## Setup Instructions

### Backend Setup

1. Make sure you have Python 3.8+ installed
2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the backend server:
```bash
cd backend
python run.py
```

The backend server will start at http://localhost:8000

### Frontend Setup

1. Make sure you have Node.js installed
2. Install frontend dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:5173

## API Endpoints

The backend provides the following endpoints:

- `GET /api/random-article` - Get a random Wikipedia article
- `GET /api/search/{query}` - Search Wikipedia articles
- `GET /api/article/{title}` - Get a specific Wikipedia article

## Technologies Used

- Backend:
  - Python
  - FastAPI
  - Wikipedia-API

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui Components

## Development

The project uses a modern development setup with hot reloading for both frontend and backend. The backend server will automatically reload when you make changes to the Python files, and the frontend development server supports hot module replacement for React components.

# Welcome to your project

## How can I edit this code?

There are several ways of editing your application.


**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a1c2f12b-0e5c-4c58-af16-2dc8ecbd4523) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
