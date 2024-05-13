import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "~/global.css";

import Layout from "~/components/layout";
import LoadingScreen from "~/components/loading";
import { fetchUser, requireUser } from "~/lib/auth";
import HomePage from "~/routes/_index";
import CreateAccountPage from "~/routes/auth.create-account";
import MessagesPage from "~/routes/messages"; 
import SignInPage from "~/routes/auth.sign-in";
import Contact from "~/routes/contact";
import Petsitter from "~/routes/petsitter";
import Profile from "~/routes/profile";

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
      {
        path: "/Petsitter",
        element: <Petsitter />,
        loader: requireUser,
      },
      {
        path: "/Contact",
        element: <Contact />,
        loader: requireUser,
      },
      {
        path: "/Profile",
        element: <Profile />,
        loader: requireUser,
      },
      {
        path: "/messages",  // Define the path for your messages page
        element: <MessagesPage />,
        loader: requireUser  // Optional: Add loader if authentication is required
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
  </React.StrictMode>,
);
