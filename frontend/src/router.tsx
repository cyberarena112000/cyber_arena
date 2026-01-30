import { BrowserRouter, Routes, Route } from "react-router-dom";

import Tools from "./pages/Tools";
import ToolDetails from "./pages/ToolDetails";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/pentest" element={<ProtectedRoute><Tools team="Red" /></ProtectedRoute>} />
                <Route path="/soc" element={<ProtectedRoute><Tools team="Blue" /></ProtectedRoute>} />
                <Route path="/tools" element={<ProtectedRoute><Tools /></ProtectedRoute>} />
                <Route path="/tools/:id" element={<ProtectedRoute><ToolDetails /></ProtectedRoute>} />

                {/* Default route */}
                <Route path="*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}
