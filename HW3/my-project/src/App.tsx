import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NaviBar from './NavigationBar/NaviBar';
import ProductList from './list/ProductList.tsx';

function App() {
  

  return (
    <>
        <div>
          <NaviBar />
          <ProductList />
        </div>
    </>
  )
}

export default App
