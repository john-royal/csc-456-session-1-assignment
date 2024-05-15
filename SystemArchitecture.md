# Paw Architecture

## 1. Component Diagram

Paw is a React single-page application (SPA) with a Firebase backend. As a SPA, the application consists primarily of static HTML, CSS, and JavaScript assets, which are hosted by Vercel. The application integrates the Firebase JS SDK, which uses a combination of HTTP and websocket connections to communicate with the Firebase backend. A variety of Firebase services are used, including Firebase Auth for user authentication, Firebase Cloud Firestore for data storage, and Firebase Storage for file storage.

![Component Diagram](./docs/component-diagram.png)
