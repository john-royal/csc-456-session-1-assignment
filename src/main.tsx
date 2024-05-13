import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "~/global.css";

import Layout from "~/components/layout";
import LoadingScreen from "~/components/loading";
import { fetchUser, requireUser } from "~/lib/auth";
import HomePage from "~/routes/_index";
import CreateAccountPage from "~/routes/auth.create-account";
import SignInPage from "~/routes/auth.sign-in";
import Contact from "~/routes/contact";
import MessagesIndex from "~/routes/messages";
import MessagesPage from "~/routes/messages.$id";
import Petsitter from "~/routes/petsitter";
import Profile from "~/routes/profile";
import Account from "~/routes/account";

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

        path: "/Account",
        element: <Account />,
        loader: requireUser,
      },
 
        path: "/messages",
        element: <MessagesIndex />,
        loader: requireUser,
        children: [
          {
            path: "/messages/:id",
            element: <MessagesPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<LoadingScreen />} />
  </React.StrictMode>,
);
