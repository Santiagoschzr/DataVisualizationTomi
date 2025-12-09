import React, { useState, useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area,
    ResponsiveContainer
} from 'recharts';
import { SkipForward, SkipBack, RotateCcw } from 'lucide-react';

// 🔢 Full global data 2000–2030 with interpolated years
const FULL_DATA = [
    { year: 2000, reality: 23.36, target: 23.40, women: 25.63, men: 20.96 },
    { year: 2001, reality: 23.60, target: 23.28, women: 25.85, men: 21.23 },
    { year: 2002, reality: 23.85, target: 23.17, women: 26.09, men: 21.51 },
    { year: 2003, reality: 24.12, target: 23.05, women: 26.33, men: 21.80 },
    { year: 2004, reality: 24.40, target: 22.93, women: 26.60, men: 22.10 },
    { year: 2005, reality: 24.69, target: 22.82, women: 26.88, men: 22.42 },
    { year: 2006, reality: 25.01, target: 22.70, women: 27.18, men: 22.74 },
    { year: 2007, reality: 25.34, target: 22.58, women: 27.51, men: 23.08 },
    { year: 2008, reality: 25.67, target: 22.47, women: 27.85, men: 23.43 },
    { year: 2009, reality: 26.02, target: 22.35, women: 28.20, men: 23.77 },
    { year: 2010, reality: 26.37, target: 22.23, women: 28.57, men: 24.11 },
    { year: 2011, reality: 26.72, target: 22.12, women: 28.95, men: 24.44 },
    { year: 2012, reality: 27.08, target: 22.00, women: 29.34, men: 24.77 },
    { year: 2013, reality: 27.46, target: 21.88, women: 29.75, men: 25.11 },
    { year: 2014, reality: 27.84, target: 21.77, women: 30.16, men: 25.47 },
    { year: 2015, reality: 28.24, target: 21.65, women: 30.60, men: 25.85 },
    { year: 2016, reality: 28.66, target: 21.53, women: 31.04, men: 26.25 },
    { year: 2017, reality: 29.08, target: 21.42, women: 31.49, men: 26.64 },
    { year: 2018, reality: 29.51, target: 21.30, women: 31.94, men: 27.05 },
    { year: 2019, reality: 29.94, target: 21.18, women: 32.40, men: 27.46 },
    { year: 2020, reality: 30.37, target: 21.07, women: 32.86, men: 27.87 },
    { year: 2021, reality: 30.81, target: 20.95, women: 33.32, men: 28.30 },
    { year: 2022, reality: 31.27, target: 20.83, women: 33.80, men: 28.74 },
    { year: 2023, reality: 31.70, target: 20.71, women: 34.25, men: 29.15 },
    { year: 2024, reality: 32.13, target: 20.59, women: 34.70, men: 29.56 },
    { year: 2025, reality: 32.56, target: 20.47, women: 35.15, men: 29.97 },
    { year: 2026, reality: 32.99, target: 20.35, women: 35.60, men: 30.38 },
    { year: 2027, reality: 33.42, target: 20.23, women: 36.05, men: 30.79 },
    { year: 2028, reality: 33.85, target: 20.11, women: 36.50, men: 31.20 },
    { year: 2029, reality: 34.28, target: 20.00, women: 36.80, men: 31.60 },
    { year: 2030, reality: 34.70, target: 19.90, women: 37.10, men: 32.00 },
];

