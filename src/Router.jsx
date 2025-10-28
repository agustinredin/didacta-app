import AuthPage from "./domain/auth/AuthPage";
import Menu from "./domain/auth/components/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./domain/auth/components/ResetPassword";
import NewPassword from "./domain/auth/components/NewPassword";
import EmailVerification from "./domain/auth/components/EmailVerification";

import Layout from "./domain/home/HomeLayout";
import HomePage from "./domain/home/HomePage";
import MonoTheme from "./MonoTheme.temp";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* rutas con layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        {/* rutas sin layout */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path={"/new-password/:token"} element={<NewPassword />} />
        <Route path="verification-email" element={<EmailVerification />} />
        {/* temp: armar y testear todo el theme */}
        <Route path="mono-theme" element={<MonoTheme />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
