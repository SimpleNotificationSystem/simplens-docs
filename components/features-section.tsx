"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Mail, MessageCircle, Bell, Smartphone, Blocks } from "lucide-react"

// Custom visual components for each card
const PluginVisual = () => (
    <div className="relative h-32 md:h-48 w-full flex items-center justify-center">
        {/* Central hub */}
        <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/40"
        >
            <Blocks className="text-white" />
        </motion.div>

        {/* Plugin nodes - positioned around the hub */}
        {[
            { top: '5%', left: '50%', transform: 'translateX(-50%)', icon: <Mail className="text-white" /> },
            { top: '85%', left: '50%', transform: 'translateX(-50%)', icon: <MessageCircle className='text-white' /> },
            { top: '45%', left: '10%', transform: 'translateY(-50%)', icon: <Bell className='text-white' /> },
            { top: '45%', right: '10%', transform: 'translateY(-50%)', icon: <Smartphone className='text-white' /> },
        ].map((pos, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                className="absolute flex flex-col items-center gap-1"
                style={{ top: pos.top, left: pos.left, right: pos.right, transform: pos.transform }}
            >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-lg md:text-xl backdrop-blur-sm">
                    {pos.icon}
                </div>
            </motion.div>
        ))}
    </div>
)

const ShieldVisual = () => (
    <div className="relative h-32 md:h-48 w-full flex flex-col items-center justify-center gap-4">
        {/* Recovery flow visualization */}
        <div className="flex items-center gap-3 md:gap-4">
            {/* Failed notification */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-col items-center gap-1"
            >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                    <svg className="h-5 w-5 md:h-6 md:w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <span className="text-[10px] text-zinc-500 hidden md:block">Crashed</span>
            </motion.div>

            {/* Arrow */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
            >
                <svg className="h-4 w-4 md:h-5 md:w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </motion.div>

            {/* Recovery service */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                className="relative"
            >
                <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <svg className="h-7 w-7 md:h-8 md:w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                </div>
                {/* Pulse ring */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                    className="absolute inset-0 rounded-2xl border-2 border-blue-500/30"
                />
            </motion.div>

            {/* Arrow */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.7 }}
            >
                <svg className="h-4 w-4 md:h-5 md:w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </motion.div>

            {/* Recovered notification */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="flex flex-col items-center gap-1"
            >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                    <svg className="h-5 w-5 md:h-6 md:w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <span className="text-[10px] text-zinc-500 hidden md:block">Recovered</span>
            </motion.div>
        </div>

        {/* Status label */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="hidden md:flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1"
        >
            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-400">Auto-recovery active</span>
        </motion.div>
    </div>
)

const RetryVisual = () => (
    <div className="relative h-24 w-full flex items-center justify-center gap-2">
        {[1, 2, 4, 8].map((delay, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.15 }}
                className="flex flex-col items-center gap-1"
            >
                <div
                    className="rounded-md bg-linear-to-t from-blue-600 to-blue-400"
                    style={{ width: '12px', height: `${20 + i * 15}px` }}
                />
                <span className="text-[10px] text-zinc-500">{delay}s</span>
            </motion.div>
        ))}
        <motion.svg
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="absolute top-0 right-4 h-5 w-5 text-zinc-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </motion.svg>
    </div>
)

const ClockVisual = () => (
    <div className="relative h-24 w-full flex items-center justify-center">
        <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative h-16 w-16 rounded-full border-2 border-zinc-700 bg-zinc-900 flex items-center justify-center"
        >
            {/* Clock face markers */}
            {[0, 1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-zinc-600"
                    style={{
                        top: i === 0 ? '4px' : i === 2 ? 'auto' : '50%',
                        bottom: i === 2 ? '4px' : 'auto',
                        left: i === 3 ? '4px' : i === 1 ? 'auto' : '50%',
                        right: i === 1 ? '4px' : 'auto',
                        transform: i === 0 || i === 2 ? 'translateX(-50%)' : 'translateY(-50%)',
                    }}
                />
            ))}
            {/* Hour hand */}
            <motion.div
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 90 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute h-4 w-0.5 bg-zinc-400 rounded-full origin-bottom"
                style={{ bottom: '50%' }}
            />
            {/* Minute hand */}
            <motion.div
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 180 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="absolute h-5 w-0.5 bg-blue-400 rounded-full origin-bottom"
                style={{ bottom: '50%' }}
            />
            {/* Center dot */}
            <div className="absolute h-2 w-2 rounded-full bg-blue-500" />
        </motion.div>
        {/* Schedule indicator */}
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="absolute right-4 top-2 flex items-center gap-1 rounded-full bg-zinc-800 px-2 py-1 text-[10px] text-zinc-400"
        >
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Scheduled
        </motion.div>
    </div>
)

const ScaleVisual = () => (
    <div className="relative h-24 w-full flex items-center justify-center">
        <div className="flex items-end gap-3">
            {/* Processor blocks */}
            {['Email', 'SMS', 'Push'].map((label, i) => (
                <motion.div
                    key={label}
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="flex flex-col items-center gap-1 origin-bottom"
                >
                    <div className="flex flex-col gap-0.5">
                        {Array.from({ length: 2 + i }).map((_, j) => (
                            <motion.div
                                key={j}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + j * 0.1 }}
                                className="h-6 w-10 rounded-sm bg-linear-to-r from-blue-600 to-blue-500 border border-blue-400/30"
                            />
                        ))}
                    </div>
                    <span className="text-[10px] text-zinc-500">{label}</span>
                </motion.div>
            ))}
        </div>
        {/* Arrow indicator */}
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="absolute top-0 right-4 text-zinc-500"
        >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        </motion.div>
    </div>
)

