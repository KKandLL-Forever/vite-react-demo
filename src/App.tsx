import { Outlet } from "react-router-dom";
import styles from './App.module.less'
import Header from "@/components/Header/Header";

function App() {
  return (
    <div className="flex flex-col h-full">
      <div
        className="bg-red-400 flex justify-center"
      >
        <Header/>
      </div>
      <div
        className='flex justify-between flex-1'
      >
        <Outlet/>
      </div>
    </div>
  )
}

export default App

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
// import { Menu, Tabs } from 'antd';
// import 'antd/dist/antd.css';
//
// const { TabPane } = Tabs;
//
// const App = () => {
//   const [activeTab, setActiveTab] = useState('1');
//   const [panes, setPanes] = useState([
//     { title: 'Home', content: 'Welcome to the Home page.', key: '1', closable: false },
//   ]);
//
//   const onTabChange = (activeKey) => {
//     setActiveTab(activeKey);
//   };
//
//   const onEdit = (targetKey, action) => {
//     if (action === 'remove') {
//       const newPanes = panes.filter((pane) => pane.key !== targetKey);
//       setPanes(newPanes);
//     }
//   };
//
//   const menuClickHandler = (e) => {
//     const key = e.key;
//     const title = e.item.props.children;
//     const newPane = { title, content: `You are now at ${title}`, key, closable: true };
//
//     if (!panes.some((pane) => pane.key === key)) {
//       setPanes([...panes, newPane]);
//     }
//     setActiveTab(key);
//   };
//
//   return (
//     <Router>
//       <div style={{ display: 'flex' }}>
//         <Menu
//           mode="inline"
//           style={{ width: 256 }}
//           onClick={menuClickHandler}
//         >
//           <Menu.SubMenu key="sub1" title="Menu 1">
//             <Menu.Item key="1">Home</Menu.Item>
//             <Menu.Item key="2">Page 1</Menu.Item>
//           </Menu.SubMenu>
//           <Menu.SubMenu key="sub2" title="Menu 2">
//             <Menu.Item key="3">Page 2</Menu.Item>
//             <Menu.Item key="4">Page 3</Menu.Item>
//           </Menu.SubMenu>
//         </Menu>
//         <div style={{ flex: 1 }}>
//           <Tabs
//             activeKey={activeTab}
//             onChange={onTabChange}
//             type="editable-card"
//             onEdit={onEdit}
//           >
//             {panes.map((pane) => (
//               <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
//                 {pane.content}
//               </TabPane>
//             ))}
//           </Tabs>
//           <Routes>
//             <Route path="/" element={<div>Welcome to the Home page.</div>} />
//             <Route path="/page1" element={<div>You are now at Page 1.</div>} />
//             <Route path="/page2" element={<div>You are now at Page 2.</div>} />
//             <Route path="/page3" element={<div>You are now at Page 3.</div>} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };
//
// export default App;

