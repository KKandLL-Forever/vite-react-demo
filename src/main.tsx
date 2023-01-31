import React from 'react'
import ReactDOM from 'react-dom'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Provider } from 'react-redux';
import store from './store'

import './main.less'
import 'virtual:uno.css'
import App from './App'
import Boot from '@/store/boot';

import Synthesis from "@/pages/Synthesis/Synthesis";
import Pollution from "@/pages/Pollution/Pollution";
import Water from "@/pages/Water/Water";
import Solid from "@/pages/Solid/Solid";
// import L7Map from "@/components/L7Map/L7Map";

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
      // {
      //   path: "map",
      //   element: <L7Map/>,
      // },
    ],
  },
]);

const root = document.getElementById('root') as HTMLElement;

const RootApp = () => (
  <ConfigProvider locale={ zhCN }>
    <Provider store={ store }>
      <RouterProvider router={router}/>
    </Provider>
  </ConfigProvider>
)
Boot().then(() => RootApp)
ReactDOM.render(
  <RootApp/>,
  root
)
