"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Search,
    XCircle,
    AlertTriangle,
    Puzzle,
    FlaskConical,
    Filter,
    RotateCcw,
    BarChart3,
    CheckCircle2,
    Moon,
    Layers,
    Code2,
    Terminal,
    Mail,
    TestTube,
    Plus
} from "lucide-react"

// Animated Visual Components for each dashboard feature

const DashboardVisual = () => (
    <div className="relative h-28 w-full">
        {/* Mini dashboard mockup */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute inset-2 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden"
        >
            {/* Status cards row */}
            <div className="flex gap-1 p-2">
                {[
                    { color: "bg-green-500/30", label: "12.4K" },
                    { color: "bg-blue-500/30", label: "89%" },
                    { color: "bg-yellow-500/30", label: "23" },
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className={cn("flex-1 rounded p-1.5 text-center", card.color)}
                    >
                        <span className="text-[10px] font-medium text-white">{card.label}</span>
                    </motion.div>
                ))}
            </div>
            {/* Activity lines */}
            <div className="px-2 space-y-1">
                {[80, 60, 90].map((width, i) => (
                    <motion.div
                        key={i}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                        className="h-2 rounded bg-zinc-800 origin-left"
                        style={{ width: `${width}%` }}
                    />
                ))}
            </div>
        </motion.div>
    </div>
)

const EventsVisual = () => (
    <div className="relative h-28 w-full flex items-center justify-center">
        {/* Search bar and table */}
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[140px] space-y-2"
        >
            {/* Search bar */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center gap-1 rounded bg-zinc-800 px-2 py-1 origin-left"
            >
                <Search className="h-3 w-3 text-zinc-500" />
                <div className="h-2 w-12 rounded bg-zinc-700" />
            </motion.div>
            {/* Table rows */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-2 rounded bg-zinc-900 px-2 py-1.5 border border-zinc-800"
                >
                    <div className={cn(
                        "h-2 w-2 rounded-full",
                        i === 0 ? "bg-green-500" : i === 1 ? "bg-blue-500" : "bg-yellow-500"
                    )} />
                    <div className="flex-1 h-1.5 rounded bg-zinc-700" />
                </motion.div>
            ))}
        </motion.div>
    </div>
)

const FailedVisual = () => (
    <div className="relative h-28 w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
            {/* Failed notification stack */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 + i * 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    className={cn(
                        "flex items-center gap-2 rounded-lg border px-3 py-1.5",
                        "bg-red-500/10 border-red-500/30"
                    )}
                    style={{ transform: `translateX(${i * 4}px)` }}
                >
                    <XCircle className="h-3 w-3 text-red-400" />
                    <div className="h-1.5 w-12 rounded bg-red-500/30" />
                </motion.div>
            ))}
            {/* Retry button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-1 rounded-full bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 mt-1"
            >
                <RotateCcw className="h-3 w-3 text-blue-400" />
                <span className="text-[10px] text-blue-400">Retry All</span>
            </motion.div>
        </div>
    </div>
)

const AlertsVisual = () => (
    <div className="relative h-28 w-full flex items-center justify-center">
        <div className="space-y-2">
            {[
                { label: "Orphaned", count: 3, color: "text-yellow-400 bg-yellow-500/20 border-yellow-500/30" },
                { label: "Stuck", count: 1, color: "text-orange-400 bg-orange-500/20 border-orange-500/30" },
            ].map((alert, i) => (
                <motion.div
                    key={alert.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className={cn(
                        "flex items-center justify-between gap-4 rounded-lg border px-3 py-2",
                        alert.color
                    )}
                >
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span className="text-xs">{alert.label}</span>
                    </div>
                    <span className="text-xs font-bold">{alert.count}</span>
                </motion.div>
            ))}
        </div>
    </div>
)

const PluginsVisual = () => (
    <div className="relative h-28 w-full flex items-center justify-center">
        <div className="flex gap-2">
            {[
                { icon: <Mail className='text-white'/>, active: true },
                { icon: <TestTube className="text-white"/>, active: true },
                { icon: <Plus className="text-white"/>, active: false},
            ].map((plugin, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                    className={cn(
                        "flex flex-col items-center gap-1 rounded-xl border p-3",
                        plugin.active
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-zinc-800 border-zinc-700"
                    )}
                >
                    <span className="text-lg">{plugin.icon}</span>
                    <div className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        plugin.active ? "bg-green-500" : "bg-zinc-600"
                    )} />
                </motion.div>
            ))}
        </div>
    </div>
)

const StudioVisual = () => (
    <div className="relative h-28 w-full flex items-center justify-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[160px] rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center gap-1.5 px-2 py-1.5 bg-zinc-800/50 border-b border-zinc-800">
                <FlaskConical className="h-3 w-3 text-purple-400" />
                <span className="text-[10px] text-zinc-400">Payload Studio</span>
            </div>
            {/* Code preview */}
            <div className="p-2 space-y-1">
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="h-2 w-full rounded bg-purple-500/20 origin-left"
                />
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="h-2 w-3/4 rounded bg-blue-500/20 origin-left"
                />
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="h-2 w-5/6 rounded bg-green-500/20 origin-left"
                />
            </div>
        </motion.div>
    </div>
)

