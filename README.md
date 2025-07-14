# Personal Component Library

A collection of reusable React components built with Vite's library mode for personal projects.

## Overview

This is my personal component library that I use across various projects. It's built using Vite's library mode for optimal bundling and tree-shaking support.

## Installation

```bash
npm install component-library
# or
yarn add component-library
# or
pnpm add component-library
```

## Usage

```jsx
import { Button, Card, Modal } from "component-library";

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Card title="Example Card">
        <p>Card content goes here</p>
      </Card>
    </div>
  );
}
```

## Development

### Prerequisites

- Node.js 16+
- npm/yarn/pnpm

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Build the library:
   ```bash
   npm run build
   ```

### Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the library for production
- `npm run preview` - Preview the built library
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Build Configuration

This library uses Vite's library mode configuration for:

- **Optimal bundling** - Separate builds for different module formats (ESM, CJS, UMD)
- **Tree-shaking support** - Only import what you need
- **TypeScript support** - Full TypeScript definitions included
- **CSS handling** - Styles are properly bundled and can be imported separately

## Project Structure

```
src/
├── components/          # Individual components
│   ├── Button/
│   ├── Card/
│   └── Modal/
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── index.ts            # Main entry point
```

## Contributing

This is a personal library, but if you have suggestions or find issues, feel free to open an issue or submit a pull request.

## License

MIT
