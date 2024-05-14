# Paw

Paw is an application that helps match pet owners and potential pet sitters using a Tinder-like user interface. The primary user would be pet owners, who would use this app to find potential pet sitters in their area.

Our latesest deployment can be found here:
https://paw-pets.vercel.app/

## Tech Stack

This application is built with the following technologies:

- Vite for building the application
- React for the user interface
- TypeScript for static typing
- Prettier and ESLint for code formatting and linting
- Tailwind CSS for styling
- Firebase for authentication (currently email/password auth, can be expanded later)
- React Router for routing
- Deployed using Vercel

The application currently includes home, sign in, and create account pages, as well as a "protected" test page to verify authentication.

## Running Locally

To run this application locally, follow these steps:

1. Install Node.js (v20 or later recommended) if not already installed.
2. Install pnpm. Instructions can be found at https://pnpm.io/installation.
3. Pull from the repository.
4. Run `pnpm install` in the root directory of the repository.
5. Run `pnpm dev` to start the application.
6. Open http://localhost:5173/ in your browser.
