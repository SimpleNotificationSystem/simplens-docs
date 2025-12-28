"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Github, Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface NavGroup {
    label: string
    items: { href: string; label: string }[]
}

interface NavLink {
    href: string
    label: string
}

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null)

    const navGroups: NavGroup[] = [
        {
            label: "Product",
            items: [
                { href: "#features", label: "Features" },
                { href: "#how-it-works", label: "How It Works" },
                { href: "#use-cases", label: "Use Cases" },
            ],
        },
        {
            label: "Resources",
            items: [
                { href: "#dashboard", label: "Dashboard" },
                { href: "#why", label: "Why SimpleNS" },
                { href: "#channels", label: "Multi-Channel" },
            ],
        },
    ]

    const directLinks: NavLink[] = [
        { href: "/docs", label: "Docs" },
        { href: "#faq", label: "FAQ" },
    ]

    return (
        <>
            <div className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/SimpleNSLogo.png"
                            height={100}
                            width={100}
                            alt="SimpleNS Logo"
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {/* Dropdown Groups */}
                        {navGroups.map((group) => (
                            <div
                                key={group.label}
                                className="relative"
                                onMouseEnter={() => setOpenDropdown(group.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <button
                                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${openDropdown === group.label
                                            ? "text-white bg-white/5"
                                            : "text-zinc-400 hover:text-white"
                                        }`}
                                >
                                    {group.label}
                                    <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === group.label ? "rotate-180" : ""}`} />
                                </button>

                                <AnimatePresence>
                                    {openDropdown === group.label && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full left-0 mt-1 w-48 rounded-xl border border-white/10 bg-zinc-950 p-2 shadow-xl"
                                        >
                                            {group.items.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className="block rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}

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
                            className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                        >
                            <Github className="h-5 w-5" />
                        </Link>

                        <div className="h-4 w-px bg-white/10" />
                        <Button className="bg-white text-black hover:bg-zinc-200">
                            Get Started
                        </Button>
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

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 top-16 z-40 bg-black md:hidden overflow-y-auto"
                    >
                        <div className="flex flex-col p-6">
                            {/* Accordion Groups */}
                            {navGroups.map((group) => (
                                <div key={group.label} className="border-b border-zinc-800">
                                    <button
                                        onClick={() =>
                                            setOpenMobileAccordion(
                                                openMobileAccordion === group.label ? null : group.label
                                            )
                                        }
                                        className="flex w-full items-center justify-between py-4 text-lg font-medium text-white"
                                    >
                                        {group.label}
                                        <ChevronRight
                                            className={`h-5 w-5 text-zinc-500 transition-transform ${openMobileAccordion === group.label ? "rotate-90" : ""
                                                }`}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {openMobileAccordion === group.label && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pb-4 pl-4 space-y-2">
                                                    {group.items.map((item) => (
                                                        <Link
                                                            key={item.href}
                                                            href={item.href}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className="block py-2 text-zinc-400 hover:text-white transition-colors"
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

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
                                    View on GitHub
                                </Link>
                                <Button className="w-full bg-white text-black hover:bg-zinc-200 py-3">
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
