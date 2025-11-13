import MonoTheme from "./MonoTheme.temp";
import Menu from "./domain/auth/components/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./domain/auth/components/ResetPassword";
import NewPassword from "./domain/auth/components/NewPassword";
import EmailVerification from "./domain/auth/components/EmailVerification";

import HomeLayout from "./domain/home/HomeLayout";
import HomePage from "./domain/home/HomePage";

import AuthLayout from "./domain/auth/AuthLayout";
import AuthPage from "./domain/auth/AuthPage";



const AppRouter = () => {
  return (
      <Router>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/auth/login" element={<AuthPage />} />
            {/* <Route path="/menu" element={<Menu />} /> */}
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path={"/new-password/:token"} element={<NewPassword />} />
            <Route path="verification-email" element={<EmailVerification />} />
          </Route>
          {/* temp: armar y testear todo el theme */}
          <Route path="mono-theme" element={<MonoTheme />} />
        </Routes>
      </Router>
  );
};

export default AppRouter;
