# Docker Monorepo (Demo)

Welcome to the **Docker Monorepo**, a **demonstration** project showcasing a modern microservices architecture within a monorepo setup. This repository serves as a template for building scalable, full-stack applications using **Turborepo** for monorepo management, **pnpm** for dependency management, **Docker** for containerization, **React** with **Material-UI (MUI)** for the frontend, **NestJS** for backend microservices, and **GraphQL** for API communication. The `users` and `forms` folders are sample backend microservices to illustrate the microservices pattern.

This project is intended as a **demo** to help developers understand how to structure a monorepo with microservices, containerize services with Docker, and integrate a React frontend with a GraphQL backend. Use it as a starting point for your own projects!

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
  - [Why Turborepo?](#why-turborepo)
  - [Why pnpm?](#why-pnpm)
  - [Why Docker?](#why-docker)
  - [Why React and Material-UI?](#why-react-and-material-ui)
  - [Why NestJS?](#why-nestjs)
  - [Why GraphQL?](#why-graphql)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Running with Docker](#running-with-docker)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This repository is a **demo** monorepo showcasing a full-stack application with a microservices architecture. It includes:
- A **React frontend** (`web`) built with Vite and Material-UI, using Apollo Client to interact with a GraphQL API.
- A **NestJS-based GraphQL gateway** (`gateway`) that exposes a unified API at `http://localhost:3000/graphql`.
- Two **sample backend microservices** (`users` and `forms`) to demonstrate microservices communication via TCP.
- **Docker** and **Docker Compose** for containerizing and orchestrating services.
- **Turborepo** for managing the monorepo and optimizing build tasks.
- **pnpm** for efficient dependency management.

The `users` and `forms` microservices are **example implementations** to illustrate how to structure and connect backend services in a monorepo. They are not production-ready but serve as templates for building real microservices. The frontend communicates with the `gateway`, which aggregates data from these sample microservices, demonstrating a scalable architecture.

## Technologies Used

### Why Turborepo?

[Turborepo](https://turbo.build/repo) is a high-performance build system for JavaScript and TypeScript monorepos. We chose Turborepo because:
- **Efficient Caching**: Speeds up builds by caching outputs, reducing redundant work in development and CI/CD.
- **Task Orchestration**: Simplifies running tasks (e.g., `dev`, `build`) across multiple apps and packages.
- **Scalability**: Handles complex dependency graphs, ideal for managing our frontend, backend, and shared packages.

### Why pnpm?

[pnpm](https://pnpm.io/) is a fast, disk-efficient package manager used for dependency management. We chose pnpm because:
- **Disk Efficiency**: Uses a content-addressable store to avoid duplicate dependencies, saving disk space.
- **Workspace Support**: Native support for monorepo workspaces (`pnpm-workspace.yaml`) simplifies dependency management across `apps` and `packages`.
- **Speed**: Faster installation compared to npm or Yarn, enhancing developer productivity.
- **Flexibility**: Works reliably with or without a lockfile in Docker builds, as demonstrated in this project.

### Why Docker?

[Docker](https://www.docker.com/) containerizes each service (`web`, `gateway`, `users`, `forms`). We chose Docker because:
- **Consistency**: Ensures identical environments across development, testing, and production.
- **Isolation**: Runs each microservice in its own container, improving modularity and security.
- **Orchestration**: Docker Compose simplifies managing multiple services and their dependencies.
- **Portability**: Containers can be deployed on any Docker-compatible platform, streamlining deployment.

### Why React and Material-UI?

[React](https://react.dev/) is the frontend framework, styled with [Material-UI (MUI)](https://mui.com/). We chose them because:
- **React**:
  - **Component-Based**: Enables reusable, maintainable UI code.
  - **Ecosystem**: Supports rapid development with libraries like `@apollo/client` for GraphQL.
  - **Performance**: Virtual DOM ensures efficient rendering for dynamic UIs.
- **Material-UI**:
  - **Design Consistency**: Provides a professional design system based on Material Design.
  - **Customizability**: Allows tailored UI with theming and component customization.
  - **Accessibility**: Built-in a11y support ensures inclusivity.

### Why NestJS?

[NestJS](https://nestjs.com/) powers our backend microservices (`gateway`, `users`, `forms`). We chose NestJS because:
- **TypeScript Support**: Enhances type safety and developer productivity.
- **Modular Architecture**: Aligns with microservices, making services easy to develop and maintain.
- **GraphQL Integration**: Simplifies building the `gateway`’s GraphQL API with `@nestjs/graphql`.
- **Microservices Support**: Enables TCP communication between `gateway` and sample services.

### Why GraphQL?

[GraphQL](https://graphql.org/) is used for API communication via the `gateway`. We chose GraphQL because:
- **Flexible Queries**: Allows clients to request only needed data, reducing over/under-fetching.
- **Unified API**: Aggregates data from `users` and `forms` into a single endpoint.
- **Strong Typing**: Ensures type-safe APIs with a clear schema.
- **Developer Experience**: GraphQL Playground (`http://localhost:3000/graphql`) simplifies API testing.

## Project Structure

```
docker-monorepo/
├── apps/
│   ├── web/                    # React frontend with Material-UI
│   │   ├── src/
│   │   │   ├── App.tsx         # Main React component with Apollo Client
│   │   │   ├── main.tsx        # Entry point for React
│   │   │   └── ...
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   ├── .env                # Environment variables (e.g., VITE_API_URL)
│   │   └── vite.config.ts      # Vite configuration
│   ├── gateway/                # NestJS GraphQL gateway
│   │   ├── src/
│   │   │   ├── main.ts         # Entry point with CORS enabled
│   │   │   ├── app.module.ts   # GraphQL and microservices setup
│   │   │   ├── app.resolver.ts # GraphQL resolvers
│   │   │   └── ...
│   │   ├── package.json
│   │   └── Dockerfile
│   ├── users/                  # Sample NestJS microservice for user logic
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   └── ...
│   │   ├── package.json
│   │   └── Dockerfile
│   ├── forms/                  # Sample NestJS microservice for form logic
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   └── ...
│   │   ├── package.json
│   │   └── Dockerfile
├── packages/                   # Shared libraries (e.g., eslint-config)
│   ├── eslint-config/
│   └── ...
├── pnpm-workspace.yaml         # Defines monorepo workspace
├── .npmrc                      # pnpm configuration
├── docker-compose.yml          # Docker Compose configuration
├── package.json                # Root package.json
├── turbo.json                  # Turborepo configuration
└── README.md                   # This file
```

- **apps/web**: React frontend using Vite, Material-UI, and Apollo Client to query the GraphQL API.
- **apps/gateway**: NestJS service exposing a GraphQL API at `http://localhost:3000/graphql`, aggregating data from `users` and `forms`.
- **apps/users**: Sample NestJS microservice simulating user-related logic, accessible via TCP on port `3001`.
- **apps/forms**: Sample NestJS microservice simulating form-related logic, accessible via TCP on port `3002`.
- **packages**: Shared libraries, such as ESLint configurations, used across apps.

## Getting Started

### Prerequisites

- **Node.js**: v20.x or higher
- **pnpm**: v8.x or higher (`npm install -g pnpm`)
- **Docker**: Latest version with Docker Compose
- **Git**: For cloning the repository

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/justinthomas0789/docker-monorepo.git
   cd docker-monorepo
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

### Running Locally

To run the application locally without Docker:
```bash
pnpm run dev
```
- Starts all apps (`web`, `gateway`, `users`, `forms`) using Turborepo.
- Access the frontend at `http://localhost:5173`.
- Access the GraphQL Playground at `http://localhost:3000/graphql`.

### Running with Docker

1. **Build and Start Containers**:
   ```bash
   docker-compose up --build
   ```

2. **Access Services**:
   - Frontend: `http://localhost:5173`
   - GraphQL Playground: `http://localhost:3000/graphql`
   - Users Microservice: `http://localhost:3001` (internal)
   - Forms Microservice: `http://localhost:3002` (internal)

3. **Stop Containers**:
   ```bash
   docker-compose down
   ```

4. **Rebuild Without Cache** (if needed):
   ```bash
   docker-compose rm -f
   docker image rm docker-monorepo-web docker-monorepo-gateway docker-monorepo-users docker-monorepo-forms -f
   docker-compose up --build
   ```

## Usage

- **Frontend**: The `web` app is a React SPA built with Vite. It uses Apollo Client to query the GraphQL API at `http://localhost:3000/graphql`. Customize the UI in `apps/web/src/App.tsx`.
- **GraphQL API**: The `gateway` exposes a GraphQL endpoint at `http://localhost:3000/graphql`. Test queries like:
  ```graphql
  query {
    getForm(id: "1")
  }
  ```
- **Microservices**: The `users` and `forms` microservices are sample services demonstrating TCP communication with the `gateway`. They serve as templates for real microservices.

## Development

- **Add a New Microservice**:
  1. Create a new folder under `apps/` (e.g., `apps/new-service`).
  2. Set up a NestJS project: `pnpm dlx @nestjs/cli new new-service`.
  3. Update `pnpm-workspace.yaml` to include the new service.
  4. Add a `Dockerfile` and update `docker-compose.yml`.

- **Add a Shared Library**:
  1. Create a new folder under `packages/` (e.g., `packages/new-lib`).
  2. Initialize with `pnpm init` and configure in `pnpm-workspace.yaml`.
  3. Import the library in other apps or packages.

- **Run Specific App**:
  ```bash
  pnpm run dev --filter=web
  ```

## Testing

- **Run Tests**:
  ```bash
  pnpm run test
  ```
  Turborepo executes tests for apps and packages with test scripts defined in their `package.json`.

- **Test GraphQL**:
  Use the GraphQL Playground at `http://localhost:3000/graphql` or tools like Postman to send queries.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make changes and commit: `git commit -m "Add your feature"`.
4. Push to your fork: `git push origin feature/your-feature`.
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).