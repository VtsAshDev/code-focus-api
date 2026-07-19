import { useForm, usePage } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import CyberLayout from '@/Layouts/CyberLayout';

export default function Dashboard() {
    const { data, setData, post, processing } = useForm({
        duration: 25,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('sessions.start'));
    };

    return (
        <CyberLayout title="Dashboard OS_V2.0.4">
            <div className="flex-1 flex flex-col items-center justify-center">
                
                {/* Decorative Squares */}
                <div className="hidden md:flex gap-4 mb-8">
                    <div className="w-16 h-16 bg-neon box-glow animate-pulse opacity-90"></div>
                    <div className="w-16 h-16 bg-neon box-glow animate-pulse opacity-90"></div>
                </div>

                {/* Main Module */}
                <div className="border border-neon bg-black/80 w-full max-w-2xl p-6 md:p-8 relative box-glow mb-8">
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-3 md:w-4 h-3 md:h-4 border-t-2 border-l-2 border-neon -translate-x-1 -translate-y-1"></div>
                    <div className="absolute top-0 right-0 w-3 md:w-4 h-3 md:h-4 border-t-2 border-r-2 border-neon translate-x-1 -translate-y-1"></div>
                    <div className="absolute bottom-0 left-0 w-3 md:w-4 h-3 md:h-4 border-b-2 border-l-2 border-neon -translate-x-1 translate-y-1"></div>
                    <div className="absolute bottom-0 right-0 w-3 md:w-4 h-3 md:h-4 border-b-2 border-r-2 border-neon translate-x-1 translate-y-1"></div>

                    <div className="text-center mb-6">
                        <p className="text-[10px] tracking-[0.2em] text-neon/60 mb-2">FOCUS MODULE ALPHA</p>
                        <h2 className="text-2xl md:text-3xl font-black text-glow tracking-wider">INIT_SESSION</h2>
                    </div>

                    <form onSubmit={submit} className="flex flex-col items-center">
                        <div className="text-6xl md:text-8xl font-black mb-8 text-glow flex items-center justify-center">
                            <span>{data.duration}</span>
                            <span className="animate-pulse opacity-50">:</span>
                            <span>00</span>
                        </div>

                        <div className="flex gap-4 w-full">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="flex-1 bg-neon text-black font-black text-lg md:text-xl py-4 hover:bg-neon/90 hover:box-glow transition-all"
                            >
                                INICIAR
                            </button>
                            <button type="button" className="w-16 border border-neon flex items-center justify-center hover:bg-neon/10">
                                <Settings size={24} className="text-neon" />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Stats Widgets */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-2xl">
                    <div className="flex-1 border border-neon/30 p-4 bg-black/80">
                        <span className="text-[10px] text-neon/60 block mb-1">EFICIÊNCIA</span>
                        <div className="text-2xl font-bold mb-3">98.2 <span className="text-xs text-neon/70">%</span></div>
                        <div className="h-1 w-full bg-neon/20">
                            <div className="h-full bg-neon w-[98%]"></div>
                        </div>
                    </div>

                    <div className="flex-1 border border-neon/30 p-4 bg-black/80">
                        <span className="text-[10px] text-neon/60 block mb-1">SESSÕES</span>
                        <div className="text-2xl font-bold mb-3">12 <span className="text-xs text-neon/70">/ 20</span></div>
                        <div className="h-1 w-full bg-neon/20">
                            <div className="h-full bg-neon w-[60%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </CyberLayout>
    );
}
