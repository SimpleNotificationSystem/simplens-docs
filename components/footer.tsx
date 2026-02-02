"use client"

import Link from "next/link"
import Image from "next/image"
import { Github } from "lucide-react"

export const Footer = () => {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        product: [
            { label: "Features", href: "#features" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "Use Cases", href: "#use-cases" },
            { label: "Dashboard", href: "#dashboard" },
        ],
        resources: [
            { label: "Documentation", href: "/docs/core" },
            { label: "FAQ", href: "#faq" },
            { label: "GitHub", href: "https://github.com/SimpleNotificationSystem/simplens-core" },
        ],
    }

    return (
        <footer className="border-t border-zinc-800 px-6 py-12">
            <div className="mx-auto max-w-5xl">
                {/* Main Footer Content */}
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Logo & Tagline */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <Image
                                src="/SimpleNSLogo.png"
                                alt="SimpleNS Logo"
                                width={140}
                                height={140}
                                className="rounded-lg"
                            />
                        </Link>
                        <p className="text-sm text-zinc-400 mb-4">
                            <span className="text-white text-xl font-bold">Scalable</span>
                            <span className="mx-2 text-zinc-600">•</span>
                            <span className="text-white text-xl font-bold">Reliable</span>
                            <span className="mx-2 text-zinc-600">•</span>
                            <span className="text-white text-xl font-bold">Extensible</span>
                        </p>
                        <p className="text-sm text-zinc-500 max-w-xs">
                            Open-source plugin-based notification orchestration engine for developers who value control.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-zinc-400 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-zinc-400 transition-colors hover:text-white"
                                        target={link.href.startsWith("http") ? "_blank" : undefined}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-zinc-800" />

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-zinc-500">
                        © {currentYear} SimpleNS. Open source under MIT License.
                    </p>
                    <Link
                        href="https://github.com/SimpleNotificationSystem/simplens-core"
                        target="_blank"
                        className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                        <Github className="h-5 w-5" />
                        <span>Star on GitHub</span>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
