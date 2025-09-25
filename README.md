# React TypeScript Project with TailwindCSS

A modern React application built with TypeScript, TailwindCSS, ESLint, and Prettier.

## Features

- ⚡ **Vite** - Fast build tool and development server
- ⚛️ **React 19** - Latest React version with TypeScript support
- 🎨 **TailwindCSS** - Utility-first CSS framework
- 🔧 **TypeScript** - Static type checking
- 📏 **ESLint** - Code linting with TypeScript and React rules
- 💅 **Prettier** - Code formatting
- 🚀 **Hot Module Replacement** - Fast development experience

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── App.tsx             # Main App component
├── main.tsx            # Entry point
└── index.css           # Global styles with TailwindCSS
```

## Configuration Files

- `.eslintrc.json` - ESLint configuration
- `.prettierrc.json` - Prettier configuration
- `tailwind.config.js` - TailwindCSS configuration
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite configuration

## VS Code Setup

This project includes VS Code settings for optimal development experience:

- Auto-format on save
- ESLint integration
- TailwindCSS IntelliSense
- TypeScript support

### Recommended Extensions

- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- TypeScript Importer

## Contributing

1. Follow the existing code style
2. Run `npm run lint` and `npm run format` before committing
3. Ensure all TypeScript types are properly defined

## License

This project is licensed under the MIT License.