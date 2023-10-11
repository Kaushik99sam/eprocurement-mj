import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TableFun from './table/TableFun'
import Table2 from './table/Table2'

function App() {
  const [count, setCount] = useState(0)

  return (
    <TableFun />
  )
}

export default App
