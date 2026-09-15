import { Routes, Route } from "react-router-dom";
import Register from "@/pages/auth/Register";
import Login from "../pages/auth/Login";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import Er from "@/pages/Er";

function AppRoutes() {
     return (
          <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/register" element={<Register />} />
               <Route path="/login" element={<Login />} />
               <Route path="/er" element={<Er />} />
               <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
               </Route>
          </Routes>
     );
}

export default AppRoutes;
