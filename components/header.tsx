"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Github, Menu, X } from "lucide-react"
import { useState } from "react"

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { href: "#features", label: "Features" },
        { href: "#open-source", label: "OpenSource" },
        { href: "#architecture", label: "Architecture" },
    ]

    return (
        <>
            <nav className="bg-black/80 backdrop-blur-sm fixed p-2 md:p-4 w-screen flex justify-between flex-row items-center z-50">
                {/* Logo and Desktop Nav */}
                <div className="p-2 flex flex-row justify-center ml-4 md:ml-20 items-center gap-5">
                    <Image
                        src="/SimpleNSLogo.png"
                        height={100}
                        width={100}
                        alt="SimpleNS Logo"
                        className="w-20 md:w-[100px]"
                    />
                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex flex-row gap-5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-white hover:text-gray-300 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Desktop GitHub Button */}
                <div className="hidden md:flex flex-row justify-center items-center mr-20 p-2 gap-5">
                    <Button
                        className="bg-white text-black hover:bg-gray-100"
                        asChild
                    >
                        <Link href="https://github.com/SimpleNotificationSystem/simplens-core">
                            <Github className="mr-2 h-4 w-4" />
                            Github
                        </Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden mr-4 p-2 text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 top-16 bg-black/95 z-40 flex flex-col items-center pt-8">
                    <div className="flex flex-col items-center gap-6">
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
                        <Button
                            className="bg-white text-black hover:bg-gray-100 mt-4"
                            asChild
                        >
                            <Link href="https://github.com/SimpleNotificationSystem/simplens-core">
                                <Github className="mr-2 h-4 w-4" />
                                Github
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