// Feature Card Component
interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
    visual: React.ReactNode
    delay?: number
}

const FeatureCard = ({ icon, title, description, visual, delay = 0 }: FeatureCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="group rounded-2xl border border-white/10 bg-zinc-950 p-5 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5"
        >
            {/* Visual */}
            {visual}

            {/* Icon + Title */}
            <div className="flex items-center gap-2 mb-2 mt-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    {icon}
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-500">{description}</p>
        </motion.div>
    )
}

// Capability Card Component
interface CapabilityCardProps {
    icon: React.ReactNode
    title: string
    points: string[]
    delay?: number
}

const CapabilityCard = ({ icon, title, points, delay = 0 }: CapabilityCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="rounded-xl border border-white/10 bg-zinc-900/50 p-5"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    {icon}
                </div>
                <h4 className="font-semibold text-white">{title}</h4>
            </div>
            <ul className="space-y-2">
                {points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        {point}
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}

export const DashboardSection = () => {
    const features = [
        {
            icon: <LayoutDashboard className="h-4 w-4" />,
            title: "Real-Time Dashboard",
            description: "Status cards, delivery metrics, and recent activity feed",
            visual: <DashboardVisual />,
        },
        {
            icon: <Search className="h-4 w-4" />,
            title: "Events Explorer",
            description: "Search and filter notifications with advanced sorting",
            visual: <EventsVisual />,
        },
        {
            icon: <XCircle className="h-4 w-4" />,
            title: "Failed Events",
            description: "Dedicated page with bulk retry capabilities",
            visual: <FailedVisual />,
        },
        {
            icon: <AlertTriangle className="h-4 w-4" />,
            title: "System Alerts",
            description: "Track orphaned, stuck, and ghost notifications",
            visual: <AlertsVisual />,
        },
        {
            icon: <Puzzle className="h-4 w-4" />,
            title: "Plugin Management",
            description: "View installed plugins and configurations",
            visual: <PluginsVisual />,
        },
        {
            icon: <FlaskConical className="h-4 w-4" />,
            title: "Payload Studio",
            description: "Interactive schema builder for API requests",
            visual: <StudioVisual />,
        },
    ]

    const capabilities = [
        {
            icon: <Filter className="h-5 w-5" />,
            title: "Monitor & Search",
            points: [
                "Paginated event tables with filtering",
                "Search by request ID",
                "Filter by status, channel, provider",
                "Sort by created/updated timestamps",
            ],
        },
        {
            icon: <RotateCcw className="h-5 w-5" />,
            title: "Manage Failures",
            points: [
                "Bulk retry for failed notifications",
                "One-click resolution for alerts",
                "Detailed error messages and logs",
                "Retry count tracking",
            ],
        },
        {
            icon: <BarChart3 className="h-5 w-5" />,
            title: "Analytics & Insights",
            points: [
                "Status distribution charts",
                "Channel-wise breakdown",
                "Delivery and failure rates",
                "Real-time statistics",
            ],
        },
    ]

    const benefits = [
        { icon: <CheckCircle2 className="h-4 w-4" />, label: "Zero Configuration" },
        { icon: <Moon className="h-4 w-4" />, label: "Dark Mode UI" },
        { icon: <Layers className="h-4 w-4" />, label: "Bulk Actions" },
        { icon: <Code2 className="h-4 w-4" />, label: "Type-Safe Schemas" },
    ]

    return (
        <section className="relative overflow-hidden bg-[#0a0a0a] py-24 px-6" id="dashboard">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl" />
                <div className="absolute left-1/3 bottom-0 h-96 w-96 rounded-full bg-blue-800/10 blur-3xl" />
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
                        Powerful <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Admin Dashboard</span> Included
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-zinc-400">
                        Built-in monitoring and management tools—no extra setup required
                    </p>
                </motion.div>

                {/* Feature Cards Grid */}
                <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={feature.title}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            visual={feature.visual}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                {/* Capability Cards */}
                <div className="mb-12 grid gap-4 md:grid-cols-3">
                    {capabilities.map((cap, index) => (
                        <CapabilityCard
                            key={cap.title}
                            icon={cap.icon}
                            title={cap.title}
                            points={cap.points}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                {/* Benefits Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 flex flex-wrap justify-center gap-3"
                >
                    {benefits.map((benefit, i) => (
                        <motion.span
                            key={benefit.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400"
                        >
                            {benefit.icon}
                            {benefit.label}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
