import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Booking from "../pages/Booking/Booking";
import Profile from "../pages/Profile/Profile";
import Loyalty from "../pages/Loyalty/Loyalty";
import Dashboard from "../pages/Dashboard/Dashboard";
import Services from "../pages/Services/Services";

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

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;