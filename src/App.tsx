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
