import CyberLayout from '@/Layouts/CyberLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Settings, Bell, LogOut } from 'lucide-react';

export default function Edit() {
    const { auth } = usePage().props;
    const { post, processing } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    return (
        <CyberLayout title="User Profile">
            <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col pt-8">
                
                {/* Header Profile Info */}
                <div className="flex flex-col md:flex-row gap-8 mb-12 items-center md:items-end text-center md:text-left">
                    {/* Avatar Block */}
                    <div className="relative">
                        <div className="w-40 h-40 md:w-48 md:h-48 border-2 border-neon p-1 box-glow bg-black/50">
                            <img 
                                src="/images/avatar.png" 
                                alt="User Avatar" 
                                className="w-full h-full object-cover grayscale opacity-90 contrast-125"
                            />
                        </div>
                        {/* ID Tag */}
                        <div className="absolute -bottom-8 right-0 bg-neon text-black font-bold text-[10px] tracking-widest px-4 py-1 origin-top-left -rotate-90 shadow-[0_0_10px_rgba(0,255,65,0.5)]">
                            ID_9041
                        </div>
                    </div>

                    {/* Stats & Identity */}
                    <div className="flex-1 flex flex-col justify-end pb-4 items-center md:items-start mt-6 md:mt-0">
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-4">
                            <h2 className="text-3xl md:text-4xl font-black text-white">USER_9041</h2>
                            <div className="border border-neon/50 px-3 py-1 flex items-center gap-2 bg-neon/10 mt-2 md:mt-0">
                                <div className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse"></div>
                                <span className="text-[9px] text-neon tracking-widest font-bold">CORE_LINK_ACTIVE</span>
                            </div>
                        </div>
                        
                        <div className="text-xs text-neon/70 font-mono tracking-widest space-y-1">
                            <p>// PRIVILEGE_LEVEL: ADMINISTRATOR</p>
                            <p>// UPTIME: 1,421:05:22</p>
                        </div>
                    </div>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 w-full">
                    <div className="border border-neon/30 p-4 bg-black/80 hover:bg-neon/5 transition-colors">
                        <span className="text-[9px] text-neon/60 tracking-widest block mb-2">NÍVEL</span>
                        <div className="text-3xl font-bold text-neon text-glow flex items-baseline gap-1">
                            12 <span className="text-[9px] text-neon/50">XP_MAX</span>
                        </div>
                    </div>
                    <div className="border border-neon/30 p-4 bg-black/80 hover:bg-neon/5 transition-colors">
                        <span className="text-[9px] text-neon/60 tracking-widest block mb-2">STREAK</span>
                        <div className="text-3xl font-bold text-white flex items-baseline gap-1">
                            5 <span className="text-[9px] text-neon/50">DIAS</span>
                        </div>
                    </div>
                    <div className="border border-neon/30 p-4 bg-black/80 hover:bg-neon/5 transition-colors">
                        <span className="text-[9px] text-neon/60 tracking-widest block mb-2">EFICIÊNCIA</span>
                        <div className="text-3xl font-bold text-white flex items-baseline gap-1">
                            98.2 <span className="text-[9px] text-neon/50">%</span>
                        </div>
                    </div>
                    <div className="border border-neon/30 p-4 bg-black/80 hover:bg-neon/5 transition-colors">
                        <span className="text-[9px] text-neon/60 tracking-widest block mb-2">TOTAL FOCO</span>
                        <div className="text-3xl font-bold text-white flex items-baseline gap-1">
                            154 <span className="text-[9px] text-neon/50">H_LOGGED</span>
                        </div>
                    </div>
                </div>

                {/* System Parameters Menu */}
                <div className="w-full">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-neon font-bold text-xs tracking-widest">001</span>
                        <h3 className="text-[10px] text-white/50 tracking-widest uppercase">System_Parameters</h3>
                        <div className="flex-1 h-px bg-neon/20"></div>
                    </div>

                    <div className="flex flex-col border border-neon/20 bg-black/80">
                        
                        <Link href="#" className="flex items-center justify-between p-5 border-b border-neon/10 hover:bg-neon/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <Settings size={20} className="text-white/70 group-hover:text-neon transition-colors" />
                                <span className="text-sm font-bold tracking-widest text-white/90 group-hover:text-white">Configurações</span>
                            </div>
                            <div className="text-neon/50 group-hover:text-neon transition-colors">&gt;</div>
                        </Link>

                        <Link href="#" className="flex items-center justify-between p-5 border-b border-neon/10 hover:bg-neon/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <Bell size={20} className="text-white/70 group-hover:text-neon transition-colors" />
                                <span className="text-sm font-bold tracking-widest text-white/90 group-hover:text-white">Notificações</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="bg-neon text-black text-[9px] font-bold px-2 py-0.5 tracking-widest box-glow">3 NEW</span>
                                <div className="text-neon/50 group-hover:text-neon transition-colors">&gt;</div>
                            </div>
                        </Link>

                        <button 
                            onClick={handleLogout}
                            disabled={processing}
                            className="flex items-center justify-between p-5 hover:bg-[#ff5555]/10 transition-colors group w-full text-left"
                        >
                            <div className="flex items-center gap-4">
                                <LogOut size={20} className="text-[#ff5555]/70 group-hover:text-[#ff5555] transition-colors" />
                                <span className="text-sm font-bold tracking-widest text-[#ff5555]/90 group-hover:text-[#ff5555]">Sair</span>
                            </div>
                            <div className="text-[#ff5555]/50 group-hover:text-[#ff5555] text-[9px] tracking-widest transition-colors">
                                DISCONNECT_CORE
                            </div>
                        </button>

                    </div>
                </div>

            </div>
        </CyberLayout>
    );
}
