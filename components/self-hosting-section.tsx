"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { ArrowRight, Server, Database, Radio } from "lucide-react"
import { motion } from "framer-motion"

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
        <section className="relative overflow-hidden py-24 px-6" id="self-hosting">
            {/* Background Effects */}
            {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-900/20 blur-[120px]" />
                <div className="absolute left-0 bottom-1/4 h-[400px] w-[400px] rounded-full bg-indigo-900/15 blur-[100px]" />
            </div> */}

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
                                    Self-Hosting Guide
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Side - Illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex items-center justify-center pointer-events-none select-none"
                    >
                        <div className="relative w-full max-w-[600px] aspect-square">
                            <Image
                                src="/images/docker-whale.png"
                                alt="SimpleNS Architecture Illustration"
                                fill
                                className="object-contain drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
