import { useState, useEffect } from "react";
import ToolsGrid from "../components/tools/ToolsGrid";
import Sidebar from "../components/layout/Sidebar";
import { tools } from "../data/tools";
import {
    Home,
    Globe,
    Network,
    ShieldAlert,
    Shield,
    Menu,
    Settings,
    UserCircle,
    Search
} from "lucide-react";

interface ToolsProps {
    team?: "Red" | "Blue";
}

export default function Tools({ team }: ToolsProps) {
    const [category, setCategory] = useState("All");

    // Reset category when switching teams
    useEffect(() => {
        setCategory("All");
    }, [team]);

    const filteredTools = tools.filter((tool) => {
        const matchCategory = category === "All" || tool.category === category;
        const matchTeam = team ? tool.team === team : true;
        return matchCategory && matchTeam;
    });

    const getIconForCategory = (cat: string) => {
        switch (cat) {
            case "All": return <Home size={20} />;
            case "Web Tools": return <Globe size={20} />;
            case "Network": return <Network size={20} />;
            case "Web Security": return <Shield size={20} />;
            case "Blue Team": return <ShieldAlert size={20} />;
            default: return <Shield size={20} />;
        }
    };

    // Filter categories based on available tools for this team
    const allCategories = ["All", "Web Tools", "Web Security", "Network", "Blue Team"];
    const availableCategories = team
        ? ["All", ...Array.from(new Set(tools.filter(t => t.team === team).map(t => t.category)))]
        : allCategories;

    // Theme Config
    const themeColor = team === "Red" ? "text-red-500" : "text-cyan-500";
    const themeBg = team === "Red" ? "bg-red-500/20" : "bg-cyan-500/20";
    const themeBorder = team === "Red" ? "border-red-500/30" : "border-cyan-500/30";
    const themeShadow = team === "Red" ? "shadow-red-500/20" : "shadow-cyan-500/20";
    const themeGlow = team === "Red" ? "bg-red-500/5" : "bg-cyan-500/5";

    const pageTitle = team === "Red" ? "Pentest Operations" : team === "Blue" ? "SOC Operations" : "All Tools";

    return (
        <div className="flex h-screen bg-[#1a222c] text-slate-300 font-sans overflow-hidden">
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative overflow-hidden transition-colors duration-500">
                {/* Header */}
                <header className="h-20 flex-shrink-0 flex items-center justify-between px-8 bg-[#1a222c]/95 backdrop-blur z-10 border-b border-slate-700/30">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-white/10 rounded-lg lg:hidden">
                            <Menu size={24} />
                        </button>
                        <div className="flex items-center gap-2 font-bold tracking-wider text-xl text-white">
                            <Shield className={`fill-current ${themeColor}`} size={24} />
                            <span>CYBER <span className={themeColor}>ARENA</span></span>
                        </div>
                    </div>

                    {/* Search Bar Placeholder */}
                    <div className="flex-1 max-w-xl mx-8 relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search tools, vulnerabilities, payloads..."
                            className={`w-full bg-[#0f172a] border border-slate-700 rounded-full py-2.5 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:border-opacity-50 focus:ring-1 focus:ring-opacity-50 transition-all placeholder:text-slate-600 ${team === 'Red' ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-cyan-500 focus:ring-cyan-500'}`}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                            <Settings size={20} />
                        </button>
                        <button className="flex items-center gap-2 pl-2 pr-1 py-1 hover:bg-white/5 rounded-full transition-colors">
                            <div className={`p-1 rounded-full ${themeBg}`}>
                                <UserCircle size={24} className={themeColor} />
                            </div>
                            <span className="text-sm font-medium pr-2 hidden sm:block">Admin</span>
                        </button>
                    </div>
                </header>

                {/* Sub-Header / Filter Bar - Moved from Sidebar to here for better UX in split view */}
                <div className="px-8 py-4 border-b border-slate-700/30 flex items-center gap-4 overflow-x-auto no-scrollbar">
                    {availableCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium border
                                ${category === cat
                                    ? `${themeBg} ${themeColor} ${themeBorder} ${themeShadow} shadow-lg text-white border-transparent`
                                    : "border-slate-700 hover:bg-white/5 text-slate-400 hover:text-white hover:border-slate-600"
                                }`}
                        >
                            {getIconForCategory(cat)}
                            <span className="whitespace-nowrap">{cat}</span>
                        </button>
                    ))}
                </div>

                {/* Content Scroll Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    {/* Background ambient glow */}
                    <div className={`absolute top-0 left-0 w-full h-96 blur-[100px] pointer-events-none transition-colors duration-500 ${themeGlow}`} />

                    <div className="relative z-10 max-w-7xl mx-auto">
                        <div className="mb-8 flex items-end justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">{pageTitle}</h1>
                                <p className="text-slate-400">
                                    {category === "All" ? "Showing all available tools." : `Filtering by ${category}.`}
                                </p>
                            </div>
                            <span className="text-slate-500 text-sm font-medium bg-[#0f172a] px-3 py-1 rounded-full border border-slate-800">
                                {filteredTools.length} Tools
                            </span>
                        </div>

                        <ToolsGrid tools={filteredTools} />
                    </div>
                </main>
            </div>
        </div>
    );
}
