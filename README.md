# Blogging Platform - Frontend

## About the Project

This is the frontend part of a full-stack blogging platform built with React and Material UI. The application allows users to create, read, edit, and delete blog posts, with features like user authentication, search functionality, and bookmarking.

## My Approach

I approached this project by focusing on creating a user-friendly interface with modern design elements and smooth animations. The frontend is built with React (using Vite for faster development) and Material UI for consistent styling. Key features include:

- User authentication (signup, login, logout)
- Blog post management (create, read, edit, delete)
- Search functionality
- Responsive design for all device sizes
- Pagination (3 posts per page)
- Bookmarking system for saving favorite posts
- Rich text editing with CK Editor

## AI Assistance

During development, I used AI tools like ChatGPT and Cascade to help with:

- Generating component structures and boilerplate code
- Debugging complex issues
- Implementing animations and transitions
- Enhancing UI/UX design elements
- Creating consistent styling across components
- Adding pagination functionality (3 posts per page)
- Implementing the bookmarking system
- Creating success message popups for registration and login
- Improving navbar functionality and styling

Cascade, an advanced AI coding assistant, was particularly helpful with implementing complex features like the pagination system and bookmarking functionality. It provided guidance on best practices and helped ensure clean, maintainable code throughout the project.

AI assistance helped speed up development while maintaining high code quality and modern design standards.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/if-sourabhsawant/blogging-platform-frontend.git
   cd blogging-platform/frontend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_APP_API_URL=http://localhost:5000/api
```

## Features

- **Authentication**: Secure user registration and login with JWT
- **Blog Posts**: Create, read, update, and delete blog posts
- **Rich Text Editor**: Format your posts with CK Editor
- **Search**: Find posts by title or content
- **Pagination**: Navigate through posts with a user-friendly pagination system
- **Bookmarks**: Save your favorite posts for later reading
- **Responsive Design**: Works on desktop, tablet, and mobile devices
