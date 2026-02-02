"use client"

import Link from "next/link"
import { Github, Package, Rocket, Bug, Anchor, ExternalLink, Calendar, Tag, ChevronDown } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ContainerIcon } from "lucide-react"

// Types for changelog data structure (mirrors the MDX frontmatter)
interface FeatureGroup {
    category: string
    items: string[]
}

interface Release {
    version: string
    date: string
    tag?: string
    description: string
    dockerImages: string[]
    features?: FeatureGroup[]
    bugFixes?: string[]
}

// Release Card Component
function ReleaseCard({ release }: { release: Release }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <article className="relative mb-4">
            {/* Card Container */}
            <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all">
                {/* Clickable Header */}
                <div
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="cursor-pointer p-6"
                >
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    v{release.version}
                                </h2>
                                {release.tag && (
                                    <span className="px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                                        {release.tag}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-zinc-500 mb-3">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {release.date}
                                </span>
                            </div>
                            <p className="text-zinc-400">
                                {release.description}
                            </p>
                        </div>
                        <div className="shrink-0">
                            <ChevronDown
                                className={`w-6 h-6 text-zinc-500 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                            />
                        </div>
                    </div>

                    {/* Quick Stats - shown when collapsed */}
                    {!isExpanded && (
                        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/5">
                            {release.features && release.features.length > 0 && (
                                <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                                    <Rocket className="w-3.5 h-3.5" />
                                    {release.features.reduce((acc, g) => acc + g.items.length, 0)} features
                                </span>
                            )}
                            {release.bugFixes && release.bugFixes.length > 0 && (
                                <span className="flex items-center gap-1.5 text-xs text-amber-400">
                                    <Bug className="w-3.5 h-3.5" />
                                    {release.bugFixes.length} fixes
                                </span>
                            )}
                            <span className="flex items-center gap-1.5 text-xs text-blue-400">
                                <ContainerIcon className="w-3.5 h-3.5" />
                                {release.dockerImages.length} images
                            </span>
                        </div>
                    )}
                </div>

                {/* Expandable Details - Inside the card */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="px-6 pb-6 pt-2 space-y-6 border-t border-white/5">
                                {/* GitHub Link */}
                                <div className="flex items-center gap-4 pt-3">
                                    <Link
                                        href={`https://github.com/SimpleNotificationSystem/simplens-core/releases/tag/v${release.version}`}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Tag className="w-4 h-4" />
                                        View Full Release Notes
                                        <ExternalLink className="w-3 h-3" />
                                    </Link>
                                </div>

                                {/* Features Section */}
                                {release.features && release.features.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                                <Rocket className="w-5 h-5 text-emerald-400" />
                                            </div>
                                            <h3 className="text-xl font-semibold">Features</h3>
                                        </div>

                                        <div className="grid gap-4">
                                            {release.features.map((featureGroup) => (
                                                <div key={featureGroup.category} className="bg-black/30 border border-white/5 rounded-xl p-5">
                                                    <h4 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                                                        {featureGroup.category}
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {featureGroup.items.map((item, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm">
                                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Bug Fixes Section */}
                                {release.bugFixes && release.bugFixes.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                                <Bug className="w-5 h-5 text-amber-400" />
                                            </div>
                                            <h3 className="text-xl font-semibold">Bug Fixes</h3>
                                        </div>

                                        <div className="bg-black/30 border border-white/5 rounded-xl p-5">
                                            <ul className="space-y-2">
                                                {release.bugFixes.map((fix, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm">
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                                        {fix}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* Docker Images Section */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                            <ContainerIcon className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold">Docker Images</h3>
                                    </div>

                                    <div className="bg-black/30 border border-white/5 rounded-xl p-5">
                                        <div className="space-y-2 font-mono text-sm">
                                            {release.dockerImages.map((image, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <code className="text-zinc-300">
                                                        <span className="text-blue-400">{image}</span>
                                                    </code>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </article>
    )
}

export default function ChangelogPage() {
    const [releases, setReleases] = useState<Release[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch changelog data from API route
        fetch("/api/changelog")
            .then(res => res.json())
            .then(data => {
                setReleases(data.releases)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 via-transparent to-transparent" />
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute top-40 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

                <div className="relative max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <Package className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-zinc-400">Release History</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent p-4">
                        Changelog
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Track the evolution of SimpleNS. Every feature, improvement, and fix documented for transparency.
                    </p>

                    <div className="flex items-center justify-center gap-4 mt-8">
                        <Link
                            href="https://github.com/SimpleNotificationSystem/simplens-core/releases"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-white/90 border border-white/10 rounded-[10px] text-sm font-medium transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            View on GitHub
                            <ExternalLink className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Releases Timeline */}
            <section className="max-w-4xl mx-auto px-6 pb-24">
                <div className="relative">
                    {loading ? (
                        <div className="pl-8 md:pl-20 py-12 text-center text-zinc-500">
                            Loading releases...
                        </div>
                    ) : (
                        releases.map((release) => (
                            <ReleaseCard key={release.version} release={release} />
                        ))
                    )}
                </div>
            </section>

            <Footer />
        </div>
    )
}
