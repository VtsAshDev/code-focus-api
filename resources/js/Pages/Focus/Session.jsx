import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Session({ focusSession }) {
    const [durationSeconds, setDurationSeconds] = useState(focusSession.duration * 60);
    const [hasFailed, setHasFailed] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('pt-BR'));

    const { post: postComplete } = useForm();
    const { post: postFail } = useForm();

    // Clock update
    useEffect(() => {
        const clockInterval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('pt-BR'));
        }, 1000);
        return () => clearInterval(clockInterval);
    }, []);

    // Timer logic with Wake Lock
    useEffect(() => {
        let wakeLock = null;
        let interval;

        const requestWakeLock = async () => {
            try {
                if ('wakeLock' in navigator) {
                    wakeLock = await navigator.wakeLock.request('screen');
                }
            } catch (err) {
                // Silently ignore if wake lock is denied
            }
        };

        if (!hasFailed && durationSeconds > 0) {
            requestWakeLock();
            
            interval = setInterval(() => {
                setDurationSeconds(prev => {
                    if (prev <= 1) {
                        setIsComplete(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
            if (wakeLock !== null) {
                wakeLock.release().catch(() => {});
            }
        };
    }, [hasFailed, durationSeconds]);

    // Visibility logic
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && durationSeconds > 0 && !hasFailed && !isComplete) {
                setHasFailed(true);
                postFail(route('sessions.fail'));
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [durationSeconds, hasFailed, isComplete, postFail]);

    const handleComplete = () => {
        postComplete(route('sessions.complete'));
    };

    const handleAbort = () => {
        setHasFailed(true);
        postFail(route('sessions.fail'));
    };

    const minutes = Math.floor(durationSeconds / 60);
    const seconds = durationSeconds % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <div className="min-h-screen bg-black text-neon font-mono flex flex-col items-center justify-between p-8 relative selection:bg-neon/30">
            <Head title="Sessão em Progresso" />

            {/* Top Status */}
            <div className="flex flex-col items-center mt-4">
                <div className="border border-neon/50 px-4 py-1.5 flex items-center gap-2 mb-2 bg-neon/5">
                    <div className="w-2 h-2 rounded-full bg-neon animate-pulse"></div>
                    <span className="text-xs font-bold tracking-widest">SESSÃO EM PROGRESSO</span>
                </div>
                <div className="text-[10px] text-neon/40 tracking-widest">
                    NODE_01 // SECURE_SHELL_ACTIVE
                </div>
            </div>

            {/* Main Timer */}
            <div className="flex flex-col items-center w-full max-w-4xl flex-1 justify-center relative">
                <div className="text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[16rem] font-bold leading-none text-glow tracking-tighter tabular-nums select-none mb-12">
                    {formattedTime}
                </div>

                <div className="w-full max-w-2xl h-px bg-neon/40 mb-12 shadow-[0_0_10px_rgba(0,255,65,0.8)]"></div>

                {isComplete ? (
                    <div className="text-center animate-pulse">
                        <div className="flex items-center justify-center gap-2 text-neon mb-4">
                            <span className="tracking-widest font-bold">F O C O   C O N C L U Í D O</span>
                        </div>
                        <button
                            onClick={handleComplete}
                            className="border border-neon text-neon font-bold tracking-widest px-8 py-3 text-sm hover:bg-neon hover:text-black transition-colors"
                        >
                            FINALIZAR SESSÃO
                        </button>
                    </div>
                ) : (
                    <div className="text-center text-orange-400">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <AlertTriangle size={16} />
                            <span className="tracking-widest text-sm">ATENÇÃO</span>
                        </div>
                        <p className="text-sm opacity-80 mb-1">
                            Minimizar o navegador resultará em falha da sessão.
                        </p>
                        <p className="text-sm opacity-80">
                            Mantenha o foco absoluto no terminal.
                        </p>
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-col items-center mb-4 z-10 w-full">
                {!isComplete && (
                    <button
                        onClick={handleAbort}
                        className="border border-neon text-neon font-bold tracking-widest px-8 py-3 text-xs mb-16 hover:bg-neon hover:text-black transition-colors"
                    >
                        ABORTAR SESSÃO
                    </button>
                )}
                
                <div className="text-[9px] text-neon/40 tracking-widest flex items-center justify-center w-full">
                    SYSTEM_V2.0.4 // ENXUTO_OS // {currentTime}
                </div>
            </div>
        </div>
    );
}
