# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


1. Project Title
EventHub – A College Event Management Portal
2. Problem Statement
In educational institutions, managing cultural events, technical fests, workshops, and
seminars is often chaotic and disorganized. Students miss event announcements posted on
notice boards, coordinators struggle with manual registrations, and tracking attendees
becomes overwhelming. There is no centralized platform where students can discover
upcoming events, register online, and organizers can efficiently manage event details,
attendee lists, and venue bookings. EventHub aims to solve this problem by providing a
comprehensive event management portal where students can browse, search, and register
for events, while organizers can create, manage, and track events seamlessly, ensuring
better coordination and participation across the campus.
3. System Architecture
Frontend → Backend (API) → Database
●
●
●
●
●
Frontend: React.js with React Router for page navigation and dynamic rendering
Backend: Node.js + Express.js for RESTful API development
Database: MongoDB (non-relational) with Mongoose ODM for flexible event data
storage
Authentication: JWT-based login/signup with bcrypt for secure password hashing
Hosting:
○
○
○
Frontend → Netlify/Vercel
Backend → Render/Railway/Heroku
Database → MongoDB Atlas (cloud-hosted)
5. Key Features
Category Features
Authentication &
Authorization
User registration and login (students and organizers), JWT
token-based authentication, role-based access control
(student/organizer/admin), password encryption with bcrypt
CRUD Operations Create, read, update, delete events with comprehensive
event lifecycle management
Frontend Routing Pages: Home, Login, Signup, All Events (Browse), Event
Details, My Registered Events, Create Event (organizer),
Manage My Events (organizer), User Profile, Admin
Dashboard
Filtering Filter events by category
(cultural/technical/sports/workshop), date range
(upcoming/this week/this month), venue, registration status
(open/closed)
Searching Search events by event name, organizer name, venue, or
keywords in description
Sorting Sort events by date (ascending/descending), registration
deadline, popularity (number of registrations), alphabetically
by name
Pagination Paginated event listings for better performance and user
experience when browsing large numbers of events
Dashboard & Analytics Visual statistics for organizers: total events created, total
registrations, upcoming vs completed events, popular events
Attendee Management Organizers can view registered attendees list with contact
details, export attendee list as CSV
Event Status Updates Organizers can update event status (upcoming → ongoing
→ completed or cancelled)
Responsive Design Mobile-friendly interface for students to browse and register
for events on the go
Hosting Deploy frontend, backend, and database to accessible
production URLs
6. Tech Stack
Layer Technologies
Frontend React.js, React Router, Axios for API calls, Tailwind
CSS/Bootstrap for styling
Backend Database Authentication
AI
API Testing Version Control Hosting Node.js, Express.js for API server
MongoDB (NoSQL) with Mongoose ODM
JWT (JSON Web Token), bcrypt for password hashing
OpenAI
Postman for endpoint testing
Git, GitHub for code repository
Frontend: Vercel/Netlify, Backend: Render/Railway, Database:
MongoDB Atlas
7. API Overview
Endpoint Method Description Access
/api/auth/register POST Register new user (student /
Public
organizer)
/api/auth/login POST Authenticate user and return
Public
JWT token
/api/auth/logout POST Logout user and invalidate
Authenticated
token
/api/events GET Get all events with pagination,
filtering, sorting
Public/Authenticated
/api/events POST Create new event Authenticated (Organizer)
/api/events/search GET Search events by keyword Public
/api/events/:id GET Get single event details with
attendee count
Public
/api/events/:id PUT Update event details Authenticated (Event
Owner/Admin)
/api/events/:id DELETE Delete event Authenticated (Event
Owner/Admin)
/api/events/:id/register POST Register for an event Authenticated (Student)
/api/events/:id/unregister POST Cancel event registration Authenticated (Student)
/api/events/:id/attendees GET Get list of registered attendees Authenticated (Event
Owner)
/api/users/profile GET Get user profile details Authenticated
/api/users/profile PUT Update user profile Authenticated
/api/users/my-events GET Get events created by
logged-in organizer
/api/users/my-registrations GET Get events registered by
logged-in student
/api/dashboard/stats GET Get dashboard statistics for
organizer
Authenticated (Organizer)
Authenticated (Student)
Authenticated (Organizer)