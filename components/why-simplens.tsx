"use client"

import { motion } from "framer-motion"
import {
    XCircle,
    CheckCircle2,
    ArrowRight,
    Blocks,
    Eye,
    Github
} from "lucide-react"

// Problem-Solution Pair Component
interface ProblemSolutionPairProps {
    problem: { title: string; description: string }
    solution: { title: string; description: string }
    delay?: number
}

const ProblemSolutionPair = ({ problem, solution, delay = 0 }: ProblemSolutionPairProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="flex flex-col md:flex-row items-stretch gap-3 md:gap-4"
        >
            {/* Problem Card */}
            <div className="flex-1 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/20 text-red-400">
                        <XCircle className="h-4 w-4" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-red-400 text-sm">{problem.title}</h4>
                        <p className="text-xs text-zinc-500 mt-0.5">{problem.description}</p>
                    </div>
                </div>
            </div>

            {/* Arrow - only visible on desktop */}
            <div className="hidden md:flex items-center justify-center shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700">
                    <ArrowRight className="h-4 w-4 text-white" />
                </div>
            </div>

            {/* Solution Card */}
            <div className="flex-1 rounded-xl border border-green-500/30 bg-green-500/5 p-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-500/20 text-green-400">
                        <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-green-400 text-sm">{solution.title}</h4>
                        <p className="text-xs text-zinc-500 mt-0.5">{solution.description}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// Value Pillar Component (Stats Card Style)
interface ValuePillarProps {
    title: string
    subtitle: string
    delay?: number
}

const ValuePillar = ({ title, subtitle, delay = 0 }: ValuePillarProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-8 md:p-12 transition-all duration-500 hover:border-white/20"
        >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-32 w-32 rounded-full bg-white/5 blur-3xl" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center h-full min-h-[120px]">
                {/* Large Title */}
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
                    {title}
                </h3>

                {/* Subtitle */}
                <p className="text-sm text-blue-400 font-medium">
                    {subtitle}
                </p>
            </div>
        </motion.div>
    )
}

// Trust Badge Component
interface TrustBadgeProps {
    icon: React.ReactNode
    title: string
    subtitle: string
    delay?: number
}

const TrustBadge = ({ icon, title, subtitle, delay = 0 }: TrustBadgeProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/50 px-5 py-4"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                {icon}
            </div>
            <div>
                <div className="font-semibold text-white">{title}</div>
                <div className="text-xs text-zinc-500">{subtitle}</div>
            </div>
        </motion.div>
    )
}

export const WhySimpleNSSection = () => {
    const problemSolutions = [
        {
            problem: { title: "Vendor Lock-in", description: "Stuck with one provider's API and pricing" },
            solution: { title: "Plugin Architecture", description: "Swap providers in minutes without changing code" },
        },
        {
            problem: { title: "Silent Failures", description: "Messages disappear without a trace" },
            solution: { title: "Exponential Backoff", description: "Automatic retries with configurable limits" },
        },
        {
            problem: { title: "Crash = Lost Messages", description: "Server crashes leave notifications orphaned" },
            solution: { title: "Crash Recovery Service", description: "Detects and rescues stuck notifications" },
        },
        {
            problem: { title: "Single Point of Failure", description: "One queue handles everything" },
            solution: { title: "Horizontal Scaling", description: "Scale email, SMS, push workers independently" },
        },
        {
            problem: { title: "Complex Scheduling", description: "Build your own delayed job system" },
            solution: { title: "Built-in Scheduling", description: "Redis-backed queue for future delivery" },
        },
        {
            problem: { title: "Different APIs per Channel", description: "Learn every provider's unique interface" },
            solution: { title: "Unified API", description: "One endpoint for all notification types" },
        },
    ]

    const pillars = [
        {
            title: "Reliability First",
            subtitle: "No message is ever lost",
        },
        {
            title: "Developer Freedom",
            subtitle: "Self-hosted & open-source",
        },
        {
            title: "Production Ready",
            subtitle: "Built-in observability",
        },
    ]

    const trustSignals = [
        {
            icon: <Github className="h-5 w-5" />,
            title: "100% Open Source",
            subtitle: "MIT License",
        },
        {
            icon: <Blocks className="h-5 w-5" />,
            title: "Zero Vendor Lock-in",
            subtitle: "Plugin-based providers",
        },
        {
            icon: <Eye className="h-5 w-5" />,
            title: "Full Observability",
            subtitle: "Grafana + Loki included",
        },
    ]

    return (
        <section className="relative overflow-hidden bg-black py-24 px-6" id="why">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-blue-900/20 blur-[120px]" />
            </div>

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
                        Built for <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Developers</span> Who Value <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Control</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-zinc-400">
                        Stop fighting notification complexity. Get reliability, flexibility, and observability out of the box.
                    </p>
                </motion.div>

                {/* Problem → Solution Grid */}
                <div className="mb-20 space-y-4">
                    {problemSolutions.map((pair, index) => (
                        <ProblemSolutionPair
                            key={pair.problem.title}
                            problem={pair.problem}
                            solution={pair.solution}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                {/* Value Pillars */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h3 className="mb-8 text-center text-xl font-semibold text-white">Core Value Props</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                        {pillars.map((pillar, index) => (
                            <ValuePillar
                                key={pillar.title}
                                title={pillar.title}
                                subtitle={pillar.subtitle}
                                delay={index * 0.15}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Trust Signals */}
                <div className="grid gap-4 sm:grid-cols-3">
                    {trustSignals.map((signal, index) => (
                        <TrustBadge
                            key={signal.title}
                            icon={signal.icon}
                            title={signal.title}
                            subtitle={signal.subtitle}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
