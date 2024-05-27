

# User Management Application

A comprehensive user management application built using TypeScript, Node.js, and MongoDB. This application provides functionalities for user signup and login, listing users, and an admin side dashboard with charts and tables.


## Table of Contents

- [User Management](#project-title)
- [Table of Contents](#table-of-contents)
- [Client](#client)
  - [Setup and Installation](#setup-and-installation)
  - [Available Scripts](#available-scripts)
  
- [Server](#server)
  - [Setup and Installation](#setup-and-installation-1)
  - [Available Scripts](#available-scripts-1)
  - [Architecture](#architecture)
- [License](#license)

## Client

This project contains a client application built with React, Vite, and TypeScript.

### Setup and Installation

To set up and run the client application, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo/client
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

### Available Scripts

- `dev`: Starts the Vite development server.
- `build`: Builds the application for production.
- `lint`: Runs ESLint to lint the codebase.
- `preview`: Previews the production build.


## Server

This project contains a server application built with Node.js and TypeScript, following the principles of Clean Architecture, SOLID, and dependency injection.

### Setup and Installation

To set up and run the server application, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo/server
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   npm start
   ```

### Available Scripts

- `start`: Starts the server using `ts-node-dev`.
- `build`: Compiles the TypeScript files.


### Architecture

The server application follows the Clean Architecture principles, ensuring a separation of concerns and scalability. It also adheres to the SOLID principles, promoting a robust and maintainable codebase.

- **Entities**: Core business logic.
- **Use Cases**: Application-specific business rules.
- **Controllers**: Handling HTTP requests.
- **Repositories**: Data access logic, e.g., database interactions.
- **Dependency Injection**: Managing dependencies to promote decoupling and easier testing.

