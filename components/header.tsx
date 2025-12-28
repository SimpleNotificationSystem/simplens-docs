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
            <div className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
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

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                            >
                                {link.label}
                                {hoveredIndex === index && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute -inset-x-3 -inset-y-2 -z-10 rounded-full bg-white/5"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
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
            {isMenuOpen && (
                <div className="fixed inset-0 top-16 z-40 flex flex-col items-center bg-black/95 pt-8 space-y-8 md:hidden">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="h-px w-12 bg-white/10" />
                    <div className="flex flex-col justify-center items-center gap-5">
                        <Link
                            href="https://github.com/SimpleNotificationSystem/simplens-core"
                            target="_blank"
                            className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                        >
                            <Github className="h-5 w-5" />
                        </Link>
                        <Button className="bg-white text-black hover:bg-zinc-200">
                            Get Started
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

