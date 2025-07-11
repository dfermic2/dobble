import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/Home/HomePage";
import RulesPage from "./pages/RulesPage";
import ContactPage from "./pages/Contact/ContactPage";
import PrintPage from "./pages/Print/PrintPage";
import RoomCreationPage from "./pages/RoomCreation/RoomCreationPage";
import ErrorPage from "./pages/ErrorPage";
import LobbyPage from "./pages/Lobby/LobbyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/rules",
    element: <RulesPage />,
  },
  {
    path: "/print",
    element: <PrintPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/play",
    element: <RoomCreationPage />,
  },
  { path: "/lobby", element: <LobbyPage /> },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
