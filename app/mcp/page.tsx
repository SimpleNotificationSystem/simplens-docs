"use client"

import Link from "next/link"
import { motion, AnimatePresence, type Easing } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LightRays } from "@/components/ui/light-rays"
import { ArrowRight, Zap, Code, Terminal, Plug, Hammer } from "lucide-react"

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1] as Easing
        }
    }
}

const heroVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as Easing
        }
    }
}



export default function MCPPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
            <LightRays className="fixed inset-0 z-0 opacity-30 pointer-events-none" />

            <div className="relative z-10">
                <Header />

                {/* Hero Section */}
                <section className="relative pt-32 pb-40 overflow-hidden min-h-[80vh] flex items-center justify-center">

                    {/* Floating Integration Logos - Background Elements */}


                    <motion.div
                        className="relative max-w-5xl mx-auto px-6 text-center z-10"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                            variants={heroVariants}
                        >
                            <Plug className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-zinc-400">Powered by Model Context Protocol</span>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-6xl font-bold mb-8 tracking-tight"
                            variants={heroVariants}
                        >
                            Talk to your <br />
                            <span className="bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                                Notification System
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                            variants={heroVariants}
                        >
                            Connect your SimpleNS instance directly to Claude, Cursor, and VS Code
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                            variants={heroVariants}
                        >
                            <Link
                                href="/docs/mcp"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-medium transition-all hover:scale-105"
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/docs/mcp/available-tools-and-resources"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all"
                            >
                                <Hammer className="w-4 h-4" />
                                View Tools
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Integration Section */}
                <section className="py-24 border-t border-white/5">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to integrate?</h2>
                            <p className="text-zinc-400 mb-10 text-lg">
                                Follow our guides to connect SimpleNS MCP to your favorite tool.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                {['VS Code', 'Antigravity', 'Codex'].map((tool) => (
                                    <div key={tool} className="px-6 py-3 bg-[#121212] border border-white/10 rounded-lg text-zinc-300 font-mono text-sm">
                                        {tool}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12">
                                <Link
                                    href="/docs/mcp/getting-started"
                                    className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-2"
                                >
                                    View Integration Guides
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    )
}
