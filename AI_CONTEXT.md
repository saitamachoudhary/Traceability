# Project Context

## Project Overview
- **Project name:** Traceability
- **Purpose / what it does:** An enterprise-grade industrial workflow and dashboard application, currently featuring an "Enquiry to Offer" module. It serves as a data-dense, professional portal with an SAP Fiori-inspired modern industrial engineering aesthetic.
- **Tech stack (languages, frameworks, libraries):** React 19, Vite 8, Tailwind CSS v4, React Router DOM, Lucide React icons.
- **Package manager:** npm
- **Entry point file:** `index.html` -> `src/main.jsx`

## Project Structure
- `src/assets/`: Contains static assets like images and global resources.
- `src/components/`: Reusable UI components. Includes sub-modules like `e2o/` which houses components specifically for the "Enquiry to Offer" page (e.g., `KPICards.jsx`).
- `src/pages/`: Page-level components corresponding to different application routes.
- `src/App.jsx`: The root React component handling routing and high-level layout wrappers.
- `src/index.css`: Global CSS file containing Tailwind configuration and core enterprise design tokens (e.g., spacing variables, color palettes).
- `package.json` & `vite.config.js`: Configuration files for dependencies, build, and development server.

## Current State
- **What has been built so far:** A responsive, high-fidelity enterprise homepage (featuring a fixed navigation bar, hero section, and 2x2 module selection grid) and the "Enquiry to Offer" dashboard (featuring a 12-column grid layout, KPI metric cards, a conversion rate widget, filter bars, and a data-driven table).
- **What is working:** The core UI layout, responsive grid scaling (both mobile and desktop), the development environment, and Tailwind styling are completely operational.
- **What is broken or incomplete:** The "Conversion Rate" widget mini-chart is currently using a placeholder block layout instead of a fully functional charting library. Real data integrations are also pending (currently using static placeholders).

## Active Task
- **What we are currently working on:** Establishing persistent AI context for the project.
- **The exact goal of the current session:** Create and populate `AI_CONTEXT.md` to ensure a continuous handover between AI coding assistants.

## Decisions & Conventions
- **Coding style and formatting rules:** Uses React functional components. Styling is primarily handled via Tailwind CSS utility classes in the `className` attribute.
- **Naming conventions:** PascalCase for React component files (e.g., `KPICards.jsx`).
- **Any architectural decisions made and why:** 
  - **Design System:** Strict adherence to an "SAP Fiori-inspired" modern industrial aesthetic, featuring a standardized 8px spacing system and accessibility-focused custom color palette.
  - **Layout:** Dashboards are strictly top-aligned with a bottom-aligned footer, moving away from vertical centering. Components heavily use a 12-column grid (`grid-cols-12`) for standardized enterprise layout flow.
- **Things we decided NOT to do and why:** Avoid basic, generic designs. The application must look premium, highly dynamic, and data-dense, which is why standard defaults were overridden in favor of customized enterprise design tokens.

## Commands
- **How to install dependencies:** `npm install`
- **How to run the project:** `npm run dev`
- **How to build:** `npm run build`
- **How to run tests:** 

## Known Issues & TODOs
- Replace the CSS-based mini-chart placeholder in `KPICards.jsx` with a real charting implementation.
- Wire up backend data or context providers for the KPI metrics and data tables.

## Conversation History Summary
- Initialized the Vite/React project and set up Tailwind CSS v4.
- Scaffolded an enterprise Traceability dashboard architecture, focusing on a robust routing and layout system.
- Designed a corporate industrial workflow selection homepage with a 2x2 grid module picker.
- Migrated from generic custom CSS to a strict Tailwind configuration, aligning with enterprise design tokens.
- Developed the "Enquiry to Offer" page, building out a top blue module header, filter toolbar, robust data table component, and a pixel-perfect KPI dashboard (`KPICards.jsx`).
