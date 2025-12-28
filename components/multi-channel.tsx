"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Mail,
    MessageCircle,
    Smartphone,
    Bell,
    TestTube,
    Plus,
    Unlock,
    Rocket,
    ShieldCheck,
    Users,
    ArrowRight,
    Terminal,
    Code2
} from "lucide-react"

// Channel Card Component
interface ChannelCardProps {
    icon: React.ReactNode
    title: string
    providers: string[]
    delay?: number
}

const ChannelCard = ({ icon, title, providers, delay = 0 }: ChannelCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="group rounded-xl border border-white/10 bg-zinc-900/50 p-5 transition-all duration-300 hover:border-blue-500/30 hover:bg-zinc-900 flex justify-center items-center flex-col"
        >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-transform duration-300 group-hover:scale-110">
                {icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
            <p className="text-sm text-zinc-500">{providers.join(" • ")}</p>
        </motion.div>
    )
}

// Benefit Card Component
interface BenefitCardProps {
    icon: React.ReactNode
    title: string
    description: string
    delay?: number
}

const BenefitCard = ({ icon, title, description, delay = 0 }: BenefitCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="flex items-start gap-4 rounded-xl border border-white/10 bg-zinc-900/30 p-4"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                {icon}
            </div>
            <div>
                <h4 className="mb-1 font-semibold text-white">{title}</h4>
                <p className="text-sm text-zinc-400">{description}</p>
            </div>
        </motion.div>
    )
}

// Code Block Component
interface CodeBlockProps {
    title: string
    icon: React.ReactNode
    children: React.ReactNode
    delay?: number
}

const CodeBlock = ({ title, icon, children, delay = 0 }: CodeBlockProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden"
        >
            <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/50 px-4 py-3">
                <div className="flex items-center gap-2 text-zinc-400">
                    {icon}
                    <span className="text-sm font-medium">{title}</span>
                </div>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-zinc-300">{children}</code>
            </pre>
        </motion.div>
    )
}

export const MultiChannelSection = () => {
    const channels = [
        {
            icon: <Mail className="h-6 w-6" />,
            title: "Email",
            providers: ["Gmail (Nodemailer)"],
        },
        {
            icon: <TestTube className="h-6 w-6" />,
            title: "Mock",
            providers: ["Built-in testing"],
        },
        {
            icon: <Plus className="h-6 w-6" />,
            title: "Custom",
            providers: ["Build with SDK"],
        },
    ]

    const benefits = [
        {
            icon: <Unlock className="h-5 w-5" />,
            title: "No Vendor Lock-in",
            description: "Switch providers instantly without code changes",
        },
        {
            icon: <Rocket className="h-5 w-5" />,
            title: "Quick Integration",
            description: "CLI scaffolding gets you started in seconds",
        },
        {
            icon: <ShieldCheck className="h-5 w-5" />,
            title: "Type-Safe",
            description: "Full TypeScript support with schema validation",
        },
        {
            icon: <Users className="h-5 w-5" />,
            title: "Community-Driven",
            description: "Share and use plugins from the ecosystem",
        },
    ]

    return (
        <section className="relative overflow-hidden bg-black py-24 px-6" id="channels">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl" />
                <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-blue-800/10 blur-3xl" />
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
                        One API. <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Every Channel.</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-zinc-400">
                        Send notifications across email, SMS, WhatsApp, push, and more—all with the same unified interface
                    </p>
                </motion.div>

                {/* Channel Cards Grid */}
                <div className="mb-20 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
                    {channels.map((channel, index) => (
                        <ChannelCard
                            key={channel.title}
                            icon={channel.icon}
                            title={channel.title}
                            providers={channel.providers}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                {/* Plugin SDK Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                        Extend with Custom Plugins
                    </h3>
                    <p className="text-zinc-400">
                        Support any provider in minutes using our powerful SDK
                    </p>
                </motion.div>

                {/* Code Blocks */}
                <div className="mb-12 grid gap-4 md:grid-cols-2">
                    <CodeBlock title="Quick Start" icon={<Terminal className="h-4 w-4" />} delay={0.1}>
                        <span className="text-zinc-500"># Scaffold a new plugin</span>{"\n"}
                        <span className="text-green-400">npx</span> @simplens/create-simplens-plugin{"\n\n"}
                        <span className="text-zinc-500"># Install and configure</span>{"\n"}
                        <span className="text-green-400">npm</span> run plugin:install @your/plugin
                    </CodeBlock>

                    <CodeBlock title="Simple Code" icon={<Code2 className="h-4 w-4" />} delay={0.2}>
                        <span className="text-purple-400">import</span> {"{"} SimpleNSProvider {"}"} <span className="text-purple-400">from</span> <span className="text-amber-400">'@simplens/sdk'</span>;{"\n\n"}
                        <span className="text-purple-400">class</span> <span className="text-blue-400">MyProvider</span> <span className="text-purple-400">implements</span> SimpleNSProvider {"{"}{"\n"}
                        {"  "}<span className="text-purple-400">async</span> <span className="text-yellow-400">send</span>(notification) {"{"}{"\n"}
                        {"    "}<span className="text-zinc-500">// Your delivery logic</span>{"\n"}
                        {"    "}<span className="text-purple-400">return</span> {"{"} success: <span className="text-blue-400">true</span> {"}"};{"\n"}
                        {"  "}{"}"}{"\n"}
                        {"}"}
                    </CodeBlock>
                </div>

                {/* Benefits Grid */}
                <div className="mb-12 grid gap-4 sm:grid-cols-2">
                    {benefits.map((benefit, index) => (
                        <BenefitCard
                            key={benefit.title}
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-5 text-base font-medium rounded-xl"
                        asChild
                    >
                        <Link href="/docs/plugins">
                            Browse Plugins
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        className="border-zinc-700 hover:bg-[#e8e8e8] px-6 py-5 text-base font-medium rounded-xl"
                        asChild
                    >
                        <Link href="/docs/sdk">
                            Build a Plugin
                        </Link>
                    </Button>
                </motion.div>

                {/* Trust Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <p className="text-sm text-zinc-600">
                        Plugin SDK with full TypeScript support • <code className="text-zinc-500">@simplens/sdk</code> + <code className="text-zinc-500">@simplens/create-simplens-plugin</code>
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
