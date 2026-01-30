import { useNavigate, useLocation } from "react-router-dom";
import {
    Home,
    Shield,
    ShieldAlert,
    MessageSquare,
    User,
    Info,
    LogOut
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

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
                {/* User Info */}
                {user && (
                    <div className="px-4 py-3 mb-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                                <User size={16} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user.username}</p>
                                <p className="text-xs text-slate-400 truncate">{user.email}</p>
                            </div>
                        </div>
                    </div>
                )}

                <NavItem icon={<Info size={20} />} label="About Us" />
                <NavItem
                    icon={<LogOut size={20} />}
                    label="Logout"
                    onClick={handleLogout}
                />
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
