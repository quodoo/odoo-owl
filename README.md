# Odoo OWL + Vite Project

A modern frontend project template using Odoo OWL framework with Vite, Docker, and hot reload for development and production.

---

## Application Structure

```
odoo-owl/
├── build.sh                # Script to build static files using Docker multi-stage
├── docker-compose.yml      # Docker Compose for development (hot reload)
├── docker-compose.prd.yml  # Docker Compose for production (Nginx serve static)
├── Dockerfile              # Dockerfile for development (Vite dev server)
├── Dockerfile.prod         # Dockerfile for production (multi-stage build)
├── index.html              # Main HTML entry point
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
├── public/                 # Static public assets (favicon, images, ...)
│   └── vite.svg
├── src/                    # Source code
│   ├── App.js
│   ├── main.js
│   ├── style.css
│   ├── style.scss
│   └── components/
│       └── HelloWorld.js
└── dist/                   # (Generated) Static build output for production
```

---

## Development

1. **Start development server with hot reload:**

   ```sh
   docker compose up --build
   ```
   - Access: http://localhost:5173
   - All changes in the source code will automatically reload.

2. **Stop development server:**

   ```sh
   docker compose down
   ```

---

## Production

1. **Build and run production server (Nginx serve static):**

   ```sh
   docker compose -f docker-compose.prd.yml up --build
   ```
   - Access: http://localhost

2. **Stop production server:**

   ```sh
   docker compose -f docker-compose.prd.yml down
   ```

---

## Build Static Files (dist) for Deploy/Cloud

1. **Build static files using Docker multi-stage:**

   ```sh
   ./build.sh
   ```
   - The `dist/` folder will contain all static files ready to upload to the cloud or another server.

---

## Notes
- **No need to install Node.js locally, just Docker is required.**
- **You can develop OWL components with Vite, then extract XML templates to integrate into Odoo if needed.**
- **Project structure is clear and easily extendable for both development and production.**

---

## License
MIT
