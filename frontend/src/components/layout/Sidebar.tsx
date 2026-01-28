import { useNavigate, useLocation } from "react-router-dom";
import {
    Home,
    Shield,
    ShieldAlert,
    MessageSquare,
    User,
    Info
} from "lucide-react";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside className="w-64 flex-shrink-0 flex flex-col pt-16 pb-4 bg-[#1a222c] border-r border-slate-700/30">
            <nav className="flex-1 px-4 space-y-2">
                <NavItem
                    icon={<Home size={20} />}
                    label="Home"
                    onClick={() => navigate('/')}
                    active={location.pathname === '/'}
                />
                <NavItem
                    icon={<Shield size={20} />}
                    label="Pentest"
                    onClick={() => navigate('/pentest')}
                    active={location.pathname === '/pentest'}
                />
                <NavItem
                    icon={<ShieldAlert size={20} />}
                    label="SOC"
                    onClick={() => navigate('/soc')}
                    active={location.pathname === '/soc'}
                />

                <div className="my-4 border-t border-slate-700/50 mx-4"></div>
                <NavItem icon={<MessageSquare size={20} />} label="Chat" />
            </nav>

            <div className="px-4 space-y-2 mt-auto">
                <NavItem icon={<User size={20} />} label="My Account" />
                <NavItem icon={<Info size={20} />} label="About Us" />
            </div>
        </aside>
    );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
        ${active
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                    : "hover:bg-white/5 text-slate-400 hover:text-white"
                }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}
