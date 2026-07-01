# Project: ep-feb-unpas

This project is a React-based website for FEB UNPAS (Fakultas Ekonomi dan Bisnis, Universitas Pasundan).

## Technology Stack

*   **Framework:** React (Vite)
*   **Styling:** Tailwind CSS
*   **Routing:** React Router
*   **Internationalization:** i18next
*   **Animations:** Framer Motion
*   **Form Handling:** EmailJS (for contact forms)

## Development

### Prerequisites

*   Node.js (LTS version recommended)
*   npm

### Commands

*   `npm install` - Install dependencies
*   `npm run dev` - Start development server
*   `npm run build` - Build for production
*   `npm run preview` - Preview production build

## Project Conventions

*   **File Structure:**
    *   `src/components`: Reusable UI components.
    *   `src/pages`: Main application pages/routes.
    *   `src/locales`: Translation files (`en.json`, `id.json`).
    *   `src/hooks`: Custom React hooks.
*   **Styling:** Use Tailwind utility classes. Avoid arbitrary CSS unless necessary.
*   **Internationalization:** All user-facing text should be internationalized using `i18next`.

## Operational Rules
*   **Visual Integrity:** Absolutely no changes should be made that alter the existing layout, styling, or responsiveness of the website unless explicitly part of a redesign task.
*   **Data Preservation:** No data (assets, text, configuration) should be removed unless it is verified as completely unused throughout the entire project. When in doubt, prioritize retention over deletion.
