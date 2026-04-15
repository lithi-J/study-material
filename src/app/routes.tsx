import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Upload } from "./components/Upload";
import { Browse } from "./components/Browse";
import { MyUploads } from "./components/MyUploads";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "home", Component: Home },
      { path: "upload", Component: Upload },
      { path: "browse", Component: Browse },
      { path: "my-uploads", Component: MyUploads },
    ],
  },
]);