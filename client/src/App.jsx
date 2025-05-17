import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import RulesPage from "./pages/RulesPage";
import ContactPage from "./pages/ContactPage";
import PrintPage from "./pages/PrintPage";
import PlayEntryPage from "./pages/PlayEntryPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    //    errorElement: <ErrorPage />,
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
