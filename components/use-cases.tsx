"use client"

import { motion } from "framer-motion"
import {
    Network,
    Shield,
    Layers,
    Clock
} from "lucide-react"

// Animated Visual Components

const MicroservicesVisual = () => (
    <div className="relative h-32 w-full flex items-center justify-center">
        <div className="flex items-center gap-2">
            {/* Services on left */}
            <div className="flex flex-col gap-1">
                {["Auth", "Users", "Orders"].map((service, i) => (
                    <motion.div
                        key={service}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                        className="h-6 px-2 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center"
                    >
                        <span className="text-[9px] text-zinc-400">{service}</span>
                    </motion.div>
                ))}
            </div>

            {/* Arrow */}
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="w-8 h-0.5 bg-blue-500/50 origin-left"
            />

            {/* Central API */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="h-14 w-14 rounded-xl bg-blue-500/30 border border-blue-500/50 flex items-center justify-center"
            >
                <span className="text-xs text-blue-400 font-bold">API</span>
            </motion.div>

            {/* Arrow */}
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="w-8 h-0.5 bg-blue-500/50 origin-left"
            />

            {/* Notify service */}
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="h-10 px-3 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center"
            >
                <span className="text-[10px] text-green-400">Notify</span>
            </motion.div>
        </div>
    </div>
)

const ProviderRedundancyVisual = () => (
    <div className="relative h-32 w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
            {/* Primary provider */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-center gap-2"
            >
                <div className="rounded-lg bg-green-500/20 border border-green-500/40 px-3 py-2 text-center">
                    <div className="text-[10px] text-green-400">Primary</div>
                    <div className="text-xs text-white font-medium">Gmail</div>
                </div>
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-green-400 text-xs"
                >
                    ✓
                </motion.span>
            </motion.div>

            {/* Failover arrow */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-zinc-500 text-xs"
            >
                ↓ failover
            </motion.div>

            {/* Backup provider */}
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="rounded-lg bg-blue-500/20 border border-blue-500/40 px-3 py-2 text-center opacity-70"
            >
                <div className="text-[10px] text-blue-400">Backup</div>
                <div className="text-xs text-white font-medium">SendGrid</div>
            </motion.div>
        </div>
    </div>
)

const BatchProcessingVisual = () => (
    <div className="relative h-32 w-full flex flex-col items-center justify-center gap-2">
        {[
            { width: "80%", delay: 0.2, color: "from-blue-500 to-blue-600" },
            { width: "60%", delay: 0.4, color: "from-green-500 to-green-600" },
            { width: "90%", delay: 0.6, color: "from-purple-500 to-purple-600" },
        ].map((bar, i) => (
            <div key={i} className="w-full max-w-[140px] h-4 rounded bg-zinc-800 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: bar.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: bar.delay }}
                    className={`h-full rounded bg-linear-to-r ${bar.color}`}
                />
            </div>
        ))}
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-xs text-zinc-500"
        >
            12.4K processed
        </motion.div>
    </div>
)

const ScheduledCampaignsVisual = () => (
    <div className="relative h-32 w-full flex items-center justify-center">
        <div className="flex items-center gap-3">
            {/* Clock */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative h-16 w-16 rounded-full border-2 border-blue-500/50 bg-blue-500/10 flex items-center justify-center"
            >
                <motion.div
                    initial={{ rotate: 0 }}
                    whileInView={{ rotate: 360 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute h-5 w-0.5 bg-blue-400 origin-bottom"
                    style={{ bottom: "50%" }}
                />
                <motion.div
                    initial={{ rotate: 0 }}
                    whileInView={{ rotate: 180 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute h-3 w-0.5 bg-blue-400 origin-bottom"
                    style={{ bottom: "50%" }}
                />
                <div className="h-2 w-2 rounded-full bg-blue-400 z-10" />
            </motion.div>

            {/* Timeline markers */}
            <div className="flex flex-col gap-1">
                {["9:00 AM", "2:00 PM", "6:00 PM"].map((time, i) => (
                    <motion.div
                        key={time}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.15 }}
                        className="flex items-center gap-2"
                    >
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-[10px] text-zinc-400">{time}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
)

// Use Case Card Component
interface UseCaseCardProps {
    icon: React.ReactNode
    title: string
    description: string
    visual: React.ReactNode
    delay?: number
}

const UseCaseCard = ({ icon, title, description, visual, delay = 0 }: UseCaseCardProps) => {
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

export const UseCasesSection = () => {
    const useCases = [
        {
            icon: <Network className="h-5 w-5" />,
            title: "Microservices Architecture",
            description: "Decouple notification logic from business services with a unified API",
            visual: <MicroservicesVisual />,
        },
        {
            icon: <Shield className="h-5 w-5" />,
            title: "Provider Redundancy",
            description: "Automatic failover to backup providers when primary is down",
            visual: <ProviderRedundancyVisual />,
        },
        {
            icon: <Layers className="h-5 w-5" />,
            title: "Batch Processing",
            description: "Send thousands of notifications efficiently with batch API endpoints",
            visual: <BatchProcessingVisual />,
        },
        {
            icon: <Clock className="h-5 w-5" />,
            title: "Scheduled Campaigns",
            description: "Queue time-zone-aware campaigns with built-in delayed delivery",
            visual: <ScheduledCampaignsVisual />,
        },
    ]

    return (
        <section className="relative overflow-hidden bg-[#0a0a0a] py-24 px-6" id="use-cases">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl" />
                <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-blue-800/10 blur-3xl" />
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
                        Built for <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Real-World</span> Scenarios
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-zinc-400">
                        Technical use cases where SimpleNS shines
                    </p>
                </motion.div>

                {/* Use Case Cards Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {useCases.map((useCase, index) => (
                        <UseCaseCard
                            key={useCase.title}
                            icon={useCase.icon}
                            title={useCase.title}
                            description={useCase.description}
                            visual={useCase.visual}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
