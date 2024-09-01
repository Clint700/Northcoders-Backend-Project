Here's a comprehensive README file for this Northcoders Backend Project:

---

# Northcoders News API

## Project Overview

Welcome to the Northcoders News API, a RESTful API designed as part of the Northcoders Backend Bootcamp. This project serves as the backend for a news website, providing the necessary endpoints for fetching and interacting with articles, comments, users, and topics. The API is built using Node.js, Express, and PostgreSQL, and is fully hosted and accessible online.

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Seeding the Database](#seeding-the-database)
  - [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Developer](#developer)
- [License](#license)

## Key Features

Articles: Fetch all articles, filter by topic, sort by various fields, and get a single article by ID.
Comments: Add, fetch, and delete comments associated with specific articles.
Users: Fetch user profiles by username.
Topics: Fetch all available topics.

## Getting Started

### Installation

To set up the project locally, follow these steps:

1. Clone the Repository:**

   ```bash
   git clone https://github.com/Clint700/Northcoders-Backend-Project.git
   cd Northcoders-Backend-Project
   ```

2. Install Dependencies:

   Ensure you have Node.js installed, then run:

   ```bash
   npm install
   ```

### Environment Variables

Create environment variables files to store database connection strings:

1. Development Environment:
   
   Create a `.env.development` file:

   ```
   PGDATABASE=nc_news
   ```

2. Test Environment:

   Create a `.env.test` file:

   ```
   PGDATABASE=nc_news_test
   ```

3. Production Environment:

   Create a `.env.production` file:

   ```
   DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
   ```

   Replace `<user>`, `<password>`, `<host>`, `<port>`, and `<database>` with actual Supabase database credentials.

### Seeding the Database

To seed the development or production database:

```bash
npm run seed
```

For production seeding:

```bash
npm run seed-prod
```

### Running the Server

To start the server locally:

```bash
npm start
```

The server will be running at `http://localhost:9090/`.

## API Documentation

The API provides the following endpoints:

- GET /api/articles Fetch all articles.
- GET /api/articles/:article_id Fetch a single article by ID.
- GET /api/articles/:article_id/comments Fetch a single article by ID with all its comments.
- POST /api/articles/:article_id/comments Add a comment to an article.
- GET /api/users Fetch all users.
- GET /api/users/:username Fetch a single user by username.
- GET /api/topics Fetch all topics.

- For full endpoint review, please navigate to the endpoint.json file.

For a detailed overview of all endpoints and their usage, please refer to the [API documentation](https://northcoders-backend-project.onrender.com/api).

## Deployment

This API is hosted on Render and connected to a PostgreSQL database hosted on Supabase.

- API Base URL: [Render Hosted API](https://northcoders-backend-project.onrender.com/api)
- Supabase Dashboard: [Supabase Database](https://supabase.com/dashboard/project/qcihkqwrmqkgcwxkxwdy/database/tables)

The API is live and accessible at the Render URL, where you can interact with it using the provided endpoints.

## Developer

This project was developed by [Clinton Onyekwere](www.linkedin.com/in/clinton-onyekwere-654440192) as part of the Northcoders Backend Bootcamp Project.

-GitHub: [Clinton Onyekwere's GitHub](https://github.com/Clint700/Northcoders-Backend-Project.git)
-LinkedIn: [Clinton Onyekwere on LinkedIn](www.linkedin.com/in/clinton-onyekwere-654440192)

## License

This project is in collaboration with Northcoders and its amazing tutors and mentors.

---