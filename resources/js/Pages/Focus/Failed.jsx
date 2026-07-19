import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, WifiOff } from 'lucide-react';
import CyberLayout from '@/Layouts/CyberLayout';

export default function Failed() {
    return (
        <CyberLayout title="System Failure">
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                
                <div className="border-2 border-[#ff5555] bg-black/90 p-8 md:p-12 max-w-2xl w-full relative overflow-hidden shadow-[0_0_50px_rgba(255,85,85,0.2)]">
                    
                    {/* Glitch Overlay Effect */}
                    <div className="absolute inset-0 bg-[#ff5555]/5 opacity-50 animate-pulse pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#ff5555]/20 animate-bounce pointer-events-none"></div>

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#ff5555] -translate-x-2 -translate-y-2"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#ff5555] translate-x-2 -translate-y-2"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#ff5555] -translate-x-2 translate-y-2"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#ff5555] translate-x-2 translate-y-2"></div>

                    <div className="flex flex-col items-center text-center relative z-10">
                        
                        <div className="w-24 h-24 rounded-full border-4 border-[#ff5555]/30 flex items-center justify-center mb-8 bg-[#ff5555]/10 animate-pulse">
                            <WifiOff size={48} className="text-[#ff5555] drop-shadow-[0_0_15px_rgba(255,85,85,0.8)]" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-[#ff5555] tracking-widest mb-2 drop-shadow-[0_0_15px_rgba(255,85,85,0.6)]">
                            MISSION ABORTED
                        </h1>
                        <h2 className="text-xl md:text-2xl text-[#ff5555]/80 font-bold tracking-widest mb-8">
                            [ FOCUS_LINK_CORRUPTED ]
                        </h2>

                        <div className="flex items-center gap-3 text-[#ff5555]/60 mb-10 border border-[#ff5555]/30 px-6 py-4 bg-black">
                            <AlertTriangle size={24} />
                            <p className="text-sm md:text-base text-left">
                                Conexão neural perdida. A janela perdeu o foco ou a sessão foi abandonada intencionalmente. Esta falha foi registrada nos logs do sistema.
                            </p>
                        </div>

                        <Link 
                            href={route('dashboard')}
                            className="bg-[#ff5555]/20 border-2 border-[#ff5555] text-[#ff5555] font-black text-xl px-12 py-4 hover:bg-[#ff5555] hover:text-black transition-all hover:shadow-[0_0_30px_rgba(255,85,85,0.6)] w-full sm:w-auto text-center"
                        >
                            RECONECTAR AO CORE
                        </Link>

                    </div>
                </div>

            </div>
        </CyberLayout>
    );
}
