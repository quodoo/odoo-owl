# Odoo OWL Project Template

A modern frontend project template using Odoo OWL framework with webpack configuration and Docker setup.

## Project Architecture

```
odoo-owl/
├── src/
│   ├── assets/
│   │   ├── scss/         # Global styles, variables, mixins
│   │   ├── images/       # Image assets
│   │   └── fonts/        # Font files
│   ├── components/
│   │   ├── common/       # Shared/reusable components
│   │   └── specific/     # Feature-specific components
│   ├── layouts/          # Layout components (Header, Footer, etc.)
│   ├── pages/            # Page components
│   ├── hooks/            # Custom OWL hooks
│   ├── services/         # API calls, business logic
│   ├── stores/           # State management
│   └── utils/            # Helper functions, constants
├── dist/                 # Build output
├── nginx.conf           # Nginx configuration
├── Dockerfile           # Node.js development environment
├── docker-compose.yml   # Docker services configuration
└── webpack.config.js    # Webpack configuration
```

## Features

- **Docker Setup**: Complete development environment with Node.js and Nginx
- **Modern Architecture**: Follows Odoo OWL best practices and conventions
- **Hot Module Replacement**: Live reload with WebSocket support
- **Nginx Reverse Proxy**: Production-grade web server configuration
- **Development Tools**:
  - Webpack 5 for bundling
  - SASS support
  - ESLint for code quality
  - Absolute imports
  - Source maps

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
cd odoo-owl
```

2. Start the Docker environment
```bash
docker-compose up --build
```

The application will be available at:
- http://localhost (Nginx proxy)
- http://localhost:8080 (Direct webpack dev server)

## Docker Services

### Development Server (odoo-owl)
- Node.js development environment
- Webpack dev server with hot reload
- Mounted volumes for live code updates
- Runs on port 8080

### Web Server (nginx)
- Nginx reverse proxy
- Static file serving
- WebSocket proxy for hot reload
- Runs on port 80

## Development Guidelines

1. Use absolute imports with configured aliases
2. Follow component naming conventions:
   - Components: PascalCase
   - Files: PascalCase.js
   - Styles: PascalCase.scss
3. Keep components small and focused
4. Use common components whenever possible
5. Implement business logic in services
6. Manage state in stores

## Available Scripts

Inside Docker container:
```bash
# Development server
docker-compose up

# Lint files
docker-compose exec odoo-owl npm run lint

# Build for production
docker-compose exec odoo-owl npm run build
```

Local development:
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix ESLint errors automatically

## Configuration Files

- `webpack.config.js`: Webpack bundler configuration
- `nginx.conf`: Nginx reverse proxy settings
- `Dockerfile`: Node.js development environment
- `docker-compose.yml`: Multi-container Docker setup
- `.eslintrc.js`: ESLint rules and settings

## ESLint Configuration

Current ESLint rules:
- Enforces semicolons
- Uses single quotes
- Warns on unused variables
- Warns on console statements

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[Open Source](LICENSE)
