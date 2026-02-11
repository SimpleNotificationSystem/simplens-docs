"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { AnimatedShinyText } from "./ui/animated-shiny-text"

export function Announcement() {
    const text = process.env.NEXT_PUBLIC_ANNOUNCEMENT_TEXT
    const link = process.env.NEXT_PUBLIC_ANNOUNCEMENT_LINK

    if (!text) return null

    const content = (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group rounded-full border border-black/5 bg-neutral-100/5 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200/10 dark:border-white/5 dark:bg-neutral-900/10 dark:hover:bg-neutral-900/20"
        >
            <AnimatedShinyText
                className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
            >
                <span>{text}</span>
                <ArrowRight className="ml-1 w-3 h-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
        </motion.div>
    )

    if (link) {
        return (
            <Link href={link} className="flex justify-center mb-8">
                {content}
            </Link>
        )
    }

    return <div className="flex justify-center mb-8">{content}</div>
}
