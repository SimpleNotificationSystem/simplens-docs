"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { LightRays } from "@/components/ui/light-rays"
import { motion } from "framer-motion"
import IntegrationsSection from "./integration"

export const HeroSection = () => {
    return (
        <section className="min-h-screen bg-[#0a0a0a] flex items-center relative overflow-hidden">
            {/* Background Light Rays */}
            <LightRays className="z-0 opacity-40" />

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff1a_1px,transparent_1px)] bg-size-[20px_20px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-20 pointer-events-none z-0" />

            <div className="w-full max-w-7xl mx-auto px-8 py-32 pt-40 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Tagline, Subtitle, Buttons */}
                    <div className="flex flex-col items-start text-left">
                        {/* Tagline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="mb-8"
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1, duration: 0.5 }}
                                    className="block bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                                >
                                    Scalable.
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="block bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                                >
                                    Reliable.
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="block bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                                >
                                    Extensible.
                                </motion.span>
                            </h1>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="text-lg md:text-xl text-zinc-400 max-w-xl mb-12 leading-relaxed"
                        >
                            Open-source plugin-based notification orchestration engine for developers who value control.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto"
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
                                <Link href="/docs">
                                    Get started
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
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

