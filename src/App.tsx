import { useState } from 'react'
import { Button } from 'antd';
import reactLogo from './assets/react.svg'
import styles from './App.module.less'
import Header from "@/components/Header/Header";

function App() {
  return (
    <div className={styles.App}>
      <div
        className={"bg-red-400"}
      >
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <Header/>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
			<Button
        type="primary"
        loading
      >
        Loading
      </Button>
    </div>
  )
}

export default App
