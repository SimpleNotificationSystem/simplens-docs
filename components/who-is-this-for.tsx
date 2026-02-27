"use client"

import { motion } from "framer-motion"
import { Server, ReplaceAll, Share2, ShieldCheck } from "lucide-react"

// --- Animated Visuals (same pattern as use-cases.tsx) ---

const ProvidersVisual = () => (
    <div className="relative h-32 w-full flex items-center justify-center">
        <div className="flex items-center gap-2">
            {/* Provider list on left */}
            <div className="flex flex-col gap-1">
                {["SendGrid", "Twilio", "Gmail"].map((name, i) => (
                    <motion.div
                        key={name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                        className="h-6 px-2 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center"
                    >
                        <span className="text-[9px] text-zinc-400">{name}</span>
                    </motion.div>
                ))}
            </div>

            {/* Arrows */}
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="w-8 h-0.5 bg-orange-500/50 origin-left"
            />

            {/* Central hub */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6, type: "spring" }}
                className="relative"
            >
                <div className="h-14 w-14 rounded-xl bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <Server className="h-7 w-7 text-white" />
                </div>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                    className="absolute inset-0 rounded-xl border-2 border-orange-500/30"
                />
            </motion.div>
        </div>
    </div>
)

const RetriesVisual = () => (
    <div className="relative h-32 w-full flex flex-col items-center justify-center gap-4">
        {/* Retry flow */}
        <div className="flex items-center gap-3 md:gap-4">
            {/* Failed */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-col items-center gap-1"
            >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                    <svg className="h-5 w-5 md:h-6 md:w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <span className="text-[10px] text-zinc-500 hidden md:block">Failed</span>
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

            {/* Retry hub */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                className="relative"
            >
                <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-linear-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
                    <ReplaceAll className="h-7 w-7 md:h-8 md:w-8 text-white" />
                </div>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                    className="absolute inset-0 rounded-2xl border-2 border-rose-500/30"
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

            {/* Success */}
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
                <span className="text-[10px] text-zinc-500 hidden md:block">Delivered</span>
            </motion.div>
        </div>

        {/* Auto-retry label */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="hidden md:flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1"
        >
            <div className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs text-rose-400">Auto-retry active</span>
        </motion.div>
    </div>
)

const ScatteredLogicVisual = () => (
    <div className="relative h-32 w-full flex items-center justify-center">
        <div className="flex items-center gap-2">
            {/* Scattered services */}
            <div className="flex flex-col gap-1">
                {["Retry", "Queue", "Alert"].map((label, i) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, x: -15, rotate: -5 + i * 5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
                        className="h-6 px-2 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center"
                    >
                        <span className="text-[9px] text-zinc-400">{label}</span>
                    </motion.div>
                ))}
            </div>

            {/* Converging arrows */}
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="w-8 h-0.5 bg-blue-500/50 origin-left"
            />

            {/* Unified hub */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6, type: "spring" }}
                className="h-14 w-14 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30"
            >
                <Share2 className="h-7 w-7 text-white" />
            </motion.div>

            {/* Arrow out */}
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="w-8 h-0.5 bg-blue-500/50 origin-left"
            />

            {/* Clean output */}
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="h-10 px-3 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center"
            >
                <span className="text-[10px] text-green-400">Unified</span>
            </motion.div>
        </div>
    </div>
)

const SelfHostedVisual = () => (
    <div className="relative h-32 w-full flex items-center justify-center">
        <div className="flex items-center gap-3">
            {/* Cloud crossed out */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-col items-center gap-1"
            >
                <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <svg className="h-5 w-5 md:h-6 md:w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                    {/* Cross line */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-red-500/60 rotate-45 rounded" />
                    </div>
                </div>
                <span className="text-[10px] text-zinc-500 hidden md:block">SaaS</span>
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

            {/* Self-hosted server */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                className="relative"
            >
                <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <ShieldCheck className="h-7 w-7 md:h-8 md:w-8 text-white" />
                </div>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                    className="absolute inset-0 rounded-2xl border-2 border-emerald-500/30"
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

            {/* Your server */}
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="flex flex-col items-center gap-1"
            >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <svg className="h-5 w-5 md:h-6 md:w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                </div>
                <span className="text-[10px] text-zinc-500 hidden md:block">Your Server</span>
            </motion.div>
        </div>
    </div>
)


// --- Card Component (matches use-cases.tsx structure) ---
interface WhoCardProps {
    icon: React.ReactNode
    title: string
    description: string
    visual: React.ReactNode
    delay?: number
}

const WhoCard = ({ icon, title, description, visual, delay = 0 }: WhoCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="group rounded-2xl border border-white/10 bg-zinc-950 p-6 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5"
        >
            {/* Visual */}
            {visual}

            {/* Content */}
            <div className="flex items-center gap-3 mb-2 mt-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    {icon}
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
            </div>
            <p className="text-sm text-zinc-500 pl-12">{description}</p>
        </motion.div>
    )
}

export function WhoIsThisForSection() {
    const cards = [
        {
            icon: <Server className="h-5 w-5" />,
            title: "Multiple Providers",
            description: "You manage multiple notification API providers (SendGrid, Twilio, WhatsApp, etc.).",
            visual: <ProvidersVisual />,
        },
        {
            icon: <ReplaceAll className="h-5 w-5" />,
            title: "Manual Retries",
            description: "You manually re-send failed emails or messages due to transient errors.",
            visual: <RetriesVisual />,
        },
        {
            icon: <Share2 className="h-5 w-5" />,
            title: "Scattered Logic",
            description: "Your retry and scheduling logic is scattered inconsistently across your microservices.",
            visual: <ScatteredLogicVisual />,
        },
        {
            icon: <ShieldCheck className="h-5 w-5" />,
            title: "Self-Hosted Control",
            description: "You want full self-hosted control of your data instead of expensive SaaS lock-in.",
            visual: <SelfHostedVisual />,
        },
    ]

    return (
        <section className="relative overflow-hidden py-24 px-6" id="who-is-this-for">
            <div className="relative z-10 mx-auto max-w-5xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
                        Who is <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">SimpleNS</span> For?
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-zinc-400">
                        Purpose-built for engineering teams dealing with complex notification workflows.
                    </p>
                </motion.div>

                {/* Cards Grid - 2 columns like use-cases */}
                <div className="grid gap-6 md:grid-cols-2">
                    {cards.map((card, index) => (
                        <WhoCard
                            key={card.title}
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                            visual={card.visual}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
