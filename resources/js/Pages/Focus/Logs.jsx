import CyberLayout from '@/Layouts/CyberLayout';

export default function Logs({ sessions, stats }) {
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            day: date.toISOString().split('T')[0],
            time: date.toISOString().split('T')[1].substring(0, 8) + ' UTC'
        };
    };

    return (
        <CyberLayout title="System Logs">
            <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col pt-4">
                
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-white mb-2">SYSTEM_LOGS</h1>
                    <p className="text-sm text-neon/70">Historical focus data retrieved from core database.</p>
                </div>

                {/* Data Table */}
                <div className="border border-neon/30 bg-black/80 w-full mb-8 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#111] text-[10px] text-neon/60 border-b border-neon/30 uppercase tracking-widest">
                                <tr>
                                    <th className="p-4 font-normal">Status</th>
                                    <th className="p-4 font-normal">Date/Timestamp</th>
                                    <th className="p-4 font-normal">Session Task</th>
                                    <th className="p-4 font-normal text-right">Duration</th>
                                    <th className="p-4 font-normal text-right">Points</th>
                                </tr>
                            </thead>
                            <tbody className="text-white/90">
                                {sessions.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-neon/50">NO RECORDS FOUND</td>
                                    </tr>
                                ) : (
                                    sessions.map(session => {
                                        const { day, time } = formatDate(session.created_at);
                                        const isOk = session.status === 'completed';
                                        
                                        return (
                                            <tr key={session.id} className="border-b border-neon/10 hover:bg-neon/5 transition-colors">
                                                <td className="p-4">
                                                    <span className={`font-bold ${isOk ? 'text-neon text-glow' : 'text-[#ff5555] drop-shadow-[0_0_8px_rgba(255,85,85,0.8)]'}`}>
                                                        {isOk ? '[OK]' : '[FAIL]'}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-mono">{day}</div>
                                                    <div className="text-[10px] text-white/50">{time}</div>
                                                </td>
                                                <td className="p-4 text-white/70">
                                                    NO_TASK_ASSIGNED
                                                </td>
                                                <td className="p-4 text-right">
                                                    {session.duration} MIN
                                                </td>
                                                <td className="p-4 text-right">
                                                    <span className={`${isOk ? 'text-neon' : 'text-[#ff5555]'}`}>
                                                        {isOk ? `+${session.duration} PTS` : '+0 PTS'}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bottom Stats Widgets */}
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full">
                    <div className="flex-1 border border-neon/30 p-6 bg-black/80">
                        <span className="text-[10px] text-neon/60 tracking-widest block mb-1 uppercase">Success Rate</span>
                        <div className="text-4xl md:text-5xl font-bold mb-4 text-neon text-glow">
                            {stats.successRate}<span className="text-xl md:text-2xl">%</span>
                        </div>
                        <div className="h-2 w-full bg-neon/10 border border-neon/20 p-[1px] flex">
                            <div className="h-full bg-neon" style={{ width: `${stats.successRate}%` }}></div>
                            <div className="h-full bg-white/10 flex-1"></div>
                        </div>
                    </div>

                    <div className="flex-1 border border-neon/30 p-6 bg-black/80">
                        <span className="text-[10px] text-neon/60 tracking-widest block mb-1 uppercase">Total Focus Time</span>
                        <div className="text-4xl md:text-5xl font-bold mb-4 text-neon text-glow flex items-baseline gap-2 flex-wrap">
                            {stats.totalHours}<span className="text-2xl md:text-3xl">H</span>
                            <span className="text-[10px] md:text-xs text-neon/50 tracking-widest ml-1 md:ml-2">/ 40H WEEKLY_GOAL</span>
                        </div>
                    </div>
                </div>

            </div>
        </CyberLayout>
    );
}
