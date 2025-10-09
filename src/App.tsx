import AuthPage from "./components/AuthPage";
import UserProfile from "./components/UserProfile";
import Menu from "./components/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";
import NewPassword from './components/NewPassword'

export default function App({}) {
  console.log("este deploy se hizo a test");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/api/auth/reset-password/:token" element={<NewPassword />} />
      </Routes>
    </Router>
  );
}
