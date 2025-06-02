import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/Home/HomePage";
import RulesPage from "./pages/RulesPage";
import ContactPage from "./pages/Contact/ContactPage";
import PrintPage from "./pages/Print/PrintPage";
import PlayEntryPage from "./pages/PlayEntryPage";
import ErrorPage from "./pages/ErrorPage";

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
    element: <PlayEntryPage />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