const DashboardVisual = () => (
    <div className="relative h-24 w-full flex items-center justify-center">
        {/* Mini dashboard mockup */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-[180px] rounded-lg bg-zinc-900 border border-zinc-700/50 overflow-hidden"
        >
            {/* Header bar */}
            <div className="flex items-center gap-1.5 px-2 py-1.5 bg-zinc-800/50 border-b border-zinc-700/50">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            </div>
            {/* Content */}
            <div className="p-2 space-y-1.5">
                {/* Stats row */}
                <div className="flex gap-1">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="h-3 rounded-sm bg-green-500/30 flex-1"
                    />
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="h-3 rounded-sm bg-blue-500/30 flex-1"
                    />
                </div>
                {/* Mini chart */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="h-6 rounded-sm bg-linear-to-r from-blue-600/20 to-blue-500/10 origin-left"
                />
            </div>
        </motion.div>
    </div>
)

interface BentoCardProps {
    title: string
    description: string
    visual: React.ReactNode
    size?: "default" | "large" | "wide"
    delay?: number
}

const BentoCard = ({ title, description, visual, size = "default", delay = 0 }: BentoCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-6 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 flex flex-col items-center justify-center text-center",
                size === "large" && "md:col-span-1 md:row-span-2",
                size === "wide" && "md:col-span-2"
            )}
        >
            {/* Visual art area */}
            <div className="mb-4 w-full">
                {visual}
            </div>

            {/* Title */}
            <h3 className="mb-2 text-lg font-semibold text-white mt-5">
                {title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed text-zinc-400">
                {description}
            </p>
        </motion.div>
    )
}

export const FeaturesSection = () => {
    const features = [
        {
            title: "Plugin-Based Delivery",
            description: "Swap notification providers without touching your code. Install community plugins or build custom ones with our SDK.",
            visual: <PluginVisual />,
            size: "large" as const,
        },
        {
            title: "Never Lose a Message",
            description: "Recovery service detects orphaned notifications from crashes and automatically reschedules them.",
            visual: <ShieldVisual />,
            size: "large" as const,
        },
        {
            title: "Exponential Backoff Retries",
            description: "Automatic retry with increasing delays ensures your notifications get delivered.",
            visual: <RetryVisual />,
            size: "default" as const,
        },
        {
            title: "Send at the Right Time",
            description: "Queue notifications for future delivery with Redis-backed scheduling.",
            visual: <ClockVisual />,
            size: "default" as const,
        },
        {
            title: "Scale Independently",
            description: "Scale email, SMS, and push processors separately based on your traffic patterns.",
            visual: <ScaleVisual />,
            size: "wide" as const,
        },
        {
            title: "Monitor & Manage",
            description: "Modern dashboard with real-time analytics, event filtering, one-click retries, and interactive Payload Studio.",
            visual: <DashboardVisual />,
            size: "default" as const,
        },
    ]

    return (
        <section className="relative overflow-hidden bg-[#0a0a0a] py-24 px-6" id="features">
            {/* Background gradient blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-800/10 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
                        Everything You Need for <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Reliable</span> Notifications
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-zinc-400">
                        Built-in resilience, scalability, crash-recovery and observability out of the box
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[auto_auto_auto]">
                    {/* Row 1: Large + Large + 2 Small stacked */}
                    <BentoCard {...features[0]} delay={0.1} />
                    <BentoCard {...features[1]} delay={0.2} />
                    <div className="flex flex-col gap-4">
                        <BentoCard {...features[2]} delay={0.3} />
                        <BentoCard {...features[3]} delay={0.4} />
                    </div>

                    {/* Row 2: Wide + Small */}
                    <BentoCard {...features[4]} delay={0.5} />
                    <BentoCard {...features[5]} delay={0.6} />
                </div>
            </div>
        </section>
    )
}
