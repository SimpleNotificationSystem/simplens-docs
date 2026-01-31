"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ArrowRight, Server, Database, Radio, Container, Check, Copy, Terminal, Monitor, Package } from "lucide-react"
import { motion } from "framer-motion"

// Base URL from environment variable or default
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://simplens.vercel.app"

// Tab data type
interface TabData {
    label: string
    icon: React.ReactNode
    commands: {
        primary: string
        description: string
        secondary?: string
        secondaryDescription?: string
    }
    info: string
}

// Tab data
const tabsData: Record<string, TabData> = {
    linux: {
        label: "Linux",
        icon: <Terminal className="h-3.5 w-3.5" />,
        commands: {
            primary: `curl -fsSL ${BASE_URL}/api/install/linux | bash`,
            description: "Run with bash",
        },
        info: "Works on Ubuntu, Debian, CentOS, and other Linux distros",
    },
    windows: {
        label: "Windows",
        icon: <Monitor className="h-3.5 w-3.5" />,
        commands: {
            primary: `irm ${BASE_URL}/api/install/windows | iex`,
            description: "Run in PowerShell (Admin)",
        },
        info: "Requires PowerShell 5.1+ running as Administrator",
    },
    npm: {
        label: "npm",
        icon: <Package className="h-3.5 w-3.5" />,
        commands: {
            primary: "npx @simplens/onboard",
            description: "Quick start with npx",
            secondary: "npm i -g @simplens/onboard",
            secondaryDescription: "Or install globally",
        },
        info: "Requires Node.js 18+ and npm installed",
    },
}

// Copy Button Component
const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-white shrink-0"
            title="Copy to clipboard"
        >
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
        </button>
    )
}

// Command Block Component
const CommandBlock = ({ command, description }: { command: string; description: string }) => (
    <div className="space-y-2">
        <div className="text-xs text-zinc-500">{description}</div>
        <div className="flex items-center justify-between gap-3 bg-zinc-900/50 rounded-lg p-3 border border-zinc-800">
            <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-green-400 shrink-0">$</span>
                <code className="text-zinc-300 text-sm truncate">{command}</code>
            </div>
            <CopyButton text={command} />
        </div>
    </div>
)

// Installation Tabs Component
const InstallationTabs = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
        >
            {/* Terminal Window */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
                <Tabs defaultValue="linux" className="w-full">
                    {/* Terminal Header */}
                    <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                        {/* Top row with window controls */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-xs text-zinc-500 ml-2 font-mono hidden sm:inline">Installation</span>
                            </div>

                            {/* Desktop: Tabs in header */}
                            <TabsList className="hidden sm:flex bg-zinc-800/50 border border-zinc-700 p-1">
                                {Object.entries(tabsData).map(([key, tab]) => (
                                    <TabsTrigger
                                        key={key}
                                        value={key}
                                        className="text-xs data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:border-blue-500/30 px-3 py-1.5"
                                    >
                                        <span className="mr-1.5">{tab.icon}</span>
                                        {tab.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {/* Mobile: Tabs below header */}
                        <TabsList className="flex sm:hidden bg-zinc-800/50 border border-zinc-700 p-1 mt-3 w-full justify-center">
                            {Object.entries(tabsData).map(([key, tab]) => (
                                <TabsTrigger
                                    key={key}
                                    value={key}
                                    className="text-xs data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=active]:border-blue-500/30 px-3 py-1.5 flex-1"
                                >
                                    <span className="mr-1.5">{tab.icon}</span>
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-5 font-mono text-sm">
                        {Object.entries(tabsData).map(([key, tab]) => (
                            <TabsContent key={key} value={key} className="mt-0 space-y-4">
                                <CommandBlock
                                    command={tab.commands.primary}
                                    description={tab.commands.description}
                                />

                                {tab.commands.secondary && (
                                    <CommandBlock
                                        command={tab.commands.secondary}
                                        description={tab.commands.secondaryDescription || ""}
                                    />
                                )}

                                {/* Info Message */}
                                <div className="text-zinc-500 text-xs pt-2 border-t border-zinc-800">
                                    <div className="flex items-center gap-2">
                                        <span className="text-blue-400">ℹ</span>
                                        <span>{tab.info}</span>
                                    </div>
                                </div>
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </div >
        </motion.div >
    )
}

// Deployment Badge Component
interface DeploymentBadgeProps {
    icon: React.ReactNode
    label: string
    description: string
    delay?: number
}

const DeploymentBadge = ({ icon, label, description, delay = 0 }: DeploymentBadgeProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900/50 px-4 py-3"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                {icon}
            </div>
            <div>
                <div className="font-medium text-white text-sm">{label}</div>
                <div className="text-xs text-zinc-500">{description}</div>
            </div>
        </motion.div>
    )
}

export const SelfHostingSection = () => {
    const deploymentOptions = [
        {
            icon: <Server className="h-5 w-5" />,
            label: "Single Machine",
            description: "All-in-one setup",
        },
        {
            icon: <Radio className="h-5 w-5" />,
            label: "Distributed",
            description: "Scale across hosts",
        },
        {
            icon: <Database className="h-5 w-5" />,
            label: "Cloud Ready",
            description: "Use managed services",
        },
    ]

    return (
        <section className="relative overflow-hidden bg-black py-24 px-6" id="self-hosting">
            {/* Background Effects */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-900/20 blur-[120px]" />
                <div className="absolute left-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-indigo-900/15 blur-[100px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Content */}
                    <div className="flex flex-col items-start text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
                                <Server className="h-4 w-4" />
                                Self-Hosted & Open Source
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
                        >
                            Deploy SimpleNS{" "}
                            <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                Your Way
                            </span>
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-zinc-400 mb-8 max-w-lg leading-relaxed"
                        >
                            Flexible infrastructure options—single machine, distributed, or cloud-native.
                            Full control over your notification infrastructure with zero vendor lock-in.
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Button
                                className="bg-white text-black hover:bg-zinc-200 px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg font-medium rounded-xl transition-all duration-200 hover:scale-105 group"
                                asChild
                            >
                                <Link href="/docs/core/self-hosting">
                                    For More Advanced Self-Hosting
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Side - Installation Tabs */}
                    <InstallationTabs />
                </div>

                {/* Bottom Deployment Badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                    {deploymentOptions.map((option, index) => (
                        <DeploymentBadge
                            key={option.label}
                            icon={option.icon}
                            label={option.label}
                            description={option.description}
                            delay={0.6 + index * 0.1}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
