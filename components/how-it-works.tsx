"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
    Send,
    ListTodo,
    Plug,
    Rocket,
    CheckCircle2,
    RefreshCw,
    TrendingUp,
    Shield,
    Zap,
    Mail,
    Smartphone,
    MessageCircle,
    Bell,
    Clock,
    XCircle,
    Loader2
} from "lucide-react"

// Timeline Step Component
interface TimelineStepProps {
    stepNumber: number
    title: string
    description: string
    visual: React.ReactNode
    isLast?: boolean
    delay?: number
}

const TimelineStep = ({ stepNumber, title, description, visual, isLast = false, delay = 0 }: TimelineStepProps) => {
    return (
        <div className="relative flex gap-6 md:gap-10">
            {/* Step number and line */}
            <div className="flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay, type: "spring" }}
                    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-500/30"
                >
                    {stepNumber}
                </motion.div>
                {!isLast && (
                    <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: delay + 0.2 }}
                        className="h-full w-0.5 origin-top bg-linear-to-b from-blue-500 to-blue-600/20"
                    />
                )}
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: delay + 0.1 }}
                className="flex-1 pb-12"
            >
                <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
                <p className="mb-4 text-zinc-400 leading-relaxed">{description}</p>
                {visual}
            </motion.div>
        </div>
    )
}

// Highlight Card Component
interface HighlightCardProps {
    icon: React.ReactNode
    title: string
    description: string
    delay?: number
}

const HighlightCard = ({ icon, title, description, delay = 0 }: HighlightCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="group rounded-xl border border-white/10 bg-zinc-900/50 p-5 transition-all duration-300 hover:border-blue-500/30 hover:bg-zinc-900"
        >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-transform duration-300 group-hover:scale-110">
                {icon}
            </div>
            <h4 className="mb-1 font-semibold text-white">{title}</h4>
            <p className="text-sm text-zinc-400">{description}</p>
        </motion.div>
    )
}

// Visual Components for each step
const CodeSnippetVisual = () => (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden max-w-md">
        <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-zinc-500">POST /api/notification</span>
        </div>
        <pre className="p-4 text-sm overflow-x-auto">
            <code className="text-zinc-300">
                <span className="text-zinc-500">{"{"}</span>{"\n"}
                <span className="text-blue-400">  "channel"</span>: <span className="text-green-400">["email"]</span>,{"\n"}
                <span className="text-blue-400">  "recipient"</span>: <span className="text-zinc-500">{"{"}</span>{"\n"}
                <span className="text-blue-400">    "email"</span>: <span className="text-amber-400">"user@example.com"</span>{"\n"}
                <span className="text-zinc-500">  {"}"}</span>,{"\n"}
                <span className="text-blue-400">  "content"</span>: <span className="text-zinc-500">{"{"}</span>{"\n"}
                <span className="text-blue-400">    "subject"</span>: <span className="text-amber-400">"Hello!"</span>{"\n"}
                <span className="text-zinc-500">  {"}"}</span>{"\n"}
                <span className="text-zinc-500">{"}"}</span>
            </code>
        </pre>
    </div>
)

const QueueingVisual = () => (
    <div className="flex flex-wrap gap-2">
        {[
            { label: "MongoDB", color: "bg-green-500/20 text-green-400 border-green-500/30" },
            { label: "Kafka Streaming", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
            { label: "Redis Scheduling", color: "bg-red-500/20 text-red-400 border-red-500/30" },
            { label: "Guaranteed Delivery", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
        ].map((item, i) => (
            <motion.span
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={cn("rounded-full border px-3 py-1 text-xs font-medium", item.color)}
            >
                {item.label}
            </motion.span>
        ))}
    </div>
)

const PluginVisual = () => (
    <div className="flex items-center gap-3 flex-wrap">
        {[
            { name: "Gmail", icon: <Mail className="h-4 w-4" /> },
            { name: "Twilio", icon: <Smartphone className="h-4 w-4" /> },
            { name: "WhatsApp", icon: <MessageCircle className="h-4 w-4" /> },
            { name: "FCM", icon: <Bell className="h-4 w-4" /> },
        ].map((plugin, i) => (
            <motion.div
                key={plugin.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-300"
            >
                {plugin.icon}
                {plugin.name}
            </motion.div>
        ))}
    </div>
)

const RetryVisual = () => (
    <div className="flex items-center gap-2">
        {[
            { time: "2s", attempt: "1st" },
            { time: "4s", attempt: "2nd" },
            { time: "8s", attempt: "3rd" },
            { time: "16s", attempt: "4th" },
        ].map((retry, i) => (
            <motion.div
                key={retry.attempt}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex flex-col items-center rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2"
            >
                <span className="text-xs text-zinc-500">{retry.attempt}</span>
                <span className="text-sm font-medium text-blue-400">{retry.time}</span>
            </motion.div>
        ))}
        <span className="text-zinc-500 text-sm">→ max</span>
    </div>
)

const StatusVisual = () => (
    <div className="flex flex-wrap gap-2">
        {[
            { status: "Delivered", icon: <CheckCircle2 className="h-3.5 w-3.5" />, color: "bg-green-500/20 text-green-400 border-green-500/30" },
            { status: "Pending", icon: <Clock className="h-3.5 w-3.5" />, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
            { status: "Processing", icon: <Loader2 className="h-3.5 w-3.5" />, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
            { status: "Failed", icon: <XCircle className="h-3.5 w-3.5" />, color: "bg-red-500/20 text-red-400 border-red-500/30" },
        ].map((item, i) => (
            <motion.span
                key={item.status}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={cn("flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium", item.color)}
            >
                {item.icon}
                {item.status}
            </motion.span>
        ))}
    </div>
)

export const HowItWorksSection = () => {
    const steps = [
        {
            title: "Your App or Web Service sends a Notification",
            description: "Send a unified JSON payload to SimpleNS REST API. One request format works across all channels—email, SMS, WhatsApp, and more.",
            visual: <CodeSnippetVisual />,
        },
        {
            title: "Background Workers Process It",
            description: "Your notification is persisted to MongoDB and published to Kafka queues. Scheduled messages go to Redis ZSET for time-based delivery.",
            visual: <QueueingVisual />,
        },
        {
            title: "Core Routes to the Right Plugin",
            description: "SimpleNS automatically selects the appropriate plugin based on the channel and your configuration. Rate limiting and retry policies are applied.",
            visual: <PluginVisual />,
        },
        {
            title: "Plugin Delivers the Message",
            description: "The selected plugin handles the actual delivery using your provider's API. If delivery fails, exponential backoff retries kick in automatically.",
            visual: <RetryVisual />,
        },
        {
            title: "Track Everything in Real-Time",
            description: "Delivery status is saved to MongoDB and sent via webhooks. Monitor all events in the Admin Dashboard with filtering, search, and analytics. Retry failed and alerted events also.",
            visual: <StatusVisual />,
        },
    ]

    return (
        <section className="relative overflow-hidden bg-[#0a0a0a] py-24 px-6" id="how-it-works">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl" />
                <div className="absolute left-0 bottom-1/4 h-96 w-96 rounded-full bg-blue-800/10 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
                        Simple Architecture, <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Powerful</span> Results
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-zinc-400">
                        Separation of concerns: Core handles orchestration, plugins handle delivery
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="mb-20">
                    {steps.map((step, index) => (
                        <TimelineStep
                            key={index}
                            stepNumber={index + 1}
                            title={step.title}
                            description={step.description}
                            visual={step.visual}
                            isLast={index === steps.length - 1}
                            delay={index * 0.15}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
