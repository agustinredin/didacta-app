import AuthPage from "./components/AuthPage";
import UserProfile from './components/UserProfile'
import Menu from './components/Menu'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export default function App({ ejemplo }) {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage/>} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/menu" element={<Menu/>} />
      </Routes>
    </Router>
  )
}
