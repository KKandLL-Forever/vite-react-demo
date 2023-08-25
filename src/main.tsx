import ReactDOM from 'react-dom'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Provider } from 'react-redux';
import store from './store'

import '@/styles/leaflet-custom.css';
import './main.less'
import 'virtual:uno.css'
import App from './App'
import Boot from '@/store/boot';
import "@/styles/common.less";
//
//
import Synthesis from "@/pages/Synthesis/Synthesis";
import Pollution from "@/pages/Pollution/Pollution";
import Water from "@/pages/Water/Water";
import Solid from "@/pages/Solid/Solid";
import G6Test from "@/pages/G6/G6Test";
import Charts from '@/pages/Charts/Charts'
// import L7Map from "@/components/L7Map/L7Map";

import Page404 from "@/pages/ErrorPages/404";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Page404 />,
    children: [
      // {
      //   path: "imc",
      //   element: <Synthesis/>,
      // },
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
      {
        path: "g6",
        element: <G6Test/>,
      },
      {
        path: "charts",
        element: <Charts/>,
      },
      // {
      //   path: "map",
      //   element: <L7Map/>,
      // },
    ],
  },
  {
    path: '/test',
    element: <Synthesis/>,
    errorElement: <Page404 />,
  }
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




// import React from 'react';
// import type { TabsProps } from 'antd';
// import { Tabs } from 'antd';
//
// const {TabPane} = Tabs
//
// const onChange = (key: string) => {
//   console.log(key);
// };
//
// const items: TabsProps['items'] = [
//   {
//     key: '1',
//     label: `Tab 1`,
//   },
//   {
//     key: '2',
//     label: `Tab 2`,
//   },
//   {
//     key: '3',
//     label: `Tab 3`,
//   },
// ];
//
// const App: React.FC = () =>
//   <Tabs defaultActiveKey="1" items={items} onChange={onChange}>
//     <TabPane>
//       123
//     </TabPane>
//   </Tabs>;
//
// export default App;

// const root = document.getElementById('root') as HTMLElement;
// ReactDOM.render(
//   <App/>,
//   root
// )
