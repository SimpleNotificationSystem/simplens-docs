"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Menu, X, ChevronDown, ChevronRight, Star, BookOpen, Code, Puzzle } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface NavLink {
    href: string
    label: string
}

// Documentation mega-menu items - Bento grid cards
interface DocMenuItem {
    icon: React.ReactNode
    title: string
    description: string
    href: string
    color: string
    bgColor: string
}

const docMenuItems: DocMenuItem[] = [
    {
        icon: <BookOpen className="w-6 h-6" />,
        title: "Core",
        description: "The main notification engine. Self-host, configure, and scale your notification infrastructure.",
        href: "/docs/core",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10"
    },
    {
        icon: <Code className="w-6 h-6" />,
        title: "SDK",
        description: "TypeScript SDK to build plugins for SimpleNS.",
        href: "/docs/sdk",
        color: "text-emerald-400",
        bgColor: "bg-emerald-500/10"
    },
    {
        icon: <Puzzle className="w-6 h-6" />,
        title: "Plugins",
        description: "Extend SimpleNS with official and community plugins.",
        href: "/docs/plugins",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10"
    }
]

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDocsOpen, setIsDocsOpen] = useState(false)
    const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null)
    const [starCount, setStarCount] = useState<number | null>(null)
    const docsMenuRef = useRef<HTMLDivElement>(null)
    const docsButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        fetch('https://api.github.com/repos/SimpleNotificationSystem/simplens-core')
            .then(res => res.json())
            .then(data => {
                if (data.stargazers_count !== undefined) {
                    setStarCount(data.stargazers_count)
                }
            })
            .catch(() => setStarCount(null))
    }, [])

    // Close docs menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                docsMenuRef.current &&
                docsButtonRef.current &&
                !docsMenuRef.current.contains(event.target as Node) &&
                !docsButtonRef.current.contains(event.target as Node)
            ) {
                setIsDocsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const directLinks: NavLink[] = [
        { href: "/changelog", label: "Changelog" },
        { href: "/mcp", label: "MCP" },
    ]

    return (
        <>
            <div className="fixed top-0 inset-x-0 z-50">
                {/* Main Header Bar */}
                <div className="border-b border-white/5 bg-black/10 pt-2 pb-2 backdrop-blur-md">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/SimpleNSLogo.png"
                                height={120}
                                width={120}
                                alt="SimpleNS Logo"
                                className="h-10 w-auto"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-start gap-1">
                            {/* Documentation Button with Mega Menu */}
                            <Link href="/docs/core">
                                <button
                                    ref={docsButtonRef}
                                    onMouseEnter={() => setIsDocsOpen(true)}
                                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all ${isDocsOpen
                                        ? "text-white bg-white/10"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    Documentation
                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDocsOpen ? "rotate-180" : ""}`} />
                                </button>
                            </Link>
                            {/* Direct Links */}
                            {directLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-zinc-400 rounded-lg transition-colors hover:text-white hover:bg-white/5"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Right Actions */}
                        <div className="hidden items-center gap-4 md:flex">
                            <Link
                                href="https://github.com/SimpleNotificationSystem/simplens-core"
                                target="_blank"
                                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors rounded-lg border border-zinc-700 hover:border-zinc-500 bg-zinc-900/50"
                            >
                                <Github className="h-4 w-4" />
                                <span>Star</span>
                                {starCount !== null && (
                                    <>
                                        <span className="h-4 w-px bg-zinc-700" />
                                        <span className="flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                            {starCount >= 1000 ? `${(starCount / 1000).toFixed(1)}k` : starCount}
                                        </span>
                                    </>
                                )}
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-zinc-400 hover:text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mega Menu Dropdown - Desktop Only */}
                <AnimatePresence>
                    {isDocsOpen && (
                        <motion.div
                            ref={docsMenuRef}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="hidden md:block overflow-hidden bg-black/60 backdrop-blur-xl border-b-2 border-white/5"
                            onMouseLeave={() => setIsDocsOpen(false)}
                        >
                            <div className="mx-auto max-w-7xl px-6 py-8">
                                <div className="grid grid-cols-12 gap-6">
                                    {/* Featured Card - Left Side */}
                                    <div className="col-span-4">
                                        <Link
                                            href="/docs/core"
                                            className="group block h-full rounded-2xl overflow-hidden bg-[#121212] border border-white/10 hover:border-white/20 transition-all"
                                            onClick={() => setIsDocsOpen(false)}
                                        >
                                            <div className="relative p-6 h-full flex flex-col justify-between min-h-[280px]">
                                                {/* Decorative gradient orb */}
                                                <div className="absolute top-0 right-0 w-40 h-40 bg-black rounded-full blur-3xl" />

                                                <div className="relative z-10">
                                                    <div className="flex flex-col items-start gap-3 mb-4">
                                                        <Image
                                                            src="/SimpleNSLogo.png"
                                                            height={100}
                                                            width={100}
                                                            alt="SimpleNS"
                                                            className="h-12 w-auto"
                                                        />
                                                        <h3 className="text-2xl font-bold text-white mb-2">
                                                            The Notification<br />
                                                            <span className="bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent text-4xl">
                                                                Infrastructure
                                                            </span>
                                                        </h3>
                                                        <p className="text-zinc-400 text-sm mt-3">
                                                            Open-source, self-hosted notification system for modern applications.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>

                                    {/* Menu Items Grid - Right Side - 3 Bento Cards */}
                                    <div className="col-span-8 grid grid-cols-3 gap-4">
                                        {docMenuItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                onClick={() => setIsDocsOpen(false)}
                                                className="group flex flex-col p-5 rounded-xl bg-[#121212] border border-white/5 hover:border-white/20 transition-all hover:scale-[1.02]"
                                            >
                                                <div className={`shrink-0 w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform mb-4`}>
                                                    {item.icon}
                                                </div>
                                                <h4 className="text-white font-semibold text-lg mb-2">
                                                    {item.title}
                                                </h4>
                                                <p className="text-zinc-500 text-sm leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 top-16 z-40 bg-black/80 backdrop-blur-md md:hidden overflow-y-auto"
                    >
                        <div className="flex flex-col p-6">
                            {/* Documentation Accordion */}
                            <div className="border-b border-zinc-800">
                                <button
                                    onClick={() =>
                                        setOpenMobileAccordion(
                                            openMobileAccordion === "Documentation" ? null : "Documentation"
                                        )
                                    }
                                    className="flex w-full items-center justify-between py-4 text-lg font-medium text-white"
                                >
                                    Documentation
                                    <ChevronRight
                                        className={`h-5 w-5 text-zinc-500 transition-transform ${openMobileAccordion === "Documentation" ? "rotate-90" : ""
                                            }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openMobileAccordion === "Documentation" && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-4 space-y-2">
                                                {docMenuItems.map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="flex items-center gap-3 py-3 px-4 rounded-xl bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                                                    >
                                                        <div className={`w-8 h-8 rounded-lg ${item.bgColor} flex items-center justify-center ${item.color}`}>
                                                            {item.icon}
                                                        </div>
                                                        <span className="font-medium">{item.title}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Direct Links */}
                            {directLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="py-4 text-lg font-medium text-white border-b border-zinc-800"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Bottom Actions */}
                            <div className="mt-8 space-y-4">
                                <Link
                                    href="https://github.com/SimpleNotificationSystem/simplens-core"
                                    target="_blank"
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-zinc-700 text-zinc-300 hover:border-white hover:text-white transition-colors"
                                >
                                    <Github className="h-5 w-5" />
                                    <span>Star on GitHub</span>
                                    {starCount !== null && (
                                        <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-transparent text-sm">
                                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                            {starCount >= 1000 ? `${(starCount / 1000).toFixed(1)}k` : starCount}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
