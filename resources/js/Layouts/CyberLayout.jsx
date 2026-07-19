import { Head, Link, usePage } from '@inertiajs/react';
import { Terminal, History, User as UserIcon, Network } from 'lucide-react';

export default function CyberLayout({ children, title }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-black text-neon font-mono flex flex-col md:flex-row bg-grid-pattern relative pb-16 md:pb-0">
            <Head title={title || "OS_V2.0.4"} />
            
            {/* Sidebar Esquerda (Desktop) */}
            <aside className="hidden md:flex w-64 border-r border-neon/30 bg-black/90 flex-col z-10 shrink-0">
                {/* Logo Area */}
                <div className="p-6 border-b border-neon/30 flex items-center gap-3">
                    <div className="w-8 h-8 border border-neon flex items-center justify-center rounded-sm">
                        <Terminal size={18} className="text-neon" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl leading-none">CODE</h1>
                        <span className="text-[10px] text-neon/70">OS_V2.0.4</span>
                    </div>
                </div>

                {/* User Info */}
                <div className="p-4 border-b border-neon/30 flex items-center gap-3">
                    <div className="w-8 h-8 border border-neon/50 flex items-center justify-center">
                        <UserIcon size={16} className="text-neon/70" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-neon">{auth.user.name.toUpperCase()}</span>
                        <span className="text-[10px] text-neon/50">NODE_01</span>
                    </div>
                </div>

                {/* Nav Menu */}
                <nav className="flex-1 py-6 px-4 flex flex-col gap-4">
                    <Link 
                        href={route('dashboard')} 
                        className={`flex items-center gap-3 transition-colors ${route().current('dashboard') ? 'text-neon font-bold' : 'text-neon/60 hover:text-neon'}`}
                    >
                        <Terminal size={18} />
                        <span className="text-sm">TIMER</span>
                    </Link>
                    <Link 
                        href={route('logs')} 
                        className={`flex items-center gap-3 transition-colors ${route().current('logs') ? 'text-neon font-bold' : 'text-neon/60 hover:text-neon'}`}
                    >
                        <History size={18} />
                        <span className="text-sm">LOGS</span>
                    </Link>
                    <Link 
                        href={route('profile.edit')} 
                        className={`flex items-center gap-3 transition-colors ${route().current('profile.edit') ? 'text-neon font-bold' : 'text-neon/60 hover:text-neon'}`}
                    >
                        <UserIcon size={18} />
                        <span className="text-sm">PROFILE</span>
                    </Link>
                </nav>

                <div className="p-4">
                    <Link 
                        href={route('dashboard')} 
                        className="w-full block text-center border border-neon py-2 text-xs font-bold bg-neon text-black hover:bg-neon/90 hover:box-glow transition-all"
                    >
                        INIT_SESSION
                    </Link>
                </div>
            </aside>

            {/* Bottom Nav (Mobile) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-neon/30 z-50 flex items-center justify-around px-4">
                <Link 
                    href={route('dashboard')} 
                    className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${route().current('dashboard') ? 'text-neon font-bold' : 'text-neon/50'}`}
                >
                    <Terminal size={20} />
                    <span className="text-[8px] mt-1 tracking-widest">TIMER</span>
                </Link>
                
                <Link 
                    href={route('dashboard')} 
                    className="-mt-6 w-14 h-14 bg-neon rounded-full flex items-center justify-center text-black shadow-[0_0_15px_rgba(0,255,65,0.4)] border-2 border-black"
                >
                    <span className="text-xs font-black">INIT</span>
                </Link>

                <Link 
                    href={route('logs')} 
                    className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${route().current('logs') ? 'text-neon font-bold' : 'text-neon/50'}`}
                >
                    <History size={20} />
                    <span className="text-[8px] mt-1 tracking-widest">LOGS</span>
                </Link>

                <Link 
                    href={route('profile.edit')} 
                    className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${route().current('profile.edit') ? 'text-neon font-bold' : 'text-neon/50'}`}
                >
                    <UserIcon size={20} />
                    <span className="text-[8px] mt-1 tracking-widest">USER</span>
                </Link>
            </nav>

            {/* Main Area */}
            <main className="flex-1 flex flex-col min-h-screen relative overflow-x-hidden z-10 bg-black/50 backdrop-blur-sm">
                
                {/* Header Superior */}
                <header className="h-16 border-b border-neon/30 flex items-center justify-between px-4 md:px-6 bg-black/80 shrink-0">
                    <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-start">
                        {/* Logo Mobile */}
                        <div className="w-6 h-6 border border-neon flex items-center justify-center md:hidden shrink-0">
                            <Terminal size={14} className="text-neon" />
                        </div>
                        <h2 className="text-base md:text-lg font-bold">CODE FOCUS</h2>
                        <div className="px-2 py-0.5 border border-neon/40 bg-neon/10 rounded-sm items-center gap-2 hidden md:flex">
                            <div className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse"></div>
                            <span className="text-[10px]">CORE_SYS: ONLINE</span>
                        </div>
                        <div className="flex gap-2 text-neon/70 md:hidden">
                            <Network size={14} />
                        </div>
                    </div>
                    <div className="items-center gap-6 hidden md:flex">
                        <div className="text-right">
                            <span className="text-[10px] text-neon/60 block">BALANCE</span>
                            <span className="font-bold text-lg">942 <span className="text-xs">PTS</span></span>
                        </div>
                        <div className="flex gap-3 text-neon/70">
                            <Network size={16} />
                            <Terminal size={16} />
                        </div>
                    </div>
                </header>

                {/* Central Content */}
                <div className="flex-1 p-4 md:p-6 flex flex-col">
                    {children}
                </div>

                {/* Footer */}
                <footer className="h-8 border-t border-neon/30 flex items-center justify-between px-4 text-[9px] text-neon/50 bg-black/90 shrink-0 z-20 hidden md:flex">
                    <div>SYSTEM_V2.0.4 // ENXUTO_OS</div>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-neon">DOCS</a>
                        <a href="#" className="hover:text-neon">STATUS</a>
                        <a href="#" className="hover:text-neon">SUPPORT</a>
                    </div>
                </footer>
            </main>
        </div>
    );
}
