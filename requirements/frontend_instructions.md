# Project Overview

This file sets up the **frontend** of a web application with the following technologies:

- **Framework**: React.js with Next.js for server-side rendering and routing.
- **State Management**: Redux for centralized state management.
- **Styling**: Tailwind CSS for responsive and customizable styling.
- **Animations**: A powerful animation library (e.g., Framer Motion) for smooth and dynamic UI effects.
- **API Communication**: REST API calls to backend services for authentication, prompt processing, and probability matrix display.
- **React Components**: We will use `shadcn` component library
  
# Feature Requirements

1. **Login Screen**: A simple login form with fields for username and password.
2. **Home Page**: Displays general information about AI Safety, using placeholder text and images.
3. **User Landing Page**:
   - **Prompt Input**: Allows users to enter a prompt and submit it.
   - **API Call**: Sends the prompt to the backend `/analyzed` endpoint, showing a loading spinner while awaiting the response.
   - **Probability Matrix Display**: Upon receiving the response, display a probability matrix to indicate which LLM model (ChatGPT, Claude, Gemini, etc.) will handle the prompt.
   - **Redirection**: Based on the probability matrix, redirect the user’s prompt to the designated LLM model.
4. **Response Display**: Render the backend response in an engaging, animated format.
5. **Session Management**: Use JWT-based authentication to maintain user sessions securely, storing the JWT token in local storage or cookies.

# Relevant Docs

- **Next.js Documentation**: https://nextjs.org/docs
- **Redux Documentation**: https://redux.js.org/introduction/getting-started
- **Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **Framer Motion Documentation**: https://www.framer.com/docs

# Current File Structure

📁 src/
├── app/
│   └── components/
│       ├── accordion.tsx
│       ├── alert.tsx
│       ├── alert-dialog.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       └── table.tsx
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── node_modules/
├── requirements/
│   ├── backend_setup.md
│   ├── frontend_setup.md
│   └── project_setup.md
├── .eslintrc.json
├── .gitignore
├── components.json
├── next.config.js
├── package.json
├── postcss.config.js
├── project_setup.md
├── README.md
├── tailwind.config.ts
└── yarn.lock


# Rules

- All new components should go in /components and be named like example-component.tsx unless otherwise specified.
- All new pages go into /app