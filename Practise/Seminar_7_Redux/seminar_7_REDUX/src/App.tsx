import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import UserDetail from './components/UserDetails'
import UserList from './components/UserList'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:userId" element={<UserDetail />} />
      </Routes>
    </Router>
  )
}

export default App
