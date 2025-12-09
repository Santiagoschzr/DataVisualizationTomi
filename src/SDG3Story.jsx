import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area,
    ResponsiveContainer
} from 'recharts';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

const SDG3Story = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [animatedData, setAnimatedData] = useState([]);

    const fullData = [
        { year: 2000, reality: 23.4, target: 23.40, women: 25.8, men: 21.0 },
        { year: 2010, reality: 26.4, target: 22.23, women: 28.2, men: 24.1 },
        { year: 2022, reality: 31.3, target: 20.83, women: 33.8, men: 28.7 },
        { year: 2030, reality: 34.7, target: 19.90, women: 37.1, men: 32.0 }
    ];

    const steps = [
        {
            title: "2000",
            subtitle: "The Baseline",
            description: "23.4% of adults globally were physically inactive. This was our starting line.",
            yearLimit: 2000,
            showGender: false,
            showGap: false,
            accentColor: "#60a5fa"
        },
        {
            title: "2010",
            subtitle: "Rising Trend",
            description: "A decade later, inactivity climbed to 26.4%. We moved in the wrong direction.",
            yearLimit: 2010,
            showGender: false,
            showGap: true,
            accentColor: "#fbbf24"
        },
        {
            title: "2022",
            subtitle: "Widening Gap",
            description: "Today, 31.3% of adults are inactive. The gap to our goal grows wider each year.",
            yearLimit: 2022,
            showGender: false,
            showGap: true,
            accentColor: "#fb923c"
        },
        {
            title: "2030",
            subtitle: "Critical Moment",
            description: "Without change, we reach 34.7%. A 14.8 point gap from where we need to be.",
            yearLimit: 2030,
            showGender: false,
            showGap: true,
            highlight: "freeze",
            accentColor: "#f87171"
        },
        {
            title: "The Path Forward",
            subtitle: "Simple Actions",
            description: "Walk 30 minutes daily. That's 210 minutes per week. Cross to the active side.",
            yearLimit: 2030,
            showGender: false,
            showGap: true,
            highlight: "solution",
            accentColor: "#34d399"
        },
        {
            title: "The Equity Gap",
            subtitle: "Different Realities",
            description: "Women: 37.1%. Men: 32.0%. A 5.1 point disparity that demands action.",
            yearLimit: 2030,
            showGender: true,
            showGap: true,
            highlight: "gender",
            accentColor: "#a78bfa"
        }
    ];

    useEffect(() => {
        const step = steps[currentStep];
        const dataToShow = fullData.filter(d => d.year <= (step.yearLimit || 2030));
        setAnimatedData(dataToShow);
    }, [currentStep]);

    useEffect(() => {
        let interval;
        if (isPlaying && currentStep < steps.length - 1) {
            interval = setInterval(() => {
                setCurrentStep(prev => {
                    if (prev >= steps.length - 1) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, currentStep === 0 ? 2000 : 6000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentStep]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(c => c + 1);
        }
        setIsPlaying(false);
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(c => c - 1);
        }
        setIsPlaying(false);
    };

    const handleReset = () => {
        setCurrentStep(0);
        setIsPlaying(false);
    };

    const step = steps[currentStep];
    const gap = step.yearLimit === 2030 ? (34.7 - 19.9).toFixed(1) : null;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-900 border border-zinc-700 p-3 rounded shadow-xl">
                    <p className="text-zinc-400 text-xs mb-1">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
                            {entry.name}: {entry.value}%
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div
            style={{
                transform: 'scale(1.3)',
                transformOrigin: 'top left',
                width: '76.92%',
                height: '76.92%',
            }}
            className="fixed inset-0 bg-black text-white font-mono flex flex-col overflow-hidden p-6 md:p-8">

            {/* HEADER SECTION: Fixed height, minimal margin */}
            <div className="flex-none mb-6">
                <div className="flex items-baseline gap-4 mb-1">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                        SDG 3.4
                    </h1>
                    <div
                        className="h-3 w-3 rounded-full animate-pulse"
                        style={{ backgroundColor: step.accentColor }}
                    />
                </div>
                <p className="text-zinc-500 text-base tracking-wide">
                    Physical Inactivity — The Numbers Don't Lie
                </p>
            </div>

            {/* CONTENT GRID: Fills remaining space (flex-1) */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">

                {/* LEFT COLUMN: Controls & Text */}
                <div className="lg:col-span-4 flex flex-col justify-between h-full overflow-y-auto pr-2">
                    {/* Story Text */}
                    <div>
                        <div
                            className="text-xs uppercase tracking-widest mb-2 transition-colors duration-700"
                            style={{ color: step.accentColor }}
                        >
                            {step.subtitle}
                        </div>
                        <h2
                            className="text-3xl md:text-4xl font-bold mb-4 tracking-tight transition-all duration-700"
                            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                        >
                            {step.title}
                        </h2>
                        <p className="text-zinc-400 text-base leading-relaxed mb-6">
                            {step.description}
                        </p>

                        {/* Dynamic Highlights */}
                        <div className="min-h-[100px]">
                            {step.highlight === 'freeze' && gap && (
                                <div className="border-l-2 border-red-500 pl-4 py-1 animate-in fade-in slide-in-from-left-4 duration-500">
                                    <div className="text-4xl font-bold text-red-500 mb-0">{gap}%</div>
                                    <div className="text-zinc-500 text-sm">off target by 2030</div>
                                </div>
                            )}
                            {step.highlight === 'solution' && (
                                <div className="border-l-2 border-emerald-500 pl-4 py-1 animate-in fade-in slide-in-from-left-4 duration-500">
                                    <div className="text-3xl font-bold text-emerald-500 mb-1">30 min</div>
                                    <div className="text-zinc-400 text-sm leading-snug">
                                        Walk daily. 210 mins/week.<br />
                                        Cross the line.
                                    </div>
                                </div>
                            )}
                            {step.highlight === 'gender' && (
                                <div className="border-l-2 border-purple-500 pl-4 py-1 animate-in fade-in slide-in-from-left-4 duration-500">
                                    <div className="text-zinc-400 text-sm space-y-1">
                                        <div>Women: <span className="text-xl font-bold text-purple-400">37.1%</span></div>
                                        <div>Men: <span className="text-xl font-bold text-blue-400">32.0%</span></div>
                                        <div className="text-purple-500 font-medium mt-1">5.1% disparity</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Controls (Pushed to bottom via justify-between) */}
                    <div className="pb-2">
                        {/* Progress Bar */}
                        <div className="flex items-center gap-1 mb-4">
                            {steps.map((_, idx) => (
                                <div
                                    key={idx}
                                    className="h-1 flex-1 transition-all duration-700 rounded-full"
                                    style={{
                                        backgroundColor: idx <= currentStep ? step.accentColor : '#27272a'
                                    }}
                                />
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3">
                            <button onClick={handleReset} className="p-2 text-zinc-600 hover:text-zinc-400 transition" aria-label="Reset">
                                <RotateCcw size={18} />
                            </button>
                            <button onClick={handlePrev} disabled={currentStep === 0} className="p-2 text-zinc-600 hover:text-zinc-400 disabled:opacity-20 disabled:cursor-not-allowed transition" aria-label="Previous">
                                <SkipBack size={18} />
                            </button>
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                disabled={currentStep === steps.length - 1}
                                className="flex-1 py-2 text-sm font-medium border border-zinc-800 hover:border-zinc-600 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex justify-center"
                                style={{ borderColor: isPlaying ? step.accentColor : undefined, color: isPlaying ? step.accentColor : undefined }}
                            >
                                {isPlaying ? <span className="flex items-center gap-2"><Pause size={16} /> PAUSE</span> : <span className="flex items-center gap-2"><Play size={16} /> {currentStep === steps.length - 1 ? 'RESTART' : 'PLAY'}</span>}
                            </button>
                            <button onClick={handleNext} disabled={currentStep === steps.length - 1} className="p-2 text-zinc-600 hover:text-zinc-400 disabled:opacity-20 disabled:cursor-not-allowed transition" aria-label="Next">
                                <SkipForward size={18} />
                            </button>
                        </div>
                        <div className="text-xs text-center text-zinc-700 mt-2">
                            Step {currentStep + 1} of {steps.length}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Chart */}
                <div className="lg:col-span-8 flex flex-col h-full min-h-0">
                    <div className="flex-1 min-h-0 relative">
                        {/* Chart takes all available height */}
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={animatedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="gapFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.15} />
                                        <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid strokeDasharray="1 3" stroke="#27272a" vertical={false} />
                                <XAxis
                                    dataKey="year"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717a', fontSize: 11, fontFamily: 'monospace' }}
                                    dy={10}
                                />
                                <YAxis
                                    domain={[15, 42]}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#71717a', fontSize: 11, fontFamily: 'monospace' }}
                                    label={{ value: '%', angle: 0, position: 'insideTopLeft', fill: '#52525b', offset: 10 }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ paddingTop: '20px', fontFamily: 'monospace', fontSize: '11px' }} iconType="line" />

                                {step.showGap && (
                                    <Area type="monotone" dataKey="reality" stroke="none" fill="url(#gapFill)" name="gap" animationDuration={1200} />
                                )}
                                <Line type="monotone" dataKey="target" stroke="#22c55e" strokeWidth={2} strokeDasharray="4 4" name="target" dot={false} animationDuration={1200} />
                                <Line type="monotone" dataKey="reality" stroke="#ffffff" strokeWidth={3} name="reality" dot={{ r: 5, strokeWidth: 2, fill: '#000', stroke: '#fff' }} activeDot={{ r: 7, strokeWidth: 0, fill: step.accentColor }} animationDuration={1200} />
                                {step.showGender && (
                                    <>
                                        <Line type="monotone" dataKey="women" stroke="#a78bfa" strokeWidth={2} strokeDasharray="2 2" name="women" dot={{ r: 3, fill: '#a78bfa' }} animationDuration={800} />
                                        <Line type="monotone" dataKey="men" stroke="#60a5fa" strokeWidth={2} strokeDasharray="2 2" name="men" dot={{ r: 3, fill: '#60a5fa' }} animationDuration={800} />
                                    </>
                                )}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Footer / Data Source - Pushed to bottom right */}
                    <div className="flex-none mt-4 pt-4 border-t border-zinc-900 grid grid-cols-2 gap-4 text-[10px] text-zinc-600 font-mono">
                        <div>
                            WHO Global Health Observatory (2024)<br />
                            Indicator: NCD_PAA
                        </div>
                        <div className="text-right">
                            Max: UAE (F) 73.6% | Min: Malawi (M) 2.4%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SDG3Story;