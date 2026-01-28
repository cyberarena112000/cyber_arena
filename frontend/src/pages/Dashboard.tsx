import Sidebar from "../components/layout/Sidebar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ShieldAlert, Target, Wifi, Zap, Lock } from "lucide-react";
import { StatCard, ActivityFeed, SystemStatus } from "../components/dashboard/DashboardWidgets";

export default function Dashboard() {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="flex h-screen bg-[#0f172a] text-slate-300 font-sans overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col relative overflow-hidden backdrop-blur-3xl">
                {/* Ambient Background */}
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

                <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="max-w-7xl mx-auto space-y-6"
                    >
                        {/* Header Section */}
                        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-1">
                                    Operator Console <span className="text-cyan-500">v2.0</span>
                                </h1>
                                <p className="text-slate-400">Welcome back, Administrator. Systems operational.</p>
                            </div>
                            <div className="flex items-center gap-2 bg-[#1e293b]/80 border border-slate-700 pk-2 py-1.5 px-3 rounded-full">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-sm font-medium text-green-400">System Online</span>
                            </div>
                        </motion.div>

                        {/* Stats Grid */}
                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard icon={Target} label="Active Targets" value="12" trend="+3 new" color="red" />
                            <StatCard icon={ShieldAlert} label="Vulnerabilities" value="84" trend="12 critical" color="blue" />
                            <StatCard icon={Wifi} label="Network Traffic" value="1.2 TB" trend="Stable" color="green" />
                            <StatCard icon={Zap} label="Threat Level" value="ELEVATED" color="purple" />
                        </motion.div>

                        {/* Main Operations & Layout Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
                            {/* Operations Column (Span 2) */}
                            <motion.div variants={itemVariants} className="lg:col-span-2 grid grid-rows-2 gap-4 h-full">
                                {/* Red Team Card */}
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => navigate('/pentest')}
                                    className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950/30 to-[#1e293b] border border-red-500/10 hover:border-red-500/30 transition-all shadow-lg shadow-black/20"
                                >
                                    <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute -right-20 -top-20 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
                                        <Target size={300} className="text-red-500" />
                                    </div>

                                    <div className="p-8 h-full flex flex-col justify-center relative z-10">
                                        <div className="bg-red-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-red-500">
                                            <Shield size={28} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Pentest Operations</h2>
                                        <p className="text-slate-400 max-w-md">Launch offensive security campaigns, manage targets, and execute automated scans.</p>
                                    </div>
                                </motion.div>

                                {/* Blue Team Card */}
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => navigate('/soc')}
                                    className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950/30 to-[#1e293b] border border-blue-500/10 hover:border-blue-500/30 transition-all shadow-lg shadow-black/20"
                                >
                                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute -right-20 -top-20 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
                                        <ShieldAlert size={300} className="text-blue-500" />
                                    </div>

                                    <div className="p-8 h-full flex flex-col justify-center relative z-10">
                                        <div className="bg-blue-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-blue-500">
                                            <Lock size={28} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">SOC Operations</h2>
                                        <p className="text-slate-400 max-w-md">Monitor network defense, analyze logs, and respond to security incidents.</p>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Sidebar Column (Stats & Activity) */}
                            <motion.div variants={itemVariants} className="space-y-4 h-full flex flex-col">
                                <div className="flex-1">
                                    <ActivityFeed />
                                </div>
                                <div>
                                    <SystemStatus />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