const SDG3Story = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

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

    const step = steps[currentStepIndex];

    // Show data up to current step's year limit
    const animatedData = useMemo(() => {
        const targetIdx = FULL_DATA.findIndex(d => d.year === step.yearLimit);
        return FULL_DATA.slice(0, targetIdx + 1);
    }, [step.yearLimit]);

    const currentYear = step.yearLimit;

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        }
    };

    const handleReset = () => {
        setCurrentStepIndex(0);
    };

    const gap = step.yearLimit === 2030 ? (34.7 - 19.9).toFixed(1) : null;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-900 border border-zinc-700 p-3 rounded shadow-xl">
                    <p className="text-zinc-400 text-xs mb-1">{label}</p>
                    {payload.map((entry, index) => (
                        <p
                            key={index}
                            style={{ color: entry.color }}
                            className="text-sm font-medium"
                        >
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
                transform: 'scale(1.2)',
                transformOrigin: 'top left',
                width: '76.92%',
                height: '76.92%',
            }}
            className="fixed inset-0 bg-black text-white font-mono flex flex-col overflow-hidden p-6 md:p-8"
        >
            <div className="flex-none mb-6">
                <div className="flex items-baseline gap-4 mb-1">
                    <h1
                        className="text-4xl md:text-5xl font-bold tracking-tighter"
                        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                    >
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

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
                <div className="lg:col-span-4 flex flex-col justify-between h-full overflow-y-auto pr-2">
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
                        <p className="text-zinc-400 text-base leading-relaxed mb-2">
                            {step.description}
                        </p>
                        <p className="text-xs text-zinc-600 mb-6">
                            Year shown: <span className="text-zinc-300">{currentYear}</span>
                        </p>

                        <div className="min-h-[100px]">
                            {step.highlight === 'freeze' && gap && (
                                <div className="border-l-2 border-red-500 pl-4 py-1 animate-in fade-in slide-in-from-left-4 duration-500">
                                    <div className="text-4xl font-bold text-red-500 mb-0">
                                        {gap}%
                                    </div>
                                    <div className="text-zinc-500 text-sm">
                                        off target by 2030
                                    </div>
                                </div>
                            )}
                            {step.highlight === 'solution' && (
                                <div className="border-l-2 border-emerald-500 pl-4 py-1 animate-in fade-in slide-in-from-left-4 duration-500">
                                    <div className="text-3xl font-bold text-emerald-500 mb-1">
                                        30 min
                                    </div>
                                    <div className="text-zinc-400 text-sm leading-snug">
                                        Walk daily. 210 mins/week.
                                        <br />
                                        Cross the line.
                                    </div>
                                </div>
                            )}
                            {step.highlight === 'gender' && (
                                <div className="border-l-2 border-purple-500 pl-4 py-1 animate-in fade-in slide-in-from-left-4 duration-500">
                                    <div className="text-zinc-400 text-sm space-y-1">
                                        <div>
                                            Women:{' '}
                                            <span className="text-xl font-bold text-purple-400">
                                                37.1%
                                            </span>
                                        </div>
                                        <div>
                                            Men:{' '}
                                            <span className="text-xl font-bold text-blue-400">
                                                32.0%
                                            </span>
                                        </div>
                                        <div className="text-purple-500 font-medium mt-1">
                                            5.1% disparity
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pb-2">
                        <div className="flex items-center gap-1 mb-4">
                            {steps.map((_, idx) => (
                                <div
                                    key={idx}
                                    className="h-1 flex-1 transition-all duration-700 rounded-full"
                                    style={{
                                        backgroundColor:
                                            idx <= currentStepIndex
                                                ? step.accentColor
                                                : '#27272a'
                                    }}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleReset}
                                className="p-2 text-zinc-600 hover:text-zinc-400 transition"
                                aria-label="Reset"
                            >
                                <RotateCcw size={18} />
                            </button>
                            <button
                                onClick={handlePrev}
                                disabled={currentStepIndex === 0}
                                className="p-2 text-zinc-600 hover:text-zinc-400 disabled:opacity-20 disabled:cursor-not-allowed transition"
                                aria-label="Previous"
                            >
                                <SkipBack size={18} />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentStepIndex === steps.length - 1}
                                className="flex-1 py-2 text-sm font-medium border rounded transition-all duration-300"
                                style={{
                                    borderColor: step.accentColor,
                                    color: step.accentColor,
                                    opacity: currentStepIndex === steps.length - 1 ? 0.3 : 1
                                }}
                            >
                                NEXT
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentStepIndex === steps.length - 1}
                                className="p-2 text-zinc-600 hover:text-zinc-400 disabled:opacity-20 disabled:cursor-not-allowed transition"
                                aria-label="Next"
                            >
                                <SkipForward size={18} />
                            </button>
                        </div>
                        <div className="text-xs text-center text-zinc-700 mt-2">
                            Step {currentStepIndex + 1} of {steps.length}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 flex flex-col h-full min-h-0">
                    <div className="flex-1 min-h-0 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={animatedData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient
                                        id="gapFill"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#ef4444"
                                            stopOpacity={0.15}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#ef4444"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    strokeDasharray="1 3"
                                    stroke="#27272a"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="year"
                                    axisLine={false}
                                    tickLine={false}
                                    ticks={[2000, 2010, 2022, 2030]}
                                    tick={{
                                        fill: '#71717a',
                                        fontSize: 11,
                                        fontFamily: 'monospace'
                                    }}
                                    dy={10}
                                />
                                <YAxis
                                    domain={[15, 42]}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fill: '#71717a',
                                        fontSize: 11,
                                        fontFamily: 'monospace'
                                    }}
                                    label={{
                                        value: '%',
                                        angle: 0,
                                        position: 'insideTopLeft',
                                        fill: '#52525b',
                                        offset: 10
                                    }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    wrapperStyle={{
                                        paddingTop: '20px',
                                        fontFamily: 'monospace',
                                        fontSize: '11px'
                                    }}
                                    iconType="line"
                                />

                                {step.showGap && (
                                    <Area
                                        type="monotone"
                                        dataKey="reality"
                                        stroke="none"
                                        fill="url(#gapFill)"
                                        name="gap"
                                        animationDuration={800}
                                        animationEasing="ease-in-out"
                                    />
                                )}
                                <Line
                                    type="monotone"
                                    dataKey="target"
                                    stroke="#22c55e"
                                    strokeWidth={2}
                                    strokeDasharray="4 4"
                                    name="target"
                                    dot={false}
                                    activeDot={false}
                                    animationDuration={800}
                                    animationEasing="ease-in-out"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="reality"
                                    stroke="#ffffff"
                                    strokeWidth={3}
                                    name="reality"
                                    dot={false}
                                    activeDot={false}
                                    animationDuration={800}
                                    animationEasing="ease-in-out"
                                />
                                {step.showGender && (
                                    <>
                                        <Line
                                            type="monotone"
                                            dataKey="women"
                                            stroke="#a78bfa"
                                            strokeWidth={2}
                                            strokeDasharray="2 2"
                                            name="women"
                                            dot={false}
                                            activeDot={false}
                                            animationDuration={800}
                                            animationEasing="ease-in-out"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="men"
                                            stroke="#60a5fa"
                                            strokeWidth={2}
                                            strokeDasharray="2 2"
                                            name="men"
                                            dot={false}
                                            activeDot={false}
                                            animationDuration={800}
                                            animationEasing="ease-in-out"
                                        />
                                    </>
                                )}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex-none mt-4 pt-4 border-t border-zinc-900 grid grid-cols-2 gap-4 text-[10px] text-zinc-600 font-mono">
                        <div>
                            WHO Global Health Observatory (2024)
                            <br />
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