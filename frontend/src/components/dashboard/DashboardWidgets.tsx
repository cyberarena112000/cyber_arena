import { motion } from "framer-motion";
import { Activity, Shield, Wifi, Database, Terminal, Clock } from "lucide-react";

export function StatCard({ label, value, trend, icon: Icon, color }: { label: string, value: string, trend?: string, icon: any, color: "blue" | "red" | "green" | "purple" }) {
    const colorClasses = {
        blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        red: "text-red-500 bg-red-500/10 border-red-500/20",
        green: "text-green-500 bg-green-500/10 border-green-500/20",
        purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-2xl bg-[#1e293b]/50 border ${colorClasses[color].split(" ")[2]} backdrop-blur-sm relative overflow-hidden`}
        >
            <div className={`absolute top-0 right-0 p-4 opacity-20 ${colorClasses[color].split(" ")[0]}`}>
                <Icon size={48} />
            </div>
            <div className="relative z-10">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${colorClasses[color].split(" ")[1]}`}>
                    <Icon size={20} className={colorClasses[color].split(" ")[0]} />
                </div>
                <h3 className="text-slate-400 text-sm font-medium">{label}</h3>
                <div className="flex items-end gap-2 mt-1">
                    <span className="text-2xl font-bold text-white">{value}</span>
                    {trend && <span className="text-xs text-green-400 mb-1">{trend}</span>}
                </div>
            </div>
        </motion.div>
    );
}

export function ActivityFeed() {
    const activities = [
        { id: 1, action: "Vulnerability Scan", target: "192.168.1.105", time: "2m ago", type: "scan" },
        { id: 2, action: "Exploit Attempt", target: "Web Server 01", time: "15m ago", type: "alert" },
        { id: 3, action: "SSH Login", target: "Gateway", time: "1h ago", type: "info" },
        { id: 4, action: "Database Dump", target: "SQL-Prod", time: "2h ago", type: "scan" },
    ];

    return (
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm h-full">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Activity size={18} className="text-cyan-500" />
                Live Activity Feed
            </h3>
            <div className="space-y-4">
                {activities.map((item) => (
                    <div key={item.id} className="flex gap-3 items-start p-3 rounded-lg hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-cyan-500/50">
                        <div className={`mt-1 p-1.5 rounded-full ${item.type === 'scan' ? 'bg-blue-500/20 text-blue-400' :
                            item.type === 'alert' ? 'bg-red-500/20 text-red-400' : 'bg-slate-500/20 text-slate-400'
                            }`}>
                            {item.type === 'scan' ? <Wifi size={12} /> :
                                item.type === 'alert' ? <Shield size={12} /> : <Terminal size={12} />}
                        </div>
                        <div>
                            <p className="text-sm text-slate-300 font-medium">{item.action}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                <span>{item.target}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-700" />
                                <span className="flex items-center gap-1"><Clock size={10} /> {item.time}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function SystemStatus() {
    return (
        <div className="bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Database size={18} className="text-purple-500" />
                System Health
            </h3>
            <div className="space-y-4">
                <StatusItem label="CPU Usage" value={42} color="bg-blue-500" />
                <StatusItem label="Memory" value={68} color="bg-purple-500" />
                <StatusItem label="Network" value={24} color="bg-green-500" />
                <StatusItem label="Storage" value={12} color="bg-orange-500" />
            </div>
        </div>
    );
}

function StatusItem({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div>
            <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{label}</span>
                <span className="text-slate-300">{value}%</span>
            </div>
            <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${color}`}
                />
            </div>
        </div>
    );
}
