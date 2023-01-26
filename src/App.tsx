import { Outlet } from "react-router-dom";
import styles from './App.module.less'
import Header from "@/components/Header/Header";

function App() {
  return (
    <div className={styles.App}>
      <div
        className="bg-red-400 flex justify-center"
      >
        <Header/>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default App
