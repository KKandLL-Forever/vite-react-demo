import React from 'react'
import ReactDOM from 'react-dom'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'virtual:uno.css'
import App from './App'
import './main.less'

import Synthesis from "@/pages/Synthesis/Synthesis";
import Pollution from "@/pages/Pollution/Pollution";
import Water from "@/pages/Water/Water";
import Solid from "@/pages/Solid/Solid";
import Page404 from "@/pages/ErrorPages/404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: "imc",
        element: <Synthesis/>,
      },
      {
        path: "pollution",
        element: <Pollution/>,
      },
      {
        path: "water",
        element: <Water/>,
      },
      {
        path: "solid",
        element: <Solid/>,
      },
    ],
  },
]);

const root = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <RouterProvider router={router} />,
  root
)
