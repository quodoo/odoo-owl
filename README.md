# Odoo OWL Project Template

A modern frontend project template using Odoo OWL framework with webpack configuration.

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
├── public/               # Static files
├── tests/                # Test files
└── config/              # Configuration files
```

## Features

- **Modern Architecture**: Follows Odoo OWL best practices and conventions
- **Component Organization**: Clear separation between common and specific components
- **State Management**: Centralized state management in stores directory
- **Business Logic**: Isolated business logic in services
- **Custom Hooks**: Reusable hooks for common functionalities
- **Asset Management**: Structured organization of styles, images, and fonts
- **Maintainable Structure**: Easy to scale and maintain
- **Development Tools**:
  - Webpack for bundling
  - SASS support
  - Hot Module Replacement
  - Source maps
  - ESLint for code quality
  - Absolute imports

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
cd odoo-owl
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Directory Details

### `/src/components`
- `common/`: Reusable components like buttons, inputs, modals
- `specific/`: Feature-specific components tied to business logic

### `/src/layouts`
Layout components that define the structure of pages

### `/src/pages`
Page components that compose layouts and components

### `/src/hooks`
Custom OWL hooks for shared component logic

### `/src/services`
API calls and business logic implementation

### `/src/stores`
State management using OWL's reactive system

### `/src/utils`
Helper functions, constants, and utility code

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

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run test`: Run tests

## Configuration

- Webpack configuration in `webpack.config.js`
- Path aliases in `jsconfig.json`
- ESLint configuration in `.eslintrc.js`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[Your License Here]
