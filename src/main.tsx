import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import { fetchUser, requireUser } from "./lib/auth";
import HomePage from "./routes/_index";
import CreateAccountPage from "./routes/auth.create-account";
import SignInPage from "./routes/auth.sign-in";
import ProtectedPage from "./routes/protected";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Layout />,
    loader: fetchUser,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/protected",
        element: <ProtectedPage />,
        loader: requireUser,
      },
      {
        path: "/auth/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/auth/create-account",
        element: <CreateAccountPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
