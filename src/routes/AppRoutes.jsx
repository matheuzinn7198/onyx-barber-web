import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Booking from "../pages/Booking/Booking";
import Profile from "../pages/Profile/Profile";
import Loyalty from "../pages/Loyalty/Loyalty";
import Dashboard from "../pages/Dashboard/Dashboard";
import Services from "../pages/Services/Services";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ForgotPasswordSuccess from "../pages/ForgotPasswordSuccess/ForgotPasswordSuccess";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import PasswordSuccess from "../pages/PasswordSuccess/PasswordSuccess";
import History from "../pages/History/History";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/cadastro" element={<Register />} />

        <Route path="/agendamento" element={<Booking />} />

        <Route path="/perfil" element={<Profile />} />

        <Route path="/fidelidade" element={<Loyalty />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/servicos" element={<Services />} />

        <Route path="/recuperar-senha" element={<ForgotPassword />} />

        <Route path="/email-enviado" element={<ForgotPasswordSuccess />} />
        
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/password-success" element={<PasswordSuccess />} />

        <Route path="/history" element={<History />} />

        <Route path="/loyalty" element={<Loyalty />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;