import { BrowserRouter, Routes, Route } from "react-router-dom";

import Tools from "./pages/Tools";
import ToolDetails from "./pages/ToolDetails";
import Dashboard from "./pages/Dashboard";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/pentest" element={<Tools team="Red" />} />
                <Route path="/soc" element={<Tools team="Blue" />} />

                <Route path="/tools" element={<Tools />} />
                <Route path="/tools/:id" element={<ToolDetails />} />

                {/* Optional: default route */}
                <Route path="*" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}
