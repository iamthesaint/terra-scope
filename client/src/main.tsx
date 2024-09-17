import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home.tsx';
import Error from './pages/ErrorPage.tsx';
import Login from "./pages/Login.tsx";
import Signup from "./pages/SignUp.tsx";

const router = createBrowserRouter([

  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  }
])

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
