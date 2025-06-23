# Docker Monorepo

Welcome to the **Docker Monorepo**, a full-stack application template demonstrating a microservices architecture using modern JavaScript and TypeScript tools. This repository leverages **Turborepo** for monorepo management, **pnpm** for dependency management, **Docker** for containerization, **React** with **Material-UI** for the frontend, **NestJS** for backend microservices, and **GraphQL** for API communication. The project is structured to provide a scalable, maintainable, and production-ready setup for building microservices-based applications.

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

This repository is a monorepo containing a full-stack application with a React frontend and multiple NestJS-based backend microservices, orchestrated using Docker and Docker Compose. The frontend (`web`) is built with React and Material-UI, providing a modern and responsive user interface. The backend consists of microservices (`users` and `extensions`) that handle specific business logic, with a `gateway` service exposing a unified GraphQL API. The project uses Turborepo for efficient monorepo management and pnpm for fast, disk-efficient dependency management.

The application demonstrates a microservices architecture where:
- The `web` app (React) communicates with the `gateway` via GraphQL queries.
- The `gateway` (NestJS) aggregates data from the `users` and `extensions` microservices using TCP transport.
- All services are containerized with Docker for consistent development and deployment environments.

## Technologies Used

### Why Turborepo?

[Turborepo](https://turbo.build/repo) is a high-performance build system for JavaScript and TypeScript monorepos. We chose Turborepo because:
- **Efficient Caching**: Turborepo caches build outputs to avoid redundant computations, speeding up development and CI/CD pipelines.
- **Task Orchestration**: It simplifies running tasks (e.g., `build`, `dev`, `test`) across multiple packages and apps in the monorepo.
- **Scalability**: It supports complex dependency graphs, making it ideal for managing our frontend, backend, and shared packages.

### Why pnpm?

[pnpm](https://pnpm.io/) is a fast, disk-efficient package manager that we use for dependency management. We chose pnpm because:
- **Disk Efficiency**: pnpm uses a content-addressable store, reducing disk space by avoiding duplicate dependencies across packages.
- **Workspace Support**: Its native support for monorepo workspaces (`pnpm-workspace.yaml`) simplifies dependency management across `apps` and `packages`.
- **Speed**: pnpm’s installation process is faster than npm or Yarn, improving developer productivity.
- **Consistency**: While we don’t always copy `pnpm-lock.yaml` in Docker builds, pnpm ensures consistent dependency resolution when needed.

### Why Docker?

[Docker](https://www.docker.com/) is used to containerize each service (`web`, `gateway`, `users`, `extensions`). We chose Docker because:
- **Consistency**: Docker ensures identical environments across development, testing, and production, eliminating “works on my machine” issues.
- **Isolation**: Each microservice runs in its own container, improving security and modularity.
- **Scalability**: Docker Compose simplifies orchestrating multiple services, making it easy to scale and manage dependencies like `users` and `extensions`.
- **Portability**: Containers can be deployed on any platform supporting Docker, streamlining CI/CD workflows.

### Why React and Material-UI?

[React](https://react.dev/) is the frontend framework, styled with [Material-UI (MUI)](https://mui.com/). We chose them because:
- **React**:
  - **Component-Based**: React’s component model enables reusable, maintainable UI code.
  - **Ecosystem**: Its vast ecosystem, including libraries like `@apollo/client` for GraphQL, supports rapid development.
  - **Performance**: React’s virtual DOM ensures efficient rendering for dynamic UIs.
- **Material-UI**:
  - **Design Consistency**: MUI provides a polished, professional design system based on Material Design principles.
  - **Customizability**: MUI’s theming and component customization allow for a tailored user experience.
  - **Accessibility**: MUI components are built with accessibility (a11y) in mind, ensuring inclusivity.

### Why NestJS?

[NestJS](https://nestjs.com/) powers our backend microservices (`gateway`, `users`, `extensions`). We chose NestJS because:
- **TypeScript Support**: Built-in TypeScript support ensures type safety and developer productivity.
- **Modular Architecture**: NestJS’s module system aligns with our microservices approach, making services like `users` and `extensions` easy to develop and maintain.
- **GraphQL Integration**: The `@nestjs/graphql` package simplifies building the `gateway`’s GraphQL API.
- **Scalability**: NestJS supports microservices via TCP transport, enabling communication between `gateway` and other services.

### Why GraphQL?

[GraphQL](https://graphql.org/) is used for API communication via the `gateway` service. We chose GraphQL because:
- **Flexible Queries**: Clients can request exactly the data they need, reducing over- or under-fetching compared to REST.
- **Unified API**: The `gateway` aggregates data from multiple microservices (`users`, `extensions`), providing a single entry point for the frontend.
- **Strong Typing**: GraphQL’s schema ensures type-safe APIs, improving reliability and developer experience.
- **Playground**: The GraphQL Playground (`http://localhost:3000/graphql`) simplifies API testing and exploration.

## Project Structure

```
docker-monorepo/
├── apps/
│   ├── web/                    # React frontend with Material-UI
│   │   ├── src/
│   │   │   ├── App.tsx         # Main React component with Apollo Client
│   │   │   └── ...
│   │   ├── package.json
│   │   ├── Dockerfile
│   │   └── .env               # Environment variables (e.g., VITE_API_URL)
│   ├── gateway/               # NestJS GraphQL gateway
│   │   ├── src/
│   │   │   ├── main.ts        # Entry point with CORS enabled
│   │   │   ├── app.module.ts  # GraphQL and microservices setup
│   │   │   ├── app.resolver.ts # GraphQL resolvers
│   │   │   └── ...
│   │   ├── package.json
│   │   └── Dockerfile
│   ├── users/                 # NestJS microservice for user-related logic
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   └── ...
│   │   ├── package.json
│   │   └── Dockerfile
│   ├── extensions/            # NestJS microservice for extension-related logic
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   └── ...
│   │   ├── package.json
│   │   └── Dockerfile
├── packages/                  # Shared libraries (e.g., eslint-config)
│   ├── eslint-config/
│   └── ...
├── pnpm-workspace.yaml        # Defines monorepo workspace
├── .npmrc                     # pnpm configuration
├── docker-compose.yml         # Docker Compose configuration
├── package.json               # Root package.json
└── README.md                  # This file
```

- **apps/web**: React frontend using Vite, Material-UI, and Apollo Client to query the GraphQL API.
- **apps/gateway**: NestJS service exposing a GraphQL API at `http://localhost:3000/graphql`, aggregating data from `users` and `extensions`.
- **apps/users**: NestJS microservice handling user-related logic, accessible via TCP on port `3001`.
- **apps/extensions**: NestJS microservice handling extension-related logic, accessible via TCP on port `3002`.
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
- This starts all apps (`web`, `gateway`, `users`, `extensions`) using Turborepo.
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
   - Extensions Microservice: `http://localhost:3002` (internal)

3. **Stop Containers**:
   ```bash
   docker-compose down
   ```

4. **Rebuild Without Cache** (if needed):
   ```bash
   docker-compose rm -f
   docker image rm docker-monorepo-web docker-monorepo-gateway docker-monorepo-users docker-monorepo-extensions -f
   docker-compose up --build
   ```

## Usage

- **Frontend**: The `web` app is a React single-page application (SPA) built with Vite. It uses Apollo Client to query the GraphQL API at `http://localhost:3000/graphql`. Customize the UI in `apps/web/src/App.tsx`.
- **GraphQL API**: The `gateway` exposes a GraphQL endpoint at `http://localhost:3000/graphql`. Test queries like:
  ```graphql
  query {
    getExtension(id: "1")
  }
  ```
- **Microservices**: The `users` and `extensions` microservices handle specific business logic and communicate with the `gateway` via TCP.

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
  Turborepo will execute tests for all apps and packages with test scripts defined in their `package.json`.

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