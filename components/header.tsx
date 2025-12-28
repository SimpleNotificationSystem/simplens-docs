"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Github, Menu, X } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const navLinks = [
        { href: "#features", label: "Features" },
        { href: "#architecture", label: "Architecture" },
        { href: "/docs", label: "Documentation" },
    ]

    return (
        <>
            <div className="fixed top-6 inset-x-0 w-full max-w-2xl mx-auto z-50 px-4">
                <nav className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-2 pl-6 pr-2 flex justify-between items-center shadow-lg shadow-black/10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 mr-4">
                        <Image
                            src="/SimpleNSLogo.png"
                            height={120}
                            width={120}
                            alt="SimpleNS Logo"
                        />
                    </Link>

                    {/* Desktop Navigation Links (Spotlight) */}
                    <div className="hidden md:flex flex-row relative gap-4 justify-center items-center w-[80%]">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:text-white"
                            >
                                {hoveredIndex === index && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden ml-auto p-2 text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 top-0 bg-black/95 z-40 flex flex-col items-center pt-32 space-y-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-white text-xl hover:text-gray-300 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="h-px w-12 bg-white/10" />
                    <Button
                        className="bg-white text-black hover:bg-gray-100 rounded-full px-8"
                        asChild
                    >
                        <Link href="https://github.com/SimpleNotificationSystem/simplens-core">
                            <Github className="mr-2 h-4 w-4" />
                            Star on GitHub
                        </Link>
                    </Button>
                </div>
            )}
        </>
    )
}

