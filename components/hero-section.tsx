"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowRight, Check, Copy, Terminal, Monitor, Package, ChevronDown } from "lucide-react"
import { LightRays } from "@/components/ui/light-rays"
import { motion, AnimatePresence } from "framer-motion"
import IntegrationsSection from "./integration"
import { useState, useEffect } from "react"

// Base URL from environment variable or default
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://simplens.vercel.app"

// Installation commands data
const installCommands = {
    linux: {
        label: "Linux",
        icon: <Terminal className="h-3.5 w-3.5" />,
        command: `curl -fsSL ${BASE_URL}/api/install/linux | bash`,
    },
    windows: {
        label: "Windows",
        icon: <Monitor className="h-3.5 w-3.5" />,
        command: `irm ${BASE_URL}/api/install/windows | iex`,
    },
    npm: {
        label: "npm",
        icon: <Package className="h-3.5 w-3.5" />,
        command: "npx @simplens/onboard",
    },
}

// Animated words for tagline
const animatedWords = ["Scalable.", "Reliable.", "Extensible."]

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
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-zinc-400 hover:text-white shrink-0"
            title="Copy to clipboard"
        >
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
        </button>
    )
}

// Compact Install Card Component
const CompactInstallCard = () => {
    const [selectedOS, setSelectedOS] = useState<keyof typeof installCommands>("linux")
    const [isOpen, setIsOpen] = useState(false)

    // Detect OS on mount
    useEffect(() => {
        const detectOS = (): keyof typeof installCommands => {
            if (typeof window === 'undefined') return 'linux'

            const userAgent = navigator.userAgent.toLowerCase()

            if (userAgent.includes('win')) {
                return 'windows'
            } else if (userAgent.includes('mac')) {
                // macOS users typically prefer npm/npx
                return 'npm'
            } else {
                // Linux and other Unix-like systems
                return 'linux'
            }
        }

        setSelectedOS(detectOS())
    }, [])

    const currentCommand = installCommands[selectedOS]

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (!target.closest('[data-dropdown]')) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('click', handleClickOutside)
        }

        return () => document.removeEventListener('click', handleClickOutside)
    }, [isOpen])

    return (
        <div className="w-full">
            {/* Install Command Card */}
            <div className="flex items-center bg-zinc-900/80 border border-zinc-800 rounded-xl">
                {/* OS Dropdown */}
                <div className="relative" data-dropdown>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsOpen(!isOpen)
                        }}
                        className="flex items-center gap-2 px-4 py-3 bg-zinc-800/50 hover:bg-zinc-800 transition-colors border-r border-zinc-700 text-sm font-medium text-zinc-300 rounded-l-xl"
                    >
                        {currentCommand.icon}
                        <span className="hidden sm:inline">{currentCommand.label}</span>
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-full left-0 mt-1 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-100 min-w-[120px]"
                            >
                                {Object.entries(installCommands).map(([key, data]) => (
                                    <button
                                        key={key}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setSelectedOS(key as keyof typeof installCommands)
                                            setIsOpen(false)
                                        }}
                                        className={`flex items-center gap-2 w-full px-4 py-2.5 text-sm hover:bg-zinc-800 transition-colors ${selectedOS === key ? "text-blue-400 bg-blue-500/10" : "text-zinc-300"
                                            }`}
                                    >
                                        {data.icon}
                                        {data.label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Command Display */}
                <div className="flex-1 px-4 py-3 overflow-hidden">
                    <code className="text-sm text-zinc-300 font-mono truncate block">
                        <span className="text-zinc-100"><span className="text-blue-500">{currentCommand.command.split(' ').at(0)}</span>{currentCommand.command.substring(currentCommand.command.split(' ').at(0)!.length)}</span>
                    </code>
                </div>

                {/* Copy Button */}
                <div className="pr-2">
                    <CopyButton text={currentCommand.command} />
                </div>
            </div>

            {/* Documentation Link */}
            <div className="mt-3 text-left px-1 py-1">
                <p className="text-sm text-zinc-500">
                    or read the <a href="/docs/core/getting-started" className="underline">documentation.</a>
                </p>
            </div>
        </div>
    )
}

export const HeroSection = () => {
    const [wordIndex, setWordIndex] = useState(0)

    // Auto-cycle through words
    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % animatedWords.length)
        }, 2500)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="min-h-screen flex items-center relative overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] bg-size-[20px_20px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-20 pointer-events-none z-0" />

            <div className="w-full max-w-7xl mx-auto px-8 py-32 pt-40 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Tagline, Subtitle, Buttons */}
                    <div className="flex flex-col items-start text-left">
                        {/* Animated Tagline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="mb-8"
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight flex items-baseline gap-4 flex-wrap">
                                <span className="text-white">Built for</span>
                                <span className="text-zinc-500 text-4xl md:text-5xl lg:text-6xl">&gt;</span>
                                <span className="relative h-[1.2em] overflow-hidden inline-flex items-baseline min-w-[280px] md:min-w-[350px]">
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={wordIndex}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -30 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="absolute bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                                        >
                                            {animatedWords[wordIndex]}
                                        </motion.span>
                                    </AnimatePresence>
                                </span>
                            </h1>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-lg md:text-xl text-zinc-400 max-w-xl mb-10 leading-relaxed"
                        >
                            Open-source plugin-based notification orchestration engine for developers who value control.
                        </motion.p>

                        {/* Buttons
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto mb-8"
                        >
                            <Button
                                className="bg-white text-black hover:bg-zinc-200 px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg font-medium rounded-xl transition-all duration-200 hover:scale-105"
                                asChild
                            >
                                <Link href="https://github.com/SimpleNotificationSystem/simplens-core">
                                    Star on GitHub
                                </Link>
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-white hover:text-white hover:bg-white/10 px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg font-medium rounded-xl transition-all duration-200 group"
                                asChild
                            >
                                <Link href="/docs/core">
                                    Get started
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </motion.div> */}

                        {/* Compact Install Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="w-full max-w-xl"
                        >
                            <CompactInstallCard />
                        </motion.div>
                    </div>

                    {/* Right Side - Integration Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <IntegrationsSection />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
