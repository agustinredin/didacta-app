import AuthPage from "./components/AuthPage";
import UserProfile from "./components/UserProfile";
import Menu from "./components/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";
import NewPassword from "./components/NewPassword";
import EmailVerification from "./components/EmailVerification";
import TestGoogleHint from './components/TestGoogleHint'

export default function App({}) {
  console.log("este deploy se hizo a test");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* //TODO: renombrar */}
        <Route
          path={"/new-password/:token"}
          element={<NewPassword />}
        />
        <Route path="verification-email" element={<EmailVerification />} />
        <Route path="google-hint" element={<TestGoogleHint />} />
      </Routes>
    </Router>
  );
}
