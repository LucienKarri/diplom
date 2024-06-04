import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, Layout, ProfilePage } from "./pages";
import {
  ClientsPage,
  DealingsPage,
  EmployeesPage,
  RequestsPage,
  VehiclePage,
} from "./pages/ProfilePage/pages";
import { PostManagmentPage } from "./pages/ProfilePage/pages/PostManagmentPage";
import { IntroPage } from "./pages/IntroPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <IntroPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        children: [
          {
            index: true,
          },
          {
            path: "/profile/vehicle",
            element: <VehiclePage />,
          },
          {
            path: "/profile/requests",
            element: <RequestsPage />,
          },
          {
            path: "/profile/dealings",
            element: <DealingsPage />,
          },
          {
            path: "/profile/employees",
            element: <EmployeesPage />,
          },
          {
            path: "/profile/clients",
            element: <ClientsPage />,
          },
          {
            path: "/profile/posts",
            element: <PostManagmentPage />,
          },
        ],
      },
    ],
  },
]);
